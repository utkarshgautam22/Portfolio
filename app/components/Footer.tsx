// app/components/Footer.tsx
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '#home', icon: '🏠' },
        { name: 'About', href: '#about', icon: '👨‍💻' },
        { name: 'Skills', href: '#skills', icon: '🛠️' },
        { name: 'Projects', href: '#projects', icon: '🚀' },
        { name: 'Contact', href: '#contact', icon: '💬' }
    ];

    const services = [
        { name: 'Web Development', icon: '🌐' },
        { name: 'Mobile Apps', icon: '📱' },
        { name: 'Cybersecurity', icon: '🛡️' },
        { name: 'AI/ML Solutions', icon: '🤖' }
    ];

    const socialLinks = [
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
            href: 'https://github.com/utkarshgautam22',
            label: 'GitHub',
            color: 'hover:bg-gray-900'
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
            href: 'https://in.linkedin.com/in/utkarsh-gautam-578724310',
            label: 'LinkedIn',
            color: 'hover:bg-blue-600'
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            href: 'https://www.instagram.com/__utkarsh_gautam/',
            label: 'Instagram',
            color: 'hover:bg-pink-500'
        },
        {
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                </svg>
            ),
            href: 'mailto:iutkarshgautam@gmail.com',
            label: 'Email',
            color: 'hover:bg-red-500'
        }
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-dark-bg text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]"></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600"></div>
                                    <span className="relative text-white font-bold text-xl">UG</span>
                                </div>
                                <div>
                                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        Utkarsh Gautam
                                    </span>
                                    <div className="text-sm text-gray-400">Full Stack Developer</div>
                                </div>
                            </div>

                            <p className="text-gray-400 leading-relaxed text-sm">
                                Crafting digital experiences with code and creativity.
                                Building the future, one project at a time. 🚀
                            </p>

                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 hover:scale-110 border border-gray-700 hover:border-transparent`}
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                <span>🔗</span>
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center gap-2 group"
                                        >
                                            <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                                            <span>{link.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                <span>🛠️</span>
                                Services
                            </h3>
                            <ul className="space-y-3">
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <div className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                            <span>{service.icon}</span>
                                            <span>{service.name}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter & Contact */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                                <span>📬</span>
                                Stay Updated
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Get notified about my latest projects and tech insights.
                            </p>

                            <form className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white text-sm placeholder-gray-500 transition-all duration-300"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>

                            <div className="pt-4 border-t border-gray-800">
                                <div className="text-gray-400 text-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                                        </svg>
                                        <span>iutkarshgautam@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span>🎓</span>
                                        <span>NIT Calicut, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-gray-400 text-sm flex items-center gap-2">
                        <span>© {currentYear} Utkarsh Gautam.</span>
                        <span>All rights reserved.</span>
                    </div>
                    <div className="text-gray-400 text-sm flex items-center gap-2">
                        <span>Made with</span>
                        <span className="text-red-500 animate-pulse">❤️</span>
                        <span>and lots of</span>
                        <span className="text-yellow-500">☕</span>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute bottom-10 right-10 w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
            <div className="absolute top-10 left-10 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </footer>
    );
}