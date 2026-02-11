'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const LERP_FACTOR = 0.08;

const DesktopCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [frames, setFrames] = useState<string[]>([]);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    // Refs for smooth animation loop
    const currentFrameRef = useRef(0);
    const targetFrameRef = useRef(0);
    const animationIdRef = useRef<number>(0);
    const lastRenderedFrameRef = useRef(-1);

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

    // Smooth render loop with lerp + manual scroll tracking
    useEffect(() => {
        if (isLoading || error || images.length === 0) return;

        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = (index: number) => {
            if (index === lastRenderedFrameRef.current) return;
            lastRenderedFrameRef.current = index;

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
            lastRenderedFrameRef.current = -1;
            render(Math.round(currentFrameRef.current));
        };

        // Calculate scroll progress manually (works with Lenis)
        const getScrollProgress = () => {
            const rect = container.getBoundingClientRect();
            const containerHeight = container.offsetHeight;
            const viewportHeight = window.innerHeight;
            // scrollable distance = container height - viewport height
            const scrollableDistance = containerHeight - viewportHeight;
            if (scrollableDistance <= 0) return 0;

            // rect.top starts at 0 when container top is at viewport top
            // and goes negative as we scroll down
            const scrolled = -rect.top;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
            return progress;
        };

        // Continuous animation loop with lerp interpolation
        const animate = () => {
            // Update target based on current scroll position
            const progress = getScrollProgress();
            targetFrameRef.current = progress * (images.length - 1);

            const current = currentFrameRef.current;
            const target = targetFrameRef.current;

            const diff = target - current;
            if (Math.abs(diff) > 0.01) {
                currentFrameRef.current += diff * LERP_FACTOR;
            } else {
                currentFrameRef.current = target;
            }

            const frameIndex = Math.min(
                images.length - 1,
                Math.max(0, Math.round(currentFrameRef.current))
            );
            render(frameIndex);

            animationIdRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        // Start the animation loop
        animationIdRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationIdRef.current);
        };
    }, [isLoading, error, images]);

    if (error) {
        return (
            <div className="h-[80vh] w-full bg-slate-50 flex items-center justify-center text-slate-500">
                <p>Recursos visuales no disponibles</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="h-[300vh] relative bg-slate-50 z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-slate-50">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-slate-50 text-slate-900 font-mono text-sm">
                        Cargando Sistema... {Math.round((loadedCount / (frames.length || 1)) * 100)}%
                    </div>
                )}
                <canvas ref={canvasRef} className="w-full h-full block relative z-10" />
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
        return <div className="h-[80vh] w-full bg-slate-50" />;
    }

    if (isMobile) {
        return (
            <div className="h-[80vh] w-full relative bg-slate-50 overflow-hidden">
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
