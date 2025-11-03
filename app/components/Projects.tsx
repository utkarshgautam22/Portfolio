// app/components/Projects.tsx
'use client';

import { useState, useEffect } from 'react';

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
    readme_content?: string;
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
}

// In app/components/Projects.tsx - Update these constants at the top
const GITHUB_USERNAME = 'utkarshgautam22';
const EXCLUDED_REPOS = ['some']; // Add any repos you want to exclude
const FEATURED_REPOS = ['isocode', 'cricket-genie', 'cloud-dev-environment', 'AskMyDocs'];

// Cache keys
const CACHE_KEY = 'github-repos-cache';
const CACHE_TIMESTAMP_KEY = 'github-repos-timestamp';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

function ProjectCard({ project }: { project: Project }) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white dark:bg-dark-bg rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group h-full flex flex-col">
            {/* Project Image/Header */}
            <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-purple-600/20 overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px]"></div>
                <div className="relative h-full flex items-center justify-center p-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                            {project.featured ? '⭐' : '💻'}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2 line-clamp-2">
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <div className="bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs">
                        ⭐ {project.stars}
                    </div>
                    <div className="bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs">
                        🍴 {project.forks}
                    </div>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                    </div>
                )}
            </div>

            {/* Project Info */}
            <div className="p-6 flex-1 flex flex-col">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs font-medium border border-primary-500/20"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-border">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Updated {formatDate(project.updated)}
                    </div>
                    <div className="flex gap-2">
                        <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-200 hover:scale-110"
                            title="View code"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        {project.links.live && project.links.live !== project.links.github && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-200 hover:scale-110"
                                title="Live demo"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Utility functions for caching
const getCachedData = () => {
    if (typeof window === 'undefined') return null;

    const cached = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

    if (!cached || !timestamp) return null;

    const isExpired = Date.now() - parseInt(timestamp) > CACHE_DURATION;
    if (isExpired) return null;

    return JSON.parse(cached);
};

const setCachedData = (data: Project[]) => {
    if (typeof window === 'undefined') return;

    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
};

// Function to extract description from README
const extractDescriptionFromReadme = (readme: string): string => {
    if (!readme) return '';

    try {
        // Remove markdown headers, code blocks, and images
        let cleanText = readme
            .replace(/```[\s\S]*?```/g, '') // Remove code blocks
            .replace(/`[^`]*`/g, '') // Remove inline code
            .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
            .replace(/\[.*?\]\(.*?\)/g, '') // Remove links but keep text
            .replace(/#+\s/g, '') // Remove headers
            .replace(/\*\*/g, '') // Remove bold
            .replace(/\*/g, '') // Remove italics
            .trim();

        // Get first paragraph (first 200 characters)
        const firstParagraph = cleanText.split('\n\n')[0] || cleanText.split('\n')[0];
        return firstParagraph.slice(0, 200).trim() + (firstParagraph.length > 200 ? '...' : '');
    } catch (error) {
        console.error('Error parsing README:', error);
        return '';
    }
};

// Function to fetch README content
const fetchReadmeContent = async (repoName: string): Promise<string> => {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                },
            }
        );

        if (!response.ok) {
            return '';
        }

        const data = await response.json();
        // Decode base64 content
        return atob(data.content);
    } catch (error) {
        console.error(`Error fetching README for ${repoName}:`, error);
        return '';
    }
};

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);

                // Check cache first
                const cachedData = getCachedData();
                if (cachedData) {
                    setProjects(cachedData);
                    setLastUpdated('Using cached data');
                    setLoading(false);
                    return;
                }

                console.log('Fetching fresh data from GitHub...');

                // Fetch repositories
                const reposResponse = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`
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

                // Fetch README content for each repository
                const reposWithReadme = await Promise.all(
                    publicRepos.map(async (repo) => {
                        const readmeContent = await fetchReadmeContent(repo.name);
                        return {
                            ...repo,
                            readme_content: readmeContent
                        };
                    })
                );

                // Map to Project format
                const mappedProjects: Project[] = reposWithReadme.map(repo => {
                    // Use README content for description if available, otherwise use repo description
                    const description = repo.readme_content
                        ? extractDescriptionFromReadme(repo.readme_content)
                        : repo.description || 'No description available';

                    // Categorize based on topics or language
                    let category = 'web';
                    if (repo.topics.includes('mobile') || repo.topics.includes('react-native')) {
                        category = 'app';
                    } else if (repo.topics.includes('design') || repo.topics.includes('ui') || repo.topics.includes('ux')) {
                        category = 'design';
                    }

                    // Get technologies from topics and language
                    const technologies = [
                        repo.language,
                        ...repo.topics.filter(topic =>
                            !['portfolio', 'project', 'web', 'mobile', 'app', 'design', 'ui', 'ux'].includes(topic.toLowerCase())
                        )
                    ].filter(Boolean) as string[];

                    return {
                        id: repo.id,
                        title: formatRepoName(repo.name),
                        description,
                        category,
                        technologies,
                        links: {
                            live: repo.homepage || repo.html_url,
                            github: repo.html_url
                        },
                        stars: repo.stargazers_count,
                        forks: repo.forks_count,
                        updated: repo.updated_at,
                        featured: FEATURED_REPOS.includes(repo.name)
                    };
                });

                // Sort: featured first, then by stars
                const sortedProjects = mappedProjects.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.stars - a.stars;
                });

                setProjects(sortedProjects);
                setCachedData(sortedProjects);
                setLastUpdated(new Date().toLocaleString());

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching GitHub repos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const formatRepoName = (name: string): string => {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'web', label: 'Web Apps' },
        { key: 'app', label: 'Mobile Apps' },
        { key: 'design', label: 'UI/UX Design' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const refreshData = async () => {
        // Clear cache and reload
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        window.location.reload();
    };

    if (loading) {
        return (
            <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-surface">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-block px-6 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                            My work
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            Featured <span className="text-primary-500">Projects</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded mx-auto"></div>
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300">Loading projects from GitHub...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-surface">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-block px-6 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                            My work
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            Featured <span className="text-primary-500">Projects</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded mx-auto"></div>
                    </div>
                    <div className="text-center py-20">
                        <div className="text-red-500 text-lg mb-4">Error loading projects</div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
                        <button
                            onClick={refreshData}
                            className="btn-primary"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-surface">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                        My work
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Featured <span className="text-primary-500">Projects</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded mx-auto"></div>
                </div>

                {/* Cache Info and Refresh Button */}
                <div className="flex justify-between items-center mb-8">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        {lastUpdated && `Last updated: ${lastUpdated}`}
                    </div>
                    <button
                        onClick={refreshData}
                        className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
                        title="Force refresh data"
                    >
                        Refresh Data
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.key
                                ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                                : 'bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:border-primary-500 hover:text-primary-500'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            No projects found in this category
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Check out my other projects or try a different filter.
                        </p>
                    </div>
                )}

                {/* GitHub Link */}
                <div className="text-center mt-12">
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                    >
                        <span>View All on GitHub</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}