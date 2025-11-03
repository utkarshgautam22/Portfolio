// app/components/CustomCursor.tsx
'use client';

import { useState, useEffect } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursor = () => {
            const elements = document.querySelectorAll(
                'a, button, .btn, .project-card, .skill-category, .filter-btn, .social-link, input, textarea, [role="button"]'
            );
            const isPointerElement = elements.length > 0 &&
                Array.from(elements).some(el => el.matches(':hover'));

            setIsPointer(isPointerElement);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        // Add slight delay before showing cursor to prevent flash on page load
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', updateCursor);
        document.addEventListener('mouseenter', handleMouseEnter, { capture: true });
        document.addEventListener('mouseleave', handleMouseLeave, { capture: true });

        return () => {
            clearTimeout(timer);
            document.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', updateCursor);
            document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
            document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
        };
    }, []);

    // Don't render cursor on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <>
            {/* Main Cursor Dot - More Subtle */}
            <div
                className={`fixed top-0 left-0 w-2 h-2 bg-primary-500 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out ${isPointer ? 'scale-0' : 'scale-100'
                    } ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    transform: `translate3d(${position.x - 1}px, ${position.y - 1}px, 0)`,
                }}
            />

            {/* Cursor Ring - More Prominent but Smooth */}
            <div
                className={`fixed top-0 left-0 w-8 h-8 border-2 border-primary-500 rounded-full pointer-events-none z-50 transition-all duration-200 ease-out ${isPointer
                    ? 'scale-150 bg-primary-500/20 border-primary-600'
                    : 'scale-100 bg-transparent'
                    } ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
                }}
            />

            {/* Optional: Hide default cursor in CSS */}
            <style jsx global>{`
        * {
          cursor: none;
        }
        
        /* Show default cursor for text selection and inputs */
        input, textarea, [contenteditable] {
          cursor: auto;
        }
        
        /* Hide custom cursor when default cursor is needed */
        input:hover ~ .custom-cursor,
        textarea:hover ~ .custom-cursor,
        [contenteditable]:hover ~ .custom-cursor {
          opacity: 0 !important;
        }
        
        @media (pointer: coarse) {
          * {
            cursor: auto;
          }
        }
      `}</style>
        </>
    );
}