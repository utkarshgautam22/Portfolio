// app/components/Skills.tsx
'use client';

import { useEffect, useRef } from 'react';

interface Skill {
    name: string;
    percentage: number;
    category: string;
}

interface SkillCategory {
    icon: string;
    title: string;
    skills: Skill[];
}

export default function Skills() {
    const skillCategories: SkillCategory[] = [
        {
            icon: '💻',
            title: 'Programming',
            skills: [
                { name: 'Python', percentage: 90, category: 'programming' },
                { name: 'JavaScript', percentage: 85, category: 'programming' },
                { name: 'C++', percentage: 80, category: 'programming' },
                { name: 'C', percentage: 75, category: 'programming' },
                { name: 'Kotlin', percentage: 70, category: 'programming' }
            ]
        },
        {
            icon: '🌐',
            title: 'Frontend',
            skills: [
                { name: 'React', percentage: 85, category: 'frontend' },
                { name: 'Next.js', percentage: 80, category: 'frontend' },
                { name: 'HTML/CSS', percentage: 90, category: 'frontend' },
                { name: 'Tailwind CSS', percentage: 85, category: 'frontend' }
            ]
        },
        {
            icon: '⚙️',
            title: 'Backend & Tools',
            skills: [
                { name: 'Node.js', percentage: 80, category: 'backend' },
                { name: 'Express.js', percentage: 75, category: 'backend' },
                { name: 'MongoDB', percentage: 70, category: 'backend' },
                { name: 'Docker', percentage: 65, category: 'backend' },
                { name: 'Git', percentage: 85, category: 'backend' }
            ]
        },
        {
            icon: '🛡️',
            title: 'Cybersecurity',
            skills: [
                { name: 'Network Security', percentage: 75, category: 'security' },
                { name: 'Reverse Engineering', percentage: 70, category: 'security' },
                { name: 'CTF Challenges', percentage: 80, category: 'security' },
                { name: 'Packet Analysis', percentage: 75, category: 'security' }
            ]
        },
        {
            icon: '🤖',
            title: 'AI/ML',
            skills: [
                { name: 'TensorFlow', percentage: 70, category: 'ai' },
                { name: 'PyTorch', percentage: 65, category: 'ai' },
                { name: 'Pandas/NumPy', percentage: 80, category: 'ai' },
                { name: 'Scikit-learn', percentage: 75, category: 'ai' }
            ]
        },
        {
            icon: '⚡',
            title: 'Other',
            skills: [
                { name: 'Competitive Programming', percentage: 85, category: 'other' },
                { name: 'Android Development', percentage: 70, category: 'other' },
                { name: 'FastAPI/Flask', percentage: 75, category: 'other' },
                { name: 'Assembly', percentage: 60, category: 'other' }
            ]
        }
    ];

    return (
        <section id="skills" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-2 bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                        My Tech Arsenal
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Skills & <span className="text-primary-500">Technologies</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded mx-auto"></div>
                </div>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {skillCategories.map((category, categoryIndex) => (
                        <div
                            key={categoryIndex}
                            className="bg-white dark:bg-dark-bg rounded-2xl p-8 border border-gray-200 dark:border-dark-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
                        >
                            {/* Top accent bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-600"></div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl">
                                    {category.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                            </div>

                            <div className="space-y-6">
                                {category.skills.map((skill, skillIndex) => (
                                    <SkillBar key={skillIndex} skill={skill} delay={skillIndex * 100} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (progressRef.current) {
                progressRef.current.style.width = `${skill.percentage}%`;
            }
        }, delay + 500);

        return () => clearTimeout(timer);
    }, [skill.percentage, delay]);

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                <span className="text-primary-500 font-semibold">{skill.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: '0%' }}
                ></div>
            </div>
        </div>
    );
}