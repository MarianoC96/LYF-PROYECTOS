export default function Loading() {
    return (
        <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-[100]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
                <p className="text-sm font-mono uppercase tracking-wider text-slate-500">
                    Loading...
                </p>
            </div>
        </div>
    );
}
