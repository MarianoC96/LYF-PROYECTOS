'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Article {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tag: string;
    slug: string;
    imageUrl?: string;
}

function formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

export default function PublicacionesGrid({ articles }: { articles: Article[] }) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [lightboxTitle, setLightboxTitle] = useState<string>('');

    const openLightbox = (imageUrl: string, title: string) => {
        setLightboxImage(imageUrl);
        setLightboxTitle(title);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxImage(null);
        setLightboxTitle('');
        document.body.style.overflow = '';
    };

    // La primera publicación se muestra como "destacada" (más grande)
    const featured = articles[0];
    const rest = articles.slice(1);

    return (
        <>
            {/* Estado vacío */}
            {articles.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-24 text-center"
                >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <span className="text-2xl">✍️</span>
                    </div>
                    <p className="text-lg text-slate-500 font-light">Aún no hay publicaciones.</p>
                    <p className="text-sm text-slate-400 mt-2">
                        Accede al panel en <code className="bg-slate-100 px-2 py-1 rounded text-slate-600">/admin</code> para crear la primera.
                    </p>
                </motion.div>
            )}

            {/* Publicación destacada */}
            {featured && (
                <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Imagen destacada */}
                        {featured.imageUrl && (
                            <div
                                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 cursor-zoom-in group shadow-lg shadow-slate-200/50"
                                onClick={() => openLightbox(featured.imageUrl!, featured.title)}
                            >
                                <Image
                                    src={featured.imageUrl}
                                    alt={featured.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        )}

                        {/* Contenido destacado */}
                        <div className={featured.imageUrl ? '' : 'lg:col-span-2 max-w-2xl'}>
                            <div className="flex items-center gap-3 mb-4">
                                {featured.tag && (
                                    <span className="text-xs font-medium uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                                        {featured.tag}
                                    </span>
                                )}
                                <span className="text-sm font-mono text-slate-400">
                                    {formatDate(featured.date)}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-slate-900 leading-tight">
                                {featured.title}
                            </h2>
                            <p className="text-lg text-slate-500 font-light leading-relaxed">
                                {featured.excerpt}
                            </p>
                        </div>
                    </div>
                </motion.article>
            )}

            {/* Separador */}
            {rest.length > 0 && (
                <div className="border-t border-slate-200 mb-12" />
            )}

            {/* Grid de publicaciones */}
            {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {rest.map((article, i) => (
                        <motion.article
                            key={article.id}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            className="group"
                        >
                            {/* Imagen */}
                            {article.imageUrl && (
                                <div
                                    className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-5 cursor-zoom-in shadow-sm hover:shadow-lg hover:shadow-slate-200/60 transition-shadow duration-500"
                                    onClick={() => openLightbox(article.imageUrl!, article.title)}
                                >
                                    <Image
                                        src={article.imageUrl}
                                        alt={article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    {/* Ícono de zoom */}
                                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.3-4.3" />
                                            <path d="M11 8v6M8 11h6" />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {/* Placeholder si no tiene imagen */}
                            {!article.imageUrl && (
                                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 mb-5 flex items-center justify-center">
                                    <span className="text-4xl opacity-30">📝</span>
                                </div>
                            )}

                            {/* Metadata */}
                            <div className="flex items-center gap-3 mb-3">
                                {article.tag && (
                                    <span className="text-[11px] font-medium uppercase tracking-widest text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full">
                                        {article.tag}
                                    </span>
                                )}
                                <span className="text-xs font-mono text-slate-400">
                                    {formatDate(article.date)}
                                </span>
                            </div>

                            {/* Título */}
                            <h2 className="text-xl font-semibold tracking-tight mb-2 text-slate-900 group-hover:text-slate-600 transition-colors duration-300 leading-snug">
                                {article.title}
                            </h2>

                            {/* Resumen */}
                            <p className="text-sm text-slate-500 font-light leading-relaxed line-clamp-2">
                                {article.excerpt}
                            </p>
                        </motion.article>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={closeLightbox}
                    >
                        {/* Botón cerrar */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 z-10"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Título de la imagen */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.15 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm font-light max-w-md text-center"
                        >
                            {lightboxTitle}
                        </motion.p>

                        {/* Imagen grande */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="relative max-w-5xl max-h-[85vh] w-full h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={lightboxImage}
                                alt={lightboxTitle}
                                fill
                                sizes="90vw"
                                className="object-contain rounded-lg"
                                quality={90}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
