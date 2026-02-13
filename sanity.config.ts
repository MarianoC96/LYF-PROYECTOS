import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'LYF Proyectos — Publicaciones',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/admin',

    plugins: [structureTool()],

    schema: schema,

    // Desactivar la verificación de versiones que causa el error de consola
    __internal: {
        versionCheck: false,
    } as any,
})
