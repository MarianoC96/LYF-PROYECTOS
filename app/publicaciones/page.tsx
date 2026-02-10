'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const articles = [
    {
        id: 'ia-ethics',
        title: 'Ética en la IA aplicada a procesos industriales',
        excerpt: 'Cómo mitigar sesgos en modelos predictivos de mantenimiento.',
        date: 'Oct 2025',
        tag: 'IA'
    },
    {
        id: 'microservices-scale',
        title: 'Escalando microservicios: lecciones de una migración',
        excerpt: 'Del monolito a la arquitectura distribuida sin perder consistencia.',
        date: 'Sep 2025',
        tag: 'Arquitectura'
    },
    {
        id: 'nextjs-performance',
        title: 'Optimizando Core Web Vitals en aplicaciones enterprise',
        excerpt: 'Técnicas avanzadas de rendering y gestión de assets en Next.js.',
        date: 'Ago 2025',
        tag: 'Frontend'
    },
    {
        id: 'design-systems',
        title: 'Sistemas de diseño atómicos para equipos distribuidos',
        excerpt: 'Manteniendo la coherencia visual en productos de gran escala.',
        date: 'Jul 2025',
        tag: 'Producto'
    },
    {
        id: 'cloud-native',
        title: 'Estrategias Cloud-Native para reducción de costes',
        excerpt: 'Serverless vs Contenedores: análisis de TCO.',
        date: 'Jun 2025',
        tag: 'DevOps'
    },
    {
        id: 'legacy-modernization',
        title: 'Modernización de legacy: estrategia del estrangulador',
        excerpt: 'Reemplazando sistemas críticos sin tiempo de inactividad.',
        date: 'May 2025',
        tag: 'Arquitectura'
    },
];

export default function JournalPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
            <div className="max-w-2xl mb-16">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-outfit">
                    Publicaciones
                </h1>
                <p className="text-slate-500">
                    Reflexiones sobre ingeniería, diseño y la intersección entre ambos.
                </p>
            </div>

            <div className="border-t border-slate-200">
                {articles.map((article) => (
                    <Link key={article.id} href={`/publicaciones/${article.id}`} className="group block">
                        <article className="grid grid-cols-1 md:grid-cols-12 py-8 border-b border-slate-100 transition-colors hover:bg-slate-50 px-4 -mx-4 rounded-lg">
                            <div className="md:col-span-2 text-sm font-mono text-slate-400 py-1">
                                {article.date}
                            </div>
                            <div className="md:col-span-12 lg:col-span-7">
                                <h2 className="text-xl md:text-2xl font-medium mb-2 group-hover:text-slate-600 transition-colors">
                                    {article.title}
                                </h2>
                                <p className="text-slate-500 font-light">
                                    {article.excerpt}
                                </p>
                            </div>
                            <div className="md:col-span-3 lg:col-span-3 flex justify-start md:justify-end items-start py-1 mt-4 md:mt-0">
                                <span className="text-xs uppercase tracking-wider border border-slate-200 px-2 py-1 rounded-full text-slate-500">
                                    {article.tag}
                                </span>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
