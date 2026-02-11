import Image from "next/image";
import HeroWrapper from "./components/HeroWrapper";

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <HeroWrapper />

      <section className="bg-slate-50 py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 font-outfit">
            Construimos el futuro del software.
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-slate-600 leading-relaxed font-light">
            <p>
              En <span className="text-slate-900 font-medium">lyf proyectos</span>, transformamos visión en arquitectura digital de alto rendimiento.
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
