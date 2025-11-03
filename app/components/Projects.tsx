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

// Configuration
const GITHUB_USERNAME = 'utkarshgautam22';
const EXCLUDED_REPOS: string[] = [];
const FEATURED_REPOS = ['isocode', 'cricket-genie', 'cloud-dev-environment', 'AskMyDocs', 'Portfolio'];
const PROJECT_ASSETS_FOLDER = 'project-assets'; // Your folder name

// Cache keys
const CACHE_KEY = 'github-repos-cache';
const CACHE_TIMESTAMP_KEY = 'github-repos-timestamp';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week

// Gradients for different project types
const CATEGORY_GRADIENTS = {
    web: 'from-blue-500 to-cyan-500',
    app: 'from-purple-500 to-pink-500',
    design: 'from-orange-500 to-red-500',
    security: 'from-green-500 to-emerald-500',
    ai: 'from-indigo-500 to-purple-500',
    default: 'from-gray-500 to-gray-700'
};

const CATEGORY_ICONS = {
    web: '🌐',
    app: '📱',
    design: '🎨',
    security: '🛡️',
    ai: '🤖',
    default: '💼'
};

// Utility functions for caching
const getCachedData = (): Project[] | null => {
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

// Function to fetch description from project-assets folder
const fetchProjectDescription = async (repoName: string, defaultBranch: string): Promise<string> => {
    try {
        const response = await fetch(
            `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${PROJECT_ASSETS_FOLDER}/description.txt`
        );

        if (!response.ok) {
            return ''; // Return empty if file doesn't exist
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
    // Try common image extensions
    const imageExtensions = ['png', 'jpg', 'jpeg', 'webp', 'avif'];

    // Return the first likely image URL (you can enhance this to check which one exists)
    return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${PROJECT_ASSETS_FOLDER}/preview.${imageExtensions[0]}`;
};

// Function to check if image exists
const checkImageExists = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getCategoryGradient = (category: string) => {
        return CATEGORY_GRADIENTS[category as keyof typeof CATEGORY_GRADIENTS] || CATEGORY_GRADIENTS.default;
    };

    const getCategoryIcon = (category: string) => {
        return CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || CATEGORY_ICONS.default;
    };

    const getLanguageColor = (language: string) => {
        const colors: { [key: string]: string } = {
            'Python': 'bg-gradient-to-r from-yellow-400 to-green-500',
            'JavaScript': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
            'TypeScript': 'bg-gradient-to-r from-blue-500 to-blue-700',
            'Java': 'bg-gradient-to-r from-red-500 to-orange-500',
            'C++': 'bg-gradient-to-r from-blue-600 to-purple-600',
            'C': 'bg-gradient-to-r from-blue-400 to-blue-600',
            'Kotlin': 'bg-gradient-to-r from-purple-500 to-pink-500',
            'HTML': 'bg-gradient-to-r from-orange-500 to-red-500',
            'CSS': 'bg-gradient-to-r from-blue-500 to-indigo-500',
            'Dockerfile': 'bg-gradient-to-r from-blue-400 to-blue-600'
        };
        return colors[language] || 'bg-gradient-to-r from-gray-500 to-gray-700';
    };

    return (
        <div
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-200/50 dark:border-dark-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full flex flex-col relative">

                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(project.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                {/* Project Header with Image or Gradient */}
                <div className={`relative h-48 overflow-hidden ${!project.imageUrl || imageError ? `bg-gradient-to-br ${getCategoryGradient(project.category)}` : ''}`}>
                    {/* Project Image or Fallback */}
                    {project.imageUrl && !imageError ? (
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        // Fallback gradient background with icon
                        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
                    )}

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white relative z-10">
                            {(!project.imageUrl || imageError) && (
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/30">
                                    {getCategoryIcon(project.category)}
                                </div>
                            )}
                            <h3 className="font-bold text-white text-xl mb-2 px-4 line-clamp-2 drop-shadow-lg bg-black/30 backdrop-blur-sm rounded-lg py-1">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs border border-white/30">
                            ⭐ {project.stars}
                        </div>
                        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs border border-white/30">
                            🍴 {project.forks}
                        </div>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold backdrop-blur-sm border border-yellow-300/50">
                            ⭐ Featured
                        </div>
                    )}

                    {/* Language Indicator */}
                    {project.language && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getLanguageColor(project.language)}`}></div>
                            <span className="text-white/90 text-sm font-medium backdrop-blur-sm bg-black/40 px-2 py-1 rounded-lg border border-white/20">
                                {project.language}
                            </span>
                        </div>
                    )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex-1 flex flex-col relative z-10">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                        {project.displayDescription || project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span
                                key={techIndex}
                                className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600 backdrop-blur-sm hover:scale-105 transition-transform duration-200"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-gradient-to-r from-primary-500/10 to-purple-500/10 text-primary-600 dark:text-primary-400 rounded-full text-xs border border-primary-500/20">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-dark-border/50 mt-auto">
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            Updated {formatDate(project.updated)}
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-600 dark:text-gray-400 rounded-xl flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-200 dark:border-gray-600"
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
                                    className="w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-600 dark:text-gray-400 rounded-xl flex items-center justify-center hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg border border-gray-200 dark:border-gray-600"
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

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${getCategoryGradient(project.category)} bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}>
                    <div className="absolute inset-[2px] rounded-3xl bg-white dark:bg-dark-bg"></div>
                </div>
            </div>

            {/* Floating Animation on Hover */}
            {isHovered && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-xl -z-10 animate-pulse"></div>
            )}
        </div>
    );
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState<'featured' | 'all' | string>('featured');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    // Filter buttons with icons
    const filters = [
        { key: 'featured', label: 'Featured', icon: '⭐' },
        { key: 'all', label: 'All Projects', icon: '📂' },
        { key: 'web', label: 'Web Apps', icon: '🌐' },
        { key: 'app', label: 'Mobile Apps', icon: '📱' },
        { key: 'security', label: 'Security', icon: '🛡️' },
        { key: 'ai', label: 'AI/ML', icon: '🤖' }
    ];

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

                // Process repositories with project assets
                const processedProjects = await Promise.all(
                    publicRepos.map(async (repo) => {
                        // Fetch custom description from project-assets folder
                        const customDescription = await fetchProjectDescription(repo.name, repo.default_branch);

                        // Get image URL (we'll check if it exists later)
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

    const filteredProjects = activeFilter === 'featured'
        ? projects.filter(project => project.featured)
        : activeFilter === 'all'
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
            <section id="projects" className="section-padding bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-dark-surface">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-block px-6 py-2 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                            🚀 My Creations
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-500 to-purple-600 dark:from-white dark:via-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Featured Projects
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Loading your amazing projects...
                        </p>
                    </div>
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300">Fetching projects from GitHub...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="projects" className="section-padding bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-dark-surface">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-block px-6 py-2 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                            🚀 My Creations
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-500 to-purple-600 dark:from-white dark:via-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Featured Projects
                        </h2>
                    </div>
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900 dark:to-red-800 rounded-3xl flex items-center justify-center text-4xl">
                            ⚠️
                        </div>
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
        <section id="projects" className="section-padding bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-dark-surface">
            <div className="container-custom">
                {/* Enhanced Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-2 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                        🚀 My Creations
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-500 to-purple-600 dark:from-white dark:via-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {activeFilter === 'featured'
                            ? 'Showcasing my best and most polished work'
                            : activeFilter === 'all'
                                ? 'Complete collection of all my projects'
                                : `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} projects`}
                    </p>
                </div>

                {/* Cache Info and Refresh Button */}
                <div className="flex justify-between items-center mb-8 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-dark-border/50">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {lastUpdated && `🕒 Last updated: ${lastUpdated}`}
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                            {filteredProjects.length} projects
                        </span>
                        <button
                            onClick={refreshData}
                            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
                            title="Force refresh data"
                        >
                            <span>🔄</span>
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>

                {/* Enhanced Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border flex items-center gap-2 ${activeFilter === filter.key
                                ? `bg-gradient-to-r ${CATEGORY_GRADIENTS[filter.key as keyof typeof CATEGORY_GRADIENTS] || CATEGORY_GRADIENTS.default} text-white shadow-lg scale-105 border-transparent`
                                : 'bg-white/80 dark:bg-dark-bg/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-dark-border hover:shadow-md'
                                }`}
                        >
                            <span>{filter.icon}</span>
                            <span>{filter.label}</span>
                            {filter.key === 'featured' && (
                                <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                                    {projects.filter(p => p.featured).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center text-4xl">
                            {activeFilter === 'featured' ? '⭐' : '🔍'}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            {activeFilter === 'featured'
                                ? 'No featured projects found'
                                : 'No projects found in this category'}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                            {activeFilter === 'featured'
                                ? 'Check out all projects or add some repositories to FEATURED_REPOS'
                                : 'Check out other categories or featured projects.'}
                        </p>
                    </div>
                )}

                {/* Enhanced GitHub Link */}
                <div className="text-center mt-16">
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-500 text-white dark:text-gray-900 rounded-2xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:rotate-1 transform backdrop-blur-sm border border-gray-200/50 dark:border-dark-border/50"
                    >
                        <span>Explore More on GitHub</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}