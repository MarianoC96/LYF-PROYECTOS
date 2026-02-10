'use client';

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                <div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 font-outfit">
                        Contacto
                    </h1>
                    <p className="text-xl text-slate-600 max-w-md leading-relaxed mb-12">
                        Iniciemos una conversación sobre su próximo desafío técnico. Sin compromiso, con total confidencialidad.
                    </p>

                    <div className="space-y-8 text-sm font-mono text-slate-500">
                        <div>
                            <p className="uppercase tracking-wider text-slate-400 mb-1">Email</p>
                            <a href="mailto:hello@lyfproyectos.com" className="text-slate-900 hover:underline">
                                hello@lyfproyectos.com
                            </a>
                        </div>
                        <div>
                            <p className="uppercase tracking-wider text-slate-400 mb-1">Oficina</p>
                            <p className="text-slate-900">
                                Madrid, España
                            </p>
                        </div>
                    </div>
                </div>

                <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm uppercase tracking-wider text-slate-400 font-mono">Nombre</label>
                            <input
                                id="name"
                                type="text"
                                className="w-full bg-transparent border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder-slate-400"
                                placeholder="Su nombre"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm uppercase tracking-wider text-slate-400 font-mono">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="w-full bg-transparent border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder-slate-400"
                                placeholder="nombre@empresa.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="company" className="text-sm uppercase tracking-wider text-slate-400 font-mono">Empresa</label>
                        <input
                            id="company"
                            type="text"
                            className="w-full bg-transparent border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 transition-colors rounded-none placeholder-slate-400"
                            placeholder="Nombre de su organización"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm uppercase tracking-wider text-slate-400 font-mono">Mensaje</label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full bg-transparent border-b border-slate-300 py-2 focus:outline-none focus:border-slate-900 transition-colors rounded-none resize-none placeholder-slate-400"
                            placeholder="Cuéntenos sobre su proyecto..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-slate-50 py-4 px-12 rounded-full font-medium transition-colors w-full md:w-auto"
                    >
                        Enviar Mensaje
                    </button>
                </form>

            </div>
        </div>
    );
}
