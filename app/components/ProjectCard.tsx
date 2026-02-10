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
        <Link href={`/proyectos/${project.id}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 mb-4">
                {/* Image placeholder or real image */}
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 transition-colors duration-500 group-hover:bg-slate-200" />
                )}

                {/* Overlay or interactions */}
            </div>

            <div className="flex justify-between items-baseline border-t border-slate-200 pt-3">
                <div>
                    <h3 className="text-lg font-medium tracking-tight text-slate-900 group-hover:text-slate-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 font-mono mt-1">
                        {project.category}
                    </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                    {project.year}
                </span>
            </div>
            <p className="mt-2 text-sm text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                {project.description}
            </p>
        </Link>
    );
}
