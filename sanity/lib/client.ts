import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'p3q35zpu').trim(),
    dataset: (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim(),
    apiVersion: '2024-02-13',
    useCdn: false,
})
