// lib/getProjects.ts
import { siteConfig } from '@/config/site.config';

export interface Project {
    id: number;
    title: string;
    description: string;
    category: string;
    technologies: string[];
    links: {
        live: string;
        github: string;
    };
    stars: number;
    forks: number;
    updated: string;
    featured: boolean;
    language: string;
    imageUrl?: string;
    displayDescription?: string;
}

interface ProjectsResponse {
    projects: Project[];
    lastUpdated: string;
    cacheExpiry: number;
}

export async function getProjects(): Promise<ProjectsResponse> {
    try {
        // For build time, fetch directly from GitHub API
        if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_BASE_URL) {
            // During build, fetch directly from GitHub
            const GITHUB_USERNAME = siteConfig.github.username;
            const response = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
                {
                    headers: {
                        'Accept': 'application/vnd.github.v3+json',
                        ...(process.env.GITHUB_TOKEN && {
                            'Authorization': `token ${process.env.GITHUB_TOKEN}`
                        })
                    },
                    next: { revalidate: siteConfig.github.cacheDuration }
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch projects: ${response.status}`);
            }

            const repos = await response.json();

            // Simple processing for build time
            const projects = repos
                .filter((repo: any) => !repo.private)
                .map((repo: any) => ({
                    id: repo.id,
                    title: repo.name.split('-').map((word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' '),
                    description: repo.description || 'No description available',
                    displayDescription: repo.description || 'No description available',
                    category: 'web',
                    technologies: [repo.language].filter(Boolean),
                    links: {
                        live: repo.homepage || repo.html_url,
                        github: repo.html_url
                    },
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updated: repo.updated_at,
                    featured: siteConfig.github.featuredRepos.includes(repo.name),
                    language: repo.language || 'Other'
                }));

            return {
                projects,
                lastUpdated: new Date().toISOString(),
                cacheExpiry: siteConfig.github.cacheDuration
            };
        }

        // For runtime, use the API route
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
            (process.env.NODE_ENV === 'production'
                ? 'https://your-domain.com'
                : 'http://localhost:3000');

        const response = await fetch(`${baseUrl}/api/projects`, {
            next: { revalidate: siteConfig.github.cacheDuration }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const data: ProjectsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        // Return empty data on error
        return {
            projects: [],
            lastUpdated: new Date().toISOString(),
            cacheExpiry: siteConfig.github.cacheDuration
        };
    }
}