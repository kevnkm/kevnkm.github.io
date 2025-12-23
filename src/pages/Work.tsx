import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Spinner } from "@/components/ui/spinner";
import { PROJECTS } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

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
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Get all unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        items.forEach((item) => {
            if (item.tags) {
                item.tags.forEach((tag: string) => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }, [items]);

    // Filter items based on selected tags
    const filteredItems = useMemo(() => {
        if (selectedTags.length === 0) return items;
        return items.filter((item) =>
            item.tags?.some((tag: string) => selectedTags.includes(tag))
        );
    }, [items, selectedTags]);

    // Preload
    useEffect(() => {
        const urls = items.filter((i) => i.img).map((i) => i.img!);
        if (!urls.length) {
            setImagesReady(true);
            return;
        }
        preloadImages(urls).then(() => setImagesReady(true));
    }, [items]);

    const isReady = imagesReady && width > 100;

    // Compute grid only when ready
    const estimatedHeight = useMemo(() => {
        const avgItemHeight = 420;
        const gap = 12;
        const itemsPerColumn = Math.ceil(filteredItems.length / Math.max(columns, 1));
        return Math.max(800, itemsPerColumn * (avgItemHeight + gap));
    }, [filteredItems.length, columns]);

    // Compute grid
    const { grid, gridHeight } = useMemo(() => {
        if (!isReady) return { grid: [], gridHeight: 0 };

        const colHeights = Array(columns).fill(0);
        const colWidth = width / columns;
        const gap = 12;

        const built = filteredItems.map((item) => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * colWidth + gap / 2;
            const h = item.height ? item.height / 2 : 420;
            const y = colHeights[col];
            colHeights[col] += h + gap;

            return { ...item, x, y, w: colWidth - gap, h };
        });

        return { grid: built, gridHeight: Math.max(...colHeights) };
    }, [width, columns, filteredItems, isReady]);

    // GSAP layout
    useLayoutEffect(() => {
        if (!isReady) return;

        const currentIds = new Set(grid.map(g => g.id));
        const allElements = document.querySelectorAll('[data-key]');

        allElements.forEach((el) => {
            const id = el.getAttribute('data-key');
            if (id && !currentIds.has(id)) {
                // Fade out and remove items not in current grid
                gsap.to(el, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.4,
                    ease: "power2.in",
                });
            }
        });

        if (isInitialLoad) {
            grid.forEach((item) => {
                gsap.set(`[data-key="${item.id}"]`, {
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h,
                    opacity: 1,
                    scale: 1,
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
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });
        }
    }, [grid, isReady, isInitialLoad]);

    const handleHover = (id: string, enter: boolean) => {
        gsap.to(`[data-key="${id}"]`, {
            scale: enter ? 0.95 : 1,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const openDetail = (item: any) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <>
            {/* Filter Section */}
            <div className="mb-8 space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                    {allTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div
                ref={containerRef}
                className="relative w-full max-w-7xl mx-auto overflow-hidden"
                style={{
                    height: isReady ? gridHeight : estimatedHeight,
                    transition: "height 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {/* Loading State */}
                {!isReady && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background">
                        <div className="flex flex-col items-center gap-4">
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
                            className="absolute cursor-pointer will-change-transform origin-center"
                            style={{
                                opacity: 0,
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
                                    <div className="flex items-center justify-center h-full bg-muted px-4 text-center">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            {item.name}
                                        </span>
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

const Work: React.FC = () => {
    return (
        <section className="min-h-screen pt-20 px-4 bg-background" id="projects">
            <div className="max-w-7xl mx-auto space-y-12">
                <Masonry items={PROJECTS} />
            </div>
        </section>
    );
};

export default Work;