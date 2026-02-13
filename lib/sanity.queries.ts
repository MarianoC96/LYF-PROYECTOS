import { groq } from 'next-sanity'

export const articlesQuery = groq`*[_type == "publicacion"] | order(_createdAt desc) {
  "id": _id,
  title,
  excerpt,
  date,
  tag,
  "slug": slug.current,
  mainImage
}`

export const articleBySlugQuery = groq`*[_type == "publicacion" && slug.current == $slug][0] {
  "id": _id,
  title,
  excerpt,
  date,
  tag,
  content,
  mainImage
}`
