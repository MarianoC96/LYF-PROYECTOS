import Link from 'next/link';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-50 text-slate-500 py-12 px-6 md:px-12 border-t border-slate-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="text-slate-900 text-lg font-bold tracking-tight block mb-4">
                        lyf proyectos
                    </Link>
                    <p className="text-sm max-w-xs leading-relaxed">
                        Software · IA · Enterprise
                        <br />
                        Construyendo el futuro digital con precisión y criterio técnico.
                    </p>
                </div>

                <div>
                    <h3 className="text-slate-900 text-xs uppercase tracking-wider mb-4 font-mono">Sitemap</h3>
                    <ul className="space-y-2 text-sm font-light">
                        <li><Link href="/projects" className="hover:text-slate-900 transition-colors">Projects</Link></li>
                        <li><Link href="/studio" className="hover:text-slate-900 transition-colors">Studio</Link></li>
                        <li><Link href="/journal" className="hover:text-slate-900 transition-colors">Journal</Link></li>
                        <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-slate-900 text-xs uppercase tracking-wider mb-4 font-mono">Social</h3>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-slate-900 transition-colors" aria-label="LinkedIn">
                            <Linkedin size={20} strokeWidth={1.5} />
                        </a>
                        <a href="#" className="hover:text-slate-900 transition-colors" aria-label="Twitter">
                            <Twitter size={20} strokeWidth={1.5} />
                        </a>
                        <a href="#" className="hover:text-slate-900 transition-colors" aria-label="Instagram">
                            <Instagram size={20} strokeWidth={1.5} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-xs">
                <p>&copy; {new Date().getFullYear()} lyf proyectos. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
                    <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
