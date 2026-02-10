'use client';

import { motion } from 'framer-motion';

export default function StudioPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">

                {/* Enfoque */}
                <div className="md:sticky md:top-32 h-fit">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 font-outfit">
                        Estudio
                    </h1>
                    <p className="text-xl text-slate-600 max-w-md leading-relaxed">
                        Somos un equipo de ingenieros y diseñadores obsesionados con la calidad técnica y la claridad visual.
                    </p>
                </div>

                <div className="space-y-32">
                    <section>
                        <h2 className="text-sm uppercase tracking-wider mb-6 text-slate-400 font-mono">Enfoque</h2>
                        <p className="text-2xl md:text-3xl leading-snug font-light">
                            No somos una fábrica de software. Somos arquitectos de soluciones digitales.
                            Cada línea de código y cada píxel tiene una intención clara: <span className="text-slate-900 font-normal">resolver problemas complejos con simplicidad elegante.</span>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm uppercase tracking-wider mb-6 text-slate-400 font-mono">Método</h2>
                        <div className="grid grid-cols-1 gap-8 border-t border-slate-200 pt-8">
                            {[
                                { title: '01. Inmersión', desc: 'Entendemos el negocio, no solo los requisitos.' },
                                { title: '02. Arquitectura', desc: 'Diseñamos sistemas escalables, no parches.' },
                                { title: '03. Ejecución', desc: 'Código limpio, testado y performante.' },
                                { title: '04. Evolución', desc: 'Acompañamos el crecimiento del producto.' }
                            ].map((step) => (
                                <div key={step.title} className="group">
                                    <h3 className="text-lg font-medium mb-2">{step.title}</h3>
                                    <p className="text-slate-500">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm uppercase tracking-wider mb-6 text-slate-400 font-mono">Tecnología</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Elegimos tecnologías probadas y robustas que garantizan rendimiento y mantenibilidad a largo plazo.
                        </p>
                        <ul className="grid grid-cols-2 gap-4 font-mono text-sm text-slate-500">
                            <li>Next.js / React</li>
                            <li>TypeScript</li>
                            <li>Python / Django</li>
                            <li>Node.js</li>
                            <li>AWS / Vercel</li>
                            <li>PostgreSQL</li>
                            <li>TensorFlow / PyTorch</li>
                            <li>Kubernetes</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-sm uppercase tracking-wider mb-6 text-slate-400 font-mono">Clientes</h2>
                        <p className="text-xl font-light">
                            Trabajamos con empresas que ven la tecnología como una ventaja competitiva, desde startups fintech hasta corporaciones industriales.
                        </p>
                    </section>
                </div>

            </div>
        </div>
    );
}
