'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Proyectos', href: '/proyectos' },
    { name: 'Estudio', href: '/estudio' },
    { name: 'Publicaciones', href: '/publicaciones' },
    { name: 'Contacto', href: '/contacto' },
];

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Track scroll to add background to header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 w-full z-50 text-slate-900 py-5 px-6 md:px-12 flex justify-between items-center transition-all duration-300",
                    scrolled
                        ? "bg-white/80 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                )}
            >
                <Link href="/" className="text-lg font-bold tracking-tight relative z-[55]">
                    lyf proyectos
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex gap-8">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative text-sm uppercase tracking-wider transition-colors hover:opacity-70",
                                    isActive ? "opacity-100" : "opacity-60"
                                )}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-slate-900"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Menu Button - Hamburger / X */}
                <button
                    className="md:hidden relative z-[55] w-10 h-10 flex flex-col items-center justify-center gap-[6px] focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={mobileMenuOpen}
                >
                    <span
                        className={cn(
                            "block w-6 h-[2px] bg-slate-900 rounded-full transition-all duration-300 ease-in-out origin-center",
                            mobileMenuOpen && "translate-y-[4px] rotate-45"
                        )}
                    />
                    <span
                        className={cn(
                            "block w-6 h-[2px] bg-slate-900 rounded-full transition-all duration-300 ease-in-out",
                            mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                        )}
                    />
                    <span
                        className={cn(
                            "block w-6 h-[2px] bg-slate-900 rounded-full transition-all duration-300 ease-in-out origin-center",
                            mobileMenuOpen && "-translate-y-[4px] -rotate-45"
                        )}
                    />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed inset-0 z-40 bg-slate-50/98 backdrop-blur-md flex flex-col justify-center items-center px-6 md:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8">
                            {navItems.map((item, index) => {
                                const isActive = pathname === item.href;
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.08,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={cn(
                                                "text-xl md:text-3xl font-light uppercase tracking-wider transition-opacity duration-300",
                                                isActive
                                                    ? "opacity-100 text-slate-900"
                                                    : "opacity-50 text-slate-700 hover:opacity-80"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* Bottom accent line */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
                            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-slate-300 origin-center"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
