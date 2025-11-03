// app/page.tsx
'use client';

import { useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';

export default function Home() {
    useEffect(() => {
        // Initialize theme
        const theme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, []);

    return (
        <main className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
            <LoadingScreen />
            <CustomCursor />
            <Navigation />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
            <BackToTop />
        </main>
    );
}