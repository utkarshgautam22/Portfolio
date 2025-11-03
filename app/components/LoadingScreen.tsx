// app/components/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'none';
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) return null;

    return (
        <div className={`fixed inset-0 bg-white dark:bg-dark-bg z-50 flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin mb-4 mx-auto"></div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Loading...</div>
            </div>
        </div>
    );
}