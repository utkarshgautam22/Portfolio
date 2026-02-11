// app/components/Skills.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site.config';

interface Skill {
    name: string;
    percentage: number;
    category: string;
    icon: string;
    color: string;
}

interface SkillCategory {
    icon: string;
    title: string;
    description: string;
    gradient: string;
    skills: Skill[];
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState(0);

    // Map skills from config to categories
    const skillCategories: SkillCategory[] = [
        {
            icon: '🎨',
            title: 'Frontend',
            description: 'Modern web development & UI/UX',
            gradient: 'from-blue-500 to-cyan-500',
            skills: siteConfig.skills.frontend.map(s => ({ ...s, category: 'frontend' }))
        },
        {
            icon: '⚙️',
            title: 'Backend',
            description: 'Server-side development & databases',
            gradient: 'from-green-500 to-emerald-500',
            skills: siteConfig.skills.backend.map(s => ({ ...s, category: 'backend' }))
        },
        {
            icon: '🛠️',
            title: 'Tools',
            description: 'Development tools & platforms',
            gradient: 'from-orange-500 to-red-500',
            skills: siteConfig.skills.tools.map(s => ({ ...s, category: 'tools' }))
        },
        {
            icon: '💼',
            title: 'Other',
            description: 'Additional skills & technologies',
            gradient: 'from-purple-500 to-pink-500',
            skills: siteConfig.skills.other.map(s => ({ ...s, category: 'other' }))
        }
    ];

    return (
        <section id="skills" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-surface dark:to-gray-900">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-2 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                        My Tech Arsenal
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-primary-500 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
                        Skills & Technologies
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A comprehensive showcase of my technical expertise across various domains
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {skillCategories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(index)}
                            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border ${activeCategory === index
                                ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105 border-transparent`
                                : 'bg-white/80 dark:bg-dark-bg/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-dark-border hover:shadow-md'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.title}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Skills Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {skillCategories[activeCategory].skills.map((skill, index) => (
                        <SkillCard
                            key={index}
                            skill={skill}
                            index={index}
                            gradient={skillCategories[activeCategory].gradient}
                        />
                    ))}
                </div>

                {/* All Categories Overview */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Technology Overview
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {skillCategories.map((category, index) => (
                            <div
                                key={index}
                                className="text-center group cursor-pointer"
                                onClick={() => setActiveCategory(index)}
                            >
                                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${category.gradient} flex items-center justify-center text-white text-2xl mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg`}>
                                    {category.icon}
                                </div>
                                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {category.title}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {category.skills.length} skills
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SkillCard({ skill, index, gradient }: { skill: Skill; index: number; gradient: string }) {
    const progressRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            if (progressRef.current) {
                setTimeout(() => {
                    progressRef.current!.style.width = `${skill.percentage}%`;
                }, 100);
            }
        }, index * 100);

        return () => clearTimeout(timer);
    }, [skill.percentage, index]);

    return (
        <div className="group">
            <div className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-lg rounded-3xl p-6 border border-gray-200/50 dark:border-dark-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                {/* Skill Header */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl ${skill.color} flex items-center justify-center text-white text-lg shadow-lg`}>
                            {skill.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{skill.name}</h3>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Proficient</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">
                            {skill.percentage}%
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative z-10">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Experience</span>
                        <span>Mastery</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                        <div
                            ref={progressRef}
                            className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out transform origin-left ${isVisible ? 'scale-x-100' : 'scale-x-0'
                                }`}
                            style={{ width: '0%' }}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
                        </div>
                    </div>
                </div>

                {/* Skill Level Indicator */}
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <span>Beginner</span>
                    <span>Advanced</span>
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${gradient} bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}>
                    <div className="absolute inset-[2px] rounded-3xl bg-white dark:bg-dark-bg"></div>
                </div>
            </div>
        </div>
    );
}