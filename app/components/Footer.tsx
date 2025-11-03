// app/components/Footer.tsx
export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
    ];

    const services = [
        { name: 'Web Development', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Mobile Apps', href: '#' },
        { name: 'Consulting', href: '#' }
    ];

    const socialLinks = [
        { icon: '🐙', href: '#', label: 'GitHub' },
        { icon: '💼', href: '#', label: 'LinkedIn' },
        { icon: '🐦', href: '#', label: 'Twitter' },
        { icon: '📷', href: '#', label: 'Instagram' }
    ];

    return (
        <footer className="bg-gray-50 dark:bg-dark-surface border-t border-gray-200 dark:border-dark-border">
            <div className="container-custom py-16">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600"></div>
                                <span className="relative text-white font-bold text-xl">UG</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">Utkarsh Gautam</span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                            Creating digital experiences that inspire and engage. Let's build something amazing together.
                        </p>

                        <div className="flex gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <span className="text-lg">{social.icon}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Services</h3>
                            <ul className="space-y-3">
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <a
                                            href={service.href}
                                            className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
                                        >
                                            {service.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter Section */}
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Stay Updated</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Subscribe to get updates on my latest projects and articles.
                        </p>

                        <form className="space-y-3">
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white text-sm"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors duration-200"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 dark:border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                        © {currentYear} Utkarsh Gautam. All rights reserved.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2">
                        Made with <span className="text-red-500 animate-pulse">❤️</span> and lots of coffee
                    </p>
                </div>
            </div>
        </footer>
    );
}