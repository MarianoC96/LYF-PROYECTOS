'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Projects', href: '/projects' },
    { name: 'Studio', href: '/studio' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="fixed top-0 left-0 w-full z-50 text-slate-900 py-6 px-6 md:px-12 flex justify-between items-center bg-transparent pointer-events-none">
            <Link href="/" className="text-lg font-bold tracking-tight pointer-events-auto">
                lyf proyectos
            </Link>

            <nav className="pointer-events-auto hidden md:flex gap-8">
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

            {/* Mobile Menu Trigger would go here */}
            <div className="md:hidden pointer-events-auto">
                {/* Simple placeholder for mobile menu */}
                <span className="text-sm uppercase">Menu</span>
            </div>
        </header>
    );
}
