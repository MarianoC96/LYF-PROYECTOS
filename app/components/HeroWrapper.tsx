'use client';

import dynamic from 'next/dynamic';

// Dynamically import CanvasHero with SSR disabled
// This wrapper ensures the dynamic import happens in a client context
const CanvasHero = dynamic(() => import('./CanvasHero'), {
    ssr: false,
    loading: () => <div className="h-screen w-full bg-slate-50" />
});

export default function HeroWrapper() {
    return <CanvasHero />;
}
