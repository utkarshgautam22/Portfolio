// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/site.config';

interface GitHubRepo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    homepage: string;
    language: string;
    topics: string[];
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    private: boolean;
    default_branch: string;
}

interface Project {
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

// Configuration from site config
const GITHUB_USERNAME = siteConfig.github.username;
const EXCLUDED_REPOS: string[] = siteConfig.github.excludedRepos;
const FEATURED_REPOS: string[] = siteConfig.github.featuredRepos;
const PROJECT_ASSETS_FOLDER = siteConfig.github.projectAssetsFolder;

// Function to fetch description from project-assets folder
const fetchProjectDescription = async (repoName: string, defaultBranch: string): Promise<string> => {
    try {
        const response = await fetch(
            `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${PROJECT_ASSETS_FOLDER}/description.txt`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            return '';
        }

        const description = await response.text();
        return description.trim();
    } catch (error) {
        console.error(`Error fetching description for ${repoName}:`, error);
        return '';
    }
};

// Function to get image URL from project-assets folder
const getProjectImageUrl = (repoName: string, defaultBranch: string): string => {
    const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'avif'];
    return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${PROJECT_ASSETS_FOLDER}/preview.${imageExtensions[0]}`;
};

// Function to check if image exists
const checkImageExists = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        return response.ok;
    } catch (error) {
        return false;
    }
};

const formatRepoName = (name: string): string => {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export async function GET() {
    try {
        console.log('Fetching fresh data from GitHub API...');

        // Fetch repositories from GitHub
        const reposResponse = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    // Add GitHub token if available for higher rate limits
                    ...(process.env.GITHUB_TOKEN && {
                        'Authorization': `token ${process.env.GITHUB_TOKEN}`
                    })
                },
                // Revalidate cache based on config
                next: { revalidate: siteConfig.github.cacheDuration }
            }
        );

        if (!reposResponse.ok) {
            throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
        }

        const repos: GitHubRepo[] = await reposResponse.json();

        // Filter and process repositories
        const publicRepos = repos.filter(repo =>
            !repo.private &&
            !EXCLUDED_REPOS.includes(repo.name)
        );

        // Process repositories with project assets
        const processedProjects = await Promise.all(
            publicRepos.map(async (repo) => {
                // Fetch custom description from project-assets folder
                const customDescription = await fetchProjectDescription(repo.name, repo.default_branch);

                // Get image URL
                const imageUrl = getProjectImageUrl(repo.name, repo.default_branch);

                // Check if image actually exists
                const imageExists = await checkImageExists(imageUrl);

                // Categorize based on topics or language
                let category = 'web';
                if (repo.topics.includes('mobile') || repo.topics.includes('react-native') || repo.topics.includes('android')) {
                    category = 'app';
                } else if (repo.topics.includes('security') || repo.topics.includes('cybersecurity') || repo.topics.includes('hacking')) {
                    category = 'security';
                } else if (repo.topics.includes('ai') || repo.topics.includes('ml') || repo.topics.includes('machine-learning')) {
                    category = 'ai';
                } else if (repo.topics.includes('design') || repo.topics.includes('ui') || repo.topics.includes('ux')) {
                    category = 'design';
                }

                // Get technologies from topics and language
                const technologies = [
                    repo.language,
                    ...repo.topics.filter(topic =>
                        !['portfolio', 'project', 'web', 'mobile', 'app', 'design', 'ui', 'ux', 'security', 'cybersecurity', 'ai', 'ml', 'machine-learning'].includes(topic.toLowerCase())
                    )
                ].filter(Boolean) as string[];

                return {
                    id: repo.id,
                    title: formatRepoName(repo.name),
                    description: repo.description || 'No description available',
                    displayDescription: customDescription || repo.description || 'No description available',
                    category,
                    technologies,
                    links: {
                        live: repo.homepage || repo.html_url,
                        github: repo.html_url
                    },
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    updated: repo.updated_at,
                    featured: FEATURED_REPOS.includes(repo.name),
                    language: repo.language || 'Other',
                    imageUrl: imageExists ? imageUrl : undefined
                };
            })
        );

        // Sort: featured first, then by stars
        const sortedProjects = processedProjects.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return b.stars - a.stars;
        });

        return NextResponse.json({
            projects: sortedProjects,
            lastUpdated: new Date().toISOString(),
            cacheExpiry: siteConfig.github.cacheDuration
        });

    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An error occurred' },
            { status: 500 }
        );
    }
}
