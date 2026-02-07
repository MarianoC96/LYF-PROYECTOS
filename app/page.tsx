import Image from "next/image";

import CanvasHero from "./components/CanvasHero";

export default function Home() {
  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <CanvasHero />

      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 font-outfit">
            Construimos el futuro del software.
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
            <p>
              En <span className="text-neutral-900 dark:text-neutral-100 font-medium">lyf proyectos</span>, transformamos visión en arquitectura digital de alto rendimiento.
            </p>
            <p>
              Somos un estudio de ingeniería de software e inteligencia artificial dedicado a crear soluciones robustas, escalables y estéticamente impecables para el entorno enterprise.
            </p>
            <p>
              No somos proveedores; somos partners estratégicos en su evolución tecnológica.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
