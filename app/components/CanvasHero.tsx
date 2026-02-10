'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

const DesktopCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [frames, setFrames] = useState<string[]>([]);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Fetch manifest
    useEffect(() => {
        fetch('/frames/manifest.json')
            .then((res) => {
                if (!res.ok) throw new Error('Manifest not found');
                return res.json();
            })
            .then((data) => {
                if (data.frames && Array.isArray(data.frames) && data.frames.length > 0) {
                    setFrames(data.frames);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.error("CanvasHero Error:", err);
                setError(true);
            });
    }, []);

    // Preload images
    useEffect(() => {
        if (frames.length === 0) return;

        let loaded = 0;
        const imgs: HTMLImageElement[] = new Array(frames.length);

        frames.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loaded++;
                setLoadedCount(loaded);
                if (loaded === frames.length) {
                    setIsLoading(false);
                }
            };
            img.onerror = () => {
                loaded++;
                setLoadedCount(loaded);
                if (loaded === frames.length) {
                    setIsLoading(false);
                }
            };
            imgs[index] = img;
        });
        setImages(imgs);
    }, [frames]);

    // Render logic
    useEffect(() => {
        if (isLoading || error || images.length === 0) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = (index: number) => {
            const img = images[index];
            if (!img) return;

            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;

            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw - iw * scale) / 2;
            const y = (ch - ih * scale) / 2;

            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, x, y, iw * scale, ih * scale);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const progress = scrollYProgress.get();
            const index = Math.min(
                frames.length - 1,
                Math.floor(progress * frames.length)
            );
            render(index);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const unsubscribe = scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                frames.length - 1,
                Math.floor(latest * frames.length)
            );
            requestAnimationFrame(() => render(index));
        });

        return () => {
            window.removeEventListener('resize', handleResize);
            unsubscribe();
        };
    }, [isLoading, error, images, scrollYProgress, frames.length]);

    if (error) {
        return (
            <div className="h-screen w-full bg-slate-50 flex items-center justify-center text-slate-500">
                <p>Recursos visuales no disponibles</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-slate-50">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-50 text-slate-900 font-mono text-sm">
                        Cargando Sistema... {Math.round((loadedCount / (frames.length || 1)) * 100)}%
                    </div>
                )}
                <canvas ref={canvasRef} className="w-full h-full block" />
            </div>
        </div>
    );
};

export default function CanvasHero() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile === null) {
        return <div className="h-screen w-full bg-slate-50" />;
    }

    if (isMobile) {
        return (
            <div className="h-screen w-full relative bg-slate-50 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/VideoHero.mp4"
                />
            </div>
        );
    }

    return <DesktopCanvas />;
}
