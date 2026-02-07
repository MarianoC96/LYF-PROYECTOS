'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/app/components/ProjectCard'; // Absolute path or alias? Using alias defined in tsconfig
import { projects } from '@/lib/data';

const filters = ['Todos', 'Software', 'IA', 'Plataformas'];

export default function ProjectsPage() {
    const [activeFilter, setActiveFilter] = useState('Todos');

    const filteredProjects = projects.filter(project =>
        activeFilter === 'Todos' ? true : project.category === activeFilter
    );

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-outfit">
                        Selected Work
                    </h1>
                    <p className="text-neutral-500 max-w-md">
                        Una colección de desafíos técnicos resueltos con precisión y arquitectura escalable.
                    </p>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`text-sm uppercase tracking-wider px-4 py-2 rounded-full border transition-all whitespace-nowrap ${activeFilter === filter
                                ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white'
                                : 'bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
