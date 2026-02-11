// app/components/Hero.tsx
'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site.config';

export default function Hero() {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const texts = ['Full Stack Developer', 'Cybersecurity Enthusiast', 'Competitive Programmer', 'AI/ML Explorer'];

    useEffect(() => {
        const timeout = setTimeout(() => {
            const current = texts[currentIndex];

            if (isDeleting) {
                setCurrentText(current.substring(0, currentText.length - 1));
            } else {
                setCurrentText(current.substring(0, currentText.length + 1));
            }

            if (!isDeleting && currentText === current) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentText === '') {
                setIsDeleting(false);
                setCurrentIndex((currentIndex + 1) % texts.length);
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentIndex, texts]);

    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
            {/* Background Shapes */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-10 w-24 h-24 bg-primary-500 rounded-full opacity-10 animate-float"></div>
                <div className="absolute top-60 right-10 w-36 h-36 bg-green-500 rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-40 left-20 w-20 h-20 bg-yellow-500 rounded-full opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
                <div className="absolute top-10 right-1/4 w-28 h-28 bg-primary-500 rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Text */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 text-lg">
                            <span className="text-2xl animate-wave">👋</span>
                            <span>Hello, I'm</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                            <span className="block bg-gradient-to-r from-gray-900 to-primary-500 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
                                {siteConfig.personal.name.split(' ')[0]}
                            </span>
                            <span className="block bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                                {siteConfig.personal.name.split(' ')[1]}
                            </span>
                        </h1>

                        <div className="text-2xl text-primary-500 font-semibold flex items-center gap-1">
                            <span>{currentText}</span>
                            <span className="animate-blink">|</span>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                            {siteConfig.personal.bio}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <a href="#projects" className="btn-primary">
                                <span>View My Work</span>
                                <span>→</span>
                            </a>
                            <a href="#contact" className="btn-secondary">
                                <span>Let's Talk</span>
                                <span>💬</span>
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 pt-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-500">2+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-500">50+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Projects Done</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-500">10+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Technologies</div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative flex justify-center">
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full transform rotate-45"></div>
                            <div className="relative w-full h-full rounded-full border-8 border-white dark:border-dark-bg shadow-2xl overflow-hidden">
                                <img
                                    src={siteConfig.personal.avatar}
                                    alt={siteConfig.personal.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback if image doesn't exist
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.parentElement;
                                        if (fallback) {
                                            fallback.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white">
                          <div class="text-center">
                            <div class="text-4xl mb-2">👨‍💻</div>
                            <div class="text-sm">${siteConfig.personal.name}</div>
                          </div>
                        </div>
                      `;
                                        }
                                    }}
                                />
                            </div>

                            {/* Floating Icons */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white dark:bg-dark-surface rounded-full shadow-lg flex items-center justify-center text-2xl text-blue-400 animate-bounce-slow">
                                ⚛️
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-dark-surface rounded-full shadow-lg flex items-center justify-center text-2xl text-yellow-400 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                                🛡️
                            </div>
                            <div className="absolute top-1/2 -right-8 w-14 h-14 bg-white dark:bg-dark-surface rounded-full shadow-lg flex items-center justify-center text-xl text-green-600 animate-bounce-slow" style={{ animationDelay: '2s' }}>
                                ⚡
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
                <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Scroll Down</div>
                <div className="text-primary-500">↓</div>
            </div>
        </section>
    );
}