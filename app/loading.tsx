export default function Loading() {
    return (
        <div className="fixed inset-0 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center z-[100]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-neutral-200 dark:border-neutral-800 border-t-neutral-900 dark:border-t-neutral-100 rounded-full animate-spin" />
                <p className="text-sm font-mono uppercase tracking-wider text-neutral-500">
                    Loading...
                </p>
            </div>
        </div>
    );
}
