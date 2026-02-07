import { projects } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface PageProps {
    params: {
        id: string;
    };
}

// Ensure params are handled correctly in Next.js 15+ (async params)
// But for now typical Next.js 14 usage. 
// If generic PageProps type is needed, we define it manually.

export function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default function ProjectDetail({ params }: PageProps) {
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
            {/* Header */}
            <header className="mb-24">
                <Link href="/projects" className="text-sm uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 mb-8 block transition-colors">
                    &larr; Volver
                </Link>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-outfit">
                    {project.title}
                </h1>
                <div className="flex flex-wrap gap-x-12 gap-y-4 text-sm font-mono text-neutral-500 uppercase tracking-wider border-y border-neutral-200 dark:border-neutral-800 py-6">
                    <div>
                        <span className="text-neutral-400 mr-2">Industria</span>
                        <span className="text-neutral-900 dark:text-neutral-100">{project.industry}</span>
                    </div>
                    <div>
                        <span className="text-neutral-400 mr-2">Año</span>
                        <span className="text-neutral-900 dark:text-neutral-100">{project.year}</span>
                    </div>
                    <div>
                        <span className="text-neutral-400 mr-2">Categoría</span>
                        <span className="text-neutral-900 dark:text-neutral-100">{project.category}</span>
                    </div>
                </div>
            </header>

            {/* Hero Image */}
            <div className="w-full aspect-video bg-neutral-200 dark:bg-neutral-900 mb-24 relative overflow-hidden">
                {project.image ? (
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-300">
                        Image Placeholder
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                <div className="md:col-span-4 lg:col-span-3">
                    <h3 className="text-sm uppercase tracking-wider mb-2 font-mono text-neutral-400">Alcance</h3>
                    <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                        {project.description}
                    </p>
                </div>

                <div className="md:col-span-8 lg:col-span-9 space-y-16">
                    <section>
                        <h2 className="text-2xl font-medium mb-4">El Reto</h2>
                        <p className="text-xl font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {project.challenge}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-medium mb-4">La Solución</h2>
                        <p className="text-xl font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {project.solution}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-medium mb-4">Resultado</h2>
                        <p className="text-xl font-light leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {project.result}
                        </p>
                    </section>
                </div>
            </div>

        </article>
    );
}
