import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Spinner } from "@/components/ui/spinner";
import { PROJECTS } from "@/data/projects";

// === HOOKS ===
function useMedia<T>(queries: string[], values: T[], defaultValue: T): T {
    const get = () =>
        values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

    const [value, setValue] = useState<T>(get);

    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
        return () =>
            queries.forEach((q) =>
                matchMedia(q).removeEventListener("change", handler)
            );
    }, [queries, values, defaultValue]);

    return value;
}

const useMeasure = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0 });
    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            setSize({ width: entry.contentRect.width });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);
    return [ref, size] as const;
};

const preloadImages = (urls: string[]) =>
    Promise.all(
        urls.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = resolve;
                })
        )
    );

// === MASONRY ===
const Masonry = ({ items }: { items: typeof PROJECTS }) => {
    const columns = useMedia(
        ["(min-width:1600px)", "(min-width:1200px)", "(min-width:800px)", "(min-width:500px)"],
        [5, 4, 3, 2],
        1
    );

    const [containerRef, { width }] = useMeasure();
    const [imagesReady, setImagesReady] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Preload
    useEffect(() => {
        const urls = items.filter((i) => i.img).map((i) => i.img!);
        if (!urls.length) {
            setImagesReady(true);
            return;
        }
        preloadImages(urls).then(() => setImagesReady(true));
    }, [items]);

    // Grid + Height
    const isReady = imagesReady && width > 100;

    // Compute grid only when ready
    const { grid, gridHeight } = useMemo(() => {
        if (!isReady) return { grid: [], gridHeight: 0 };

        const colHeights = Array(columns).fill(0);
        const colWidth = width / columns;
        const gap = 12;

        const built = items.map((item) => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * colWidth + gap / 2;
            const h = item.height / 2;
            const y = colHeights[col];
            colHeights[col] += h + gap;
            return { ...item, x, y, w: colWidth - gap, h };
        });

        return { grid: built, gridHeight: Math.max(...colHeights) };
    }, [width, columns, items, isReady]);

    // GSAP: Only run once layout is stable
    useLayoutEffect(() => {
        if (!isReady || !grid.length) return;

        if (isInitialLoad) {
            grid.forEach((item) => {
                const sel = `[data-key="${item.id}"]`;
                gsap.set(sel, {
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h,
                    opacity: 1,
                });
            });
            setIsInitialLoad(false);
        } else {
            grid.forEach((item) => {
                gsap.to(`[data-key="${item.id}"]`, {
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h,
                    duration: 0.6,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });
        }
    }, [grid, isReady, isInitialLoad]);

    const handleHover = (id: string, enter: boolean) => {
        gsap.to(`[data-key="${id}"]`, {
            scale: enter ? 0.95 : 1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const openDetail = (item: any) => {
        setSelectedItem(item);
        setOpen(true);
    };

    return (
        <>
            <div
                ref={containerRef}
                className="relative w-full max-w-7xl mx-auto overflow-hidden"
                style={{ height: isReady ? gridHeight : 600 }}
            >
                {/* Loading State */}
                {!isReady && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background">
                        <div className="flex flex-col items-center gap-3">
                            <Spinner />
                            <span className="text-sm text-muted-foreground">Loading projects...</span>
                        </div>
                    </div>
                )}

                {/* Actual Grid — only render when ready */}
                {isReady &&
                    grid.map((item) => (
                        <div
                            key={item.id}
                            data-key={item.id}
                            className="absolute cursor-pointer will-change-transform origin-top-left"
                            style={{
                                opacity: 0, // GSAP will set to 1
                                transform: `translate(${item.x}px, ${item.y}px)`,
                                width: item.w,
                                height: item.h,
                            }}
                            onClick={() => openDetail(item)}
                            onMouseEnter={() => handleHover(item.id, true)}
                            onMouseLeave={() => handleHover(item.id, false)}
                        >
                            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-xl border border-border">
                                {item.img ? (
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-transform duration-300 hover:scale-105"
                                        style={{ backgroundImage: `url(${item.img})` }}
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground text-xs uppercase">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            <ProjectDetail open={open} onOpenChange={setOpen} project={selectedItem} />
        </>
    );
};

const Projects: React.FC = () => {
    return (
        <section className="min-h-screen pt-20 px-4 bg-background" id="projects">
            <div className="max-w-7xl mx-auto space-y-12">
                <Masonry items={PROJECTS} />
            </div>
        </section>
    );
};

export default Projects;