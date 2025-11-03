// app/components/About.tsx
export default function About() {
    const features = [
        {
            icon: '💻',
            title: 'Full Stack Development',
            description: 'Building web apps with modern stacks like React, Next.js, and Node.js'
        },
        {
            icon: '🛡️',
            title: 'Cybersecurity',
            description: 'CTFs, reverse-engineering, packet manipulation, and network exploits'
        },
        {
            icon: '⚡',
            title: 'Competitive Programming',
            description: 'Algorithmic problem solving and optimization'
        }
    ];

    const info = [
        { label: 'Name:', value: 'Utkarsh Gautam' },
        { label: 'Email:', value: 'iutkarshgautam@gmail.com' },
        { label: 'Education:', value: 'NIT Calicut, CSE' },
        { label: 'Location:', value: 'India' }
    ];

    return (
        <section id="about" className="section-padding bg-gray-50 dark:bg-dark-surface">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                        Get to know me
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        About <span className="text-primary-500">Me</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded mx-auto"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* About Image */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">👨‍💻</div>
                                    <div className="text-2xl font-bold">Utkarsh Gautam</div>
                                    <div className="text-white/80">CSE Student @ NIT Calicut</div>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent"></div>
                        </div>

                        {/* Experience Badge */}
                        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl animate-pulse">
                            <span className="text-2xl font-bold">2+</span>
                            <span className="text-xs text-center leading-tight">Years<br />Coding</span>
                        </div>
                    </div>

                    {/* About Text */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Full Stack Developer & Cybersecurity Enthusiast</h3>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            I'm a passionate Computer Science student at NIT Calicut with deep interest in full stack development,
                            cybersecurity, and competitive programming. I love building tools, breaking systems, and solving real-world problems.
                        </p>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            When I'm not coding, you can find me participating in CTF challenges, exploring reverse engineering,
                            or diving into network security with tools like Scapy. I believe in continuous learning and pushing
                            the boundaries of what's possible with technology.
                        </p>

                        {/* Features */}
                        <div className="space-y-4 pt-4">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 bg-white dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-2xl">{feature.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            {info.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-dark-border">
                                    <span className="font-semibold text-gray-900 dark:text-white">{item.label}</span>
                                    <span className="text-gray-600 dark:text-gray-300">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Download CV Button */}
                        <button className="btn-primary mt-6">
                            <span>Download CV</span>
                            <span>📥</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}