// app/components/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        // Check system preference for dark mode
        const isDarkMode = localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

        setIsDark(isDarkMode);
        document.documentElement.classList.toggle('dark', isDarkMode);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
                ? 'py-4 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-lg border-b border-gray-200 dark:border-dark-border shadow-lg'
                : 'py-6 bg-transparent'
            }`}>
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="relative flex items-center justify-center w-12 h-12 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600"></div>
                        <span className="relative text-white font-bold text-xl">UG</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors relative py-2"
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors"
                        >
                            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${isDark ? 'translate-x-7' : 'translate-x-0'
                                }`}></div>
                            <div className="flex justify-between items-center px-1">
                                <span className="text-xs">☀️</span>
                                <span className="text-xs">🌙</span>
                            </div>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col space-y-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                            }`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                            }`}></span>
                        <span className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                            }`}></span>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark-bg border-b border-gray-200 dark:border-dark-border shadow-lg">
                        <div className="container-custom py-4 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="block font-medium text-gray-700 dark:text-gray-200 hover:text-primary-500 transition-colors py-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <button
                                onClick={toggleTheme}
                                className="w-full text-left font-medium text-gray-700 dark:text-gray-200 py-2"
                            >
                                Switch to {isDark ? 'Light' : 'Dark'} Mode
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}