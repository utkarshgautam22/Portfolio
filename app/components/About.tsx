// app/components/About.tsx
'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/config/site.config';

export default function About() {
    const [activeTab, setActiveTab] = useState('about');

    const stats = [
        { number: '20+', label: 'Projects Completed', icon: '🚀' },
        { number: '2+', label: 'Years Experience', icon: '💼' },
        { number: '10+', label: 'Technologies', icon: '🛠️' },
        { number: '∞', label: 'Cups of Coffee', icon: '☕' }
    ];

    const skills = [
        { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
        { category: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'MongoDB'] },
        { category: 'Cybersecurity', items: ['Network Security', 'CTFs', 'Reverse Engineering', 'Packet Analysis'] },
        { category: 'Tools', items: ['Git', 'Docker', 'Linux', 'VS Code'] }
    ];

    const interests = [
        { icon: '🛡️', title: 'Cybersecurity', description: 'CTF challenges & ethical hacking' },
        { icon: '⚡', title: 'Competitive Programming', description: 'Algorithmic problem solving' },
        { icon: '🤖', title: 'AI/ML', description: 'Building intelligent systems' },
        { icon: '🎮', title: 'Anime & Gaming', description: 'Proud introvert activities' }
    ];

    return (
        <section id="about" className="section-padding bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-dark-surface relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                        <span>👨‍💻</span>
                        <span>Get to know me</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-primary-500 to-purple-600 dark:from-white dark:via-primary-400 dark:to-purple-400 bg-clip-text text-transparent">
                        About Me
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Passionate developer crafting digital experiences with code and creativity
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Visual & Stats */}
                    <div className="space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200/50 dark:border-dark-border/50 shadow-xl hover:shadow-2xl transition-all duration-500">
                            <div className="text-center">
                                <div className="w-32 h-32 mx-auto mb-6 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl transform rotate-6"></div>
                                    <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-dark-bg shadow-lg">
                                        <img
                                            src={siteConfig.personal.avatar}
                                            alt={siteConfig.personal.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{siteConfig.personal.name}</h3>
                                <p className="text-primary-500 font-semibold mb-4">{siteConfig.personal.title}</p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {siteConfig.personal.location} • {siteConfig.personal.bio.split('.')[0]}
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 dark:border-dark-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group"
                                >
                                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="space-y-8">
                        {/* Tabs Navigation */}
                        <div className="flex space-x-1 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 dark:border-dark-border/50">
                            {['about', 'skills', 'interests'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 capitalize ${activeTab === tab
                                        ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg rounded-3xl p-8 border border-gray-200/50 dark:border-dark-border/50 shadow-xl min-h-[400px]">
                            {activeTab === 'about' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Journey</h3>
                                    <div className="space-y-4">
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            I'm a passionate Computer Science student at NIT Calicut with a deep interest in
                                            <span className="text-primary-500 font-semibold"> full stack development</span>,
                                            <span className="text-green-500 font-semibold"> cybersecurity</span>, and
                                            <span className="text-purple-500 font-semibold"> competitive programming</span>.
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            When I'm not coding, you can find me participating in CTF challenges, exploring
                                            reverse engineering, or diving into network security with tools like Scapy. I believe
                                            in continuous learning and pushing the boundaries of what's possible with technology.
                                        </p>
                                        <div className="bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl p-6 border border-primary-500/20">
                                            <p className="text-gray-700 dark:text-gray-300 text-sm italic">
                                                "I debug with console.log() (and sometimes print() in assembly) and I'm not ashamed!"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Technical Arsenal</h3>
                                    <div className="grid gap-6">
                                        {skills.map((skillGroup, index) => (
                                            <div key={index} className="group">
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                    <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"></span>
                                                    {skillGroup.category}
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {skillGroup.items.map((skill, skillIndex) => (
                                                        <span
                                                            key={skillIndex}
                                                            className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-600 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg group-hover:border-primary-500/50"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'interests' && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Beyond Code</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {interests.map((interest, index) => (
                                            <div
                                                key={index}
                                                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200/50 dark:border-dark-border/50 hover:border-primary-500/50 transition-all duration-300 group hover:-translate-y-1"
                                            >
                                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                                    {interest.icon}
                                                </div>
                                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                                    {interest.title}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                    {interest.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Call to Action */}
                        <div className="flex gap-4">
                            <a
                                href="#contact"
                                className="flex-1 bg-gradient-to-r from-primary-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 transform"
                            >
                                Let's Connect
                            </a>
                            <a
                                href="/resume.pdf"
                                download
                                className="flex-1 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 py-4 px-6 rounded-2xl font-semibold text-center hover:shadow-lg transition-all duration-300 hover:scale-105 transform flex items-center justify-center gap-2"
                            >
                                <span>Download CV</span>
                                <span>📄</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}