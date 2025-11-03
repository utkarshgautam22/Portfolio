// app/components/Contact.tsx
'use client';

import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const contactMethods = [
        {
            icon: '📧',
            title: 'Email',
            value: 'iutkarshgautam@gmail.com'
        },
        {
            icon: '💼',
            title: 'LinkedIn',
            value: 'Utkarsh Gautam'
        },
        {
            icon: '📍',
            title: 'Location',
            value: 'India'
        }
    ];

    const socialLinks = [
        {
            icon: '🐙',
            url: 'https://github.com/utkarshgautam22',
            label: 'GitHub'
        },
        {
            icon: '💼',
            url: 'https://in.linkedin.com/in/utkarsh-gautam-578724310',
            label: 'LinkedIn'
        },
        {
            icon: '📷',
            url: 'https://www.instagram.com/__utkarsh_gautam/',
            label: 'Instagram'
        }
    ];

    return (
        <section id="contact" className="section-padding">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-6 py-2 bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-full text-primary-500 font-semibold text-sm mb-4">
                        Let's connect
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Get In <span className="text-primary-500">Touch</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-purple-600 rounded mx-auto"></div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Let's work together</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                I'm always interested in new opportunities, collaborations, and exciting projects.
                                Whether it's about development, cybersecurity, or just tech discussions - let's connect!
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-4">
                            {contactMethods.map((method, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 p-4 bg-white dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg">
                                        {method.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{method.title}</h4>
                                        <p className="text-gray-600 dark:text-gray-300">{method.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Follow me on</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-300 hover:scale-110"
                                        aria-label={social.label}
                                    >
                                        <span className="text-lg">{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-dark-bg rounded-2xl p-8 border border-gray-200 dark:border-dark-border shadow-lg">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Your Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors"
                                    placeholder="Enter subject"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors resize-vertical"
                                    placeholder="Enter your message"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full justify-center"
                            >
                                <span>Send Message</span>
                                <span>✈️</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}