// config/site.config.ts

/**
 * Site Configuration
 * 
 * Update this file to change personal information, settings, and content
 * displayed across your portfolio website.
 */

export const siteConfig = {
    // ==========================================
    // PERSONAL INFORMATION
    // ==========================================
    personal: {
        name: "Utkarsh Gautam",
        title: "Full Stack Developer",
        email: "utkarshgautam22@example.com", // Update with your actual email
        location: "Your Location",
        bio: "Your bio description here",
        avatar: "/images/avatar.jpeg", // Path to your avatar image
    },

    // ==========================================
    // SOCIAL MEDIA LINKS
    // ==========================================
    social: {
        github: "https://github.com/utkarshgautam22",
        linkedin: "https://linkedin.com/in/yourusername", // Update with your LinkedIn
        twitter: "https://twitter.com/yourusername", // Update with your Twitter
        email: "mailto:utkarshgautam22@example.com", // Update with your actual email
        // Add more social links as needed
    },

    // ==========================================
    // GITHUB PROJECTS CONFIGURATION
    // ==========================================
    github: {
        username: "utkarshgautam22",

        // Featured repositories (shown first)
        featuredRepos: [
            "isocode",
            "cloud-dev-environment",
            "AskMyDocs",
            "Portfolio"
        ],

        // Repositories to exclude from display
        excludedRepos: [
            // Add repo names to hide them
            // Example: "old-project", "test-repo"
        ],

        // Project assets folder name in your repos
        projectAssetsFolder: "project-assets",

        // Cache duration for GitHub data (in seconds)
        // 604800 = 7 days, 86400 = 1 day, 2592000 = 30 days
        cacheDuration: 604800,
    },

    // ==========================================
    // SKILLS
    // ==========================================
    skills: {
        frontend: [
            { name: "React", percentage: 90, icon: "⚛️", color: "bg-gradient-to-r from-blue-400 to-cyan-500" },
            { name: "Next.js", percentage: 85, icon: "▲", color: "bg-gradient-to-r from-gray-700 to-gray-900" },
            { name: "TypeScript", percentage: 85, icon: "📘", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
            { name: "JavaScript", percentage: 90, icon: "⚡", color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
            { name: "Tailwind CSS", percentage: 90, icon: "🎨", color: "bg-gradient-to-r from-cyan-400 to-blue-500" },
            { name: "HTML/CSS", percentage: 95, icon: "🌐", color: "bg-gradient-to-r from-orange-500 to-red-500" },
        ],

        backend: [
            { name: "Node.js", percentage: 85, icon: "🟢", color: "bg-gradient-to-r from-green-500 to-green-700" },
            { name: "Python", percentage: 80, icon: "🐍", color: "bg-gradient-to-r from-blue-400 to-yellow-400" },
            { name: "Express", percentage: 85, icon: "🚂", color: "bg-gradient-to-r from-gray-600 to-gray-800" },
            { name: "MongoDB", percentage: 75, icon: "🍃", color: "bg-gradient-to-r from-green-600 to-green-800" },
            { name: "PostgreSQL", percentage: 70, icon: "🐘", color: "bg-gradient-to-r from-blue-600 to-indigo-600" },
            { name: "FastAPI/Flask", percentage: 75, icon: "🚀", color: "bg-gradient-to-r from-gray-700 to-gray-900" },
        ],

        tools: [
            { name: "Git", percentage: 85, icon: "📦", color: "bg-gradient-to-r from-orange-500 to-red-600" },
            { name: "Docker", percentage: 75, icon: "🐳", color: "bg-gradient-to-r from-blue-400 to-blue-600" },
            { name: "VS Code", percentage: 95, icon: "💻", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
            { name: "Figma", percentage: 70, icon: "🎨", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
            { name: "Postman", percentage: 85, icon: "📮", color: "bg-gradient-to-r from-orange-500 to-orange-700" },
            { name: "Linux", percentage: 80, icon: "🐧", color: "bg-gradient-to-r from-yellow-500 to-yellow-700" },
        ],

        other: [
            { name: "REST APIs", percentage: 85, icon: "🔌", color: "bg-gradient-to-r from-green-500 to-teal-500" },
            { name: "GraphQL", percentage: 70, icon: "◈", color: "bg-gradient-to-r from-pink-500 to-purple-500" },
            { name: "AWS", percentage: 65, icon: "☁️", color: "bg-gradient-to-r from-orange-400 to-yellow-500" },
            { name: "CI/CD", percentage: 70, icon: "🔄", color: "bg-gradient-to-r from-blue-500 to-purple-500" },
            { name: "Agile/Scrum", percentage: 75, icon: "📊", color: "bg-gradient-to-r from-indigo-500 to-blue-500" },
            { name: "Testing", percentage: 75, icon: "🧪", color: "bg-gradient-to-r from-red-500 to-pink-500" },
        ],
    },

    // ==========================================
    // ABOUT SECTION
    // ==========================================
    about: {
        tabs: {
            overview: {
                title: "Overview",
                description: `Passionate full-stack developer with expertise in modern web technologies. 
                     I love building scalable applications and exploring new technologies. 
                     Always eager to learn and contribute to innovative projects.`,
                highlights: [
                    "Full-stack web development",
                    "Modern JavaScript frameworks",
                    "Cloud & DevOps",
                    "Open source contributor"
                ]
            },

            experience: {
                title: "Experience",
                items: [
                    {
                        role: "Full Stack Developer",
                        company: "Your Company",
                        period: "2023 - Present",
                        description: "Working on building scalable web applications using modern technologies."
                    },
                    {
                        role: "Frontend Developer",
                        company: "Previous Company",
                        period: "2021 - 2023",
                        description: "Developed responsive web applications and improved user experience."
                    }
                ]
            },

            education: {
                title: "Education",
                items: [
                    {
                        degree: "Bachelor of Technology",
                        institution: "Your University",
                        period: "2019 - 2023",
                        field: "Computer Science"
                    }
                ]
            },

            expertise: {
                title: "Expertise",
                categories: [
                    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                    { category: "Backend", items: ["Node.js", "Python", "FastAPI", "MongoDB"] },
                    { category: "DevOps", items: ["Docker", "Git", "CI/CD", "AWS"] },
                    { category: "Other", items: ["REST APIs", "GraphQL", "Testing", "Agile"] }
                ]
            }
        }
    },

    // ==========================================
    // CONTACT INFORMATION
    // ==========================================
    contact: {
        email: "utkarshgautam22@example.com", // Update with your actual email
        phone: "+1234567890", // Optional
        location: "Your City, Country",

        // Contact methods with icons
        methods: [
            {
                icon: "📧",
                label: "Email",
                value: "utkarshgautam22@example.com",
                url: "mailto:utkarshgautam22@example.com"
            },
            {
                icon: "💼",
                label: "LinkedIn",
                value: "Your Name",
                url: "https://linkedin.com/in/yourusername"
            },
            {
                icon: "🐙",
                label: "GitHub",
                value: "@utkarshgautam22",
                url: "https://github.com/utkarshgautam22"
            },
            {
                icon: "🐦",
                label: "Twitter",
                value: "@yourusername",
                url: "https://twitter.com/yourusername"
            }
        ]
    },

    // ==========================================
    // FOOTER INFORMATION
    // ==========================================
    footer: {
        copyright: `© ${new Date().getFullYear()} Utkarsh Gautam. All rights reserved.`,

        socialLinks: [
            {
                icon: "github",
                href: "https://github.com/utkarshgautam22",
                label: "GitHub"
            },
            {
                icon: "linkedin",
                href: "https://linkedin.com/in/yourusername",
                label: "LinkedIn"
            },
            {
                icon: "twitter",
                href: "https://twitter.com/yourusername",
                label: "Twitter"
            },
            {
                icon: "email",
                href: "mailto:utkarshgautam22@example.com",
                label: "Email"
            }
        ],

        quickLinks: [
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Skills", href: "#skills" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" }
        ]
    },

    // ==========================================
    // SEO & METADATA
    // ==========================================
    seo: {
        title: "Utkarsh Gautam - Full Stack Developer",
        description: "Portfolio of Utkarsh Gautam - Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.",
        keywords: [
            "Utkarsh Gautam",
            "Full Stack Developer",
            "React Developer",
            "Next.js",
            "Web Developer",
            "Portfolio"
        ],
        author: "Utkarsh Gautam",
        siteUrl: "https://your-domain.com", // Update with your actual domain
        ogImage: "/images/og-image.png" // Open Graph image for social sharing
    },

    // ==========================================
    // THEME CONFIGURATION
    // ==========================================
    theme: {
        // Primary colors (used in gradients and accents)
        primaryColor: "blue",

        // Enable/disable features
        features: {
            darkMode: true,
            customCursor: true,
            backToTop: true,
            animations: true
        }
    }
};

export default siteConfig;
