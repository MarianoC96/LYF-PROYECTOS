import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { articlesQuery } from '@/lib/sanity.queries';
import PublicacionesGrid from './PublicacionesGrid';

interface SanityArticle {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tag: string;
    slug: string;
    mainImage?: any;
}

export const revalidate = 0;

async function getArticles() {
    const raw: SanityArticle[] = await client.fetch(articlesQuery);
    return raw.map((article) => ({
        ...article,
        imageUrl: article.mainImage
            ? urlFor(article.mainImage).width(900).height(560).quality(80).url()
            : undefined,
    }));
}

export default async function PublicacionesPage() {
    const articles = await getArticles();

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="max-w-2xl mb-16">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 font-outfit text-slate-900">
                    Publicaciones
                </h1>
                <p className="text-slate-500 text-lg font-light">
                    Reflexiones sobre ingeniería, diseño y la intersección entre ambos.
                </p>
            </div>

            <PublicacionesGrid articles={articles} />
        </div>
    );
}
