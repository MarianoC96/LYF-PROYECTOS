# lyf-web

Sitio web premium para lyf proyectos. Desarrollo enfocado en performance, estética minimalista y arquitectura escalable.

## Requisitos Previos

- Node.js 18+
- npm o pnpm

## Inicio Rápido

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Generar Manifiesto de Assets** (CRÍTICO):
    El componente `CanvasHero` requiere un índice JSON de las imágenes. Asegúrate de que las imágenes de la secuencia (ej: `001.jpg`, `002.jpg`...) estén en `public/frames/`.
    ```bash
    node scripts/generate-manifest.mjs
    ```

3.  **Iniciar Servidor de Desarrollo**:
    ```bash
    npm run dev
    ```
    Visita `http://localhost:3000`.

## Estructura del Proyecto

-   **`app/`**: Rutas y páginas (App Router).
    -   `components/`: Componentes reutilizables (`CanvasHero`, `Header`, `ProjectCard`).
    -   `projects/`: Página de lista y detalle dinámico (`[id]`).
-   **`public/frames/`**: Secuencia de imágenes para la animación de scroll.
-   **`lib/data.ts`**: Fuente de verdad para los datos de los proyectos.
-   **`scripts/`**: Utilidades de build (generación de manifiesto).

## Personalización de Contenido

-   **Proyectos**: Editar `lib/data.ts`. Los cambios se reflejan en el grid y en el detalle.
-   **Blog / Journal**: Editar `app/journal/page.tsx` (array estático `articles`).
-   **Textos Institucionales**: Editar `app/studio/page.tsx` y `app/page.tsx`.

## Stack Tecnológico

-   **Framework**: Next.js 16 (App Router)
-   **Estilos**: Tailwind CSS v4 + `clsx` + `tailwind-merge`
-   **Animaciones**: Framer Motion
-   **Scroll**: Lenis (Smooth Scroll)
-   **Performance**: Canvas API para el Hero section
-   **Seguridad**: Headers HTTP estrictos (HSTS, CSP, X-Frame-Options) configurados en `next.config.ts`.

## Notas de Seguridad

Si ves alertas en Lighthouse sobre scripts de terceros (ej: Kaspersky, extensiones), estas son inyecciones locales de tu navegador/antivirus y no afectan al sitio en producción. El CSP configurado bloqueará scripts no autorizados en despliegues reales.

---

© 2026 lyf proyectos.
