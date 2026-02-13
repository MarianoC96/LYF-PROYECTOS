export const publicacion = {
    name: 'publicacion',
    title: 'Publicación',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Título',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'URL (se genera automáticamente)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
                slugify: (input: string) =>
                    input
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, ''),
            },
            hidden: true,
        },
        {
            name: 'excerpt',
            title: 'Resumen',
            description: 'Una breve descripción para el listado de publicaciones.',
            type: 'text',
            rows: 3,
        },
        {
            name: 'mainImage',
            title: 'Imagen Principal',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'date',
            title: 'Fecha de publicación',
            type: 'date',
            options: {
                dateFormat: 'YYYY-MM-DD',
            },
            initialValue: () => new Date().toISOString().split('T')[0],
        },
        {
            name: 'tag',
            title: 'Etiqueta / Categoría',
            type: 'string',
            options: {
                list: [
                    { title: 'IA', value: 'IA' },
                    { title: 'Arquitectura', value: 'Arquitectura' },
                    { title: 'Frontend', value: 'Frontend' },
                    { title: 'Producto', value: 'Producto' },
                    { title: 'DevOps', value: 'DevOps' },
                ],
            },
        },
        {
            name: 'content',
            title: 'Contenido Completo',
            type: 'array',
            of: [{ type: 'block' }],
        },
    ],
}
