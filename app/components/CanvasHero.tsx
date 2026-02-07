'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function CanvasHero() {
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
                // Handle error, maybe skip frame?
                // For now just count it as loaded to avoid blocking
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

            // Object-fit: cover logic
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
        // Fallback if no frames
        return (
            <div className="h-screen w-full bg-neutral-900 flex items-center justify-center text-neutral-500">
                <p>Visual assets not available</p>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-neutral-950">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-neutral-950 text-white font-mono text-sm">
                        Loading System... {Math.round((loadedCount / (frames.length || 1)) * 100)}%
                    </div>
                )}
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Optional: Overlay text that fades out? Prompt says "El hero NO lleva texto encima". */}
            </div>
        </div>
    );
}
