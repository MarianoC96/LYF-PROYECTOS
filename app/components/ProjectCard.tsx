'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    image?: string; // Optional for now, fallback to color
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/projects/${project.id}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 dark:bg-neutral-900 mb-4">
                {/* Image placeholder or real image */}
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 transition-colors duration-500 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700" />
                )}

                {/* Overlay or interactions */}
            </div>

            <div className="flex justify-between items-baseline border-t border-neutral-200 dark:border-neutral-800 pt-3">
                <div>
                    <h3 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-500 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-neutral-500 font-mono mt-1">
                        {project.category}
                    </p>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                    {project.year}
                </span>
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                {project.description}
            </p>
        </Link>
    );
}
