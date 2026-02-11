// app/components/ClientLayout.tsx
'use client';

import { useEffect } from 'react';
import Navigation from './Navigation';
import BackToTop from './BackToTop';
import CustomCursor from './CustomCursor';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize theme
        const theme = localStorage.getItem('theme') ||
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, []);

    return (
        <>
            <CustomCursor />
            <Navigation />
            {children}
            <BackToTop />
        </>
    );
}
