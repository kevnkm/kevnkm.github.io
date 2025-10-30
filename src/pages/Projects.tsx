import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ExternalLink } from "lucide-react";
import { FaMeta, FaGithub } from "react-icons/fa6";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

// === IMAGES ===
import huetopiaImage from "@/images/huetopia/huetopia_0.png";
import specialRelativityImage from "@/images/specialrelativity/specialrelativity_13.gif";
import labbitImage from "@/images/labbit/labbit_1.png";
import graphicsImage from "@/images/graphics/graphics_1.gif";
import apparelDesignImage from "@/images/appareldesign/appareldesign_1.gif";
import ocdSimulationImage from "@/images/ocdsimulation/ocd_1.gif";

// === DATA ===
const projectItems = [
    {
        id: "0",
        name: "Huetopia",
        description: "An XR tabletop game that reimagines classic property-trading mechanics in an immersive environment.",
        img: huetopiaImage,
        url: "https://www.meta.com/experiences/26230755453235481/",
        height: 800,
    },
    {
        id: "8",
        name: "Special Relativity Simulator",
        description: "An interactive simulation that visually demonstrates the principles of special relativity, allowing users to experience time dilation, length contraction, and the relativity of simultaneity through engaging scenarios.",
        img: specialRelativityImage,
        url: "https://github.com/kevnkm/special-relativity",
        height: 500,
    },
    {
        id: "1",
        name: "Arcadex",
        description: "A collection of retro-style arcade game in immersive environments, designed for quick play sessions and high replayability.",
        url: "https://www.cubeloom.com/",
        height: 400,
    },
    {
        id: "2",
        name: "Labbit",
        description: "A gamified learning app that help users learn physics concepts through interactive experiments and challenges.",
        img: labbitImage,
        url: "https://www.cubeloom.com/",
        height: 500,
    },
    {
        id: "3",
        name: "Wildfire",
        description: "A fast-paced casual survival game focused on wildfire awareness and charity.",
        url: "https://github.com/games4cause/wildfire/",
        height: 400,
    },
    {
        id: "4",
        name: "GraphicsHub",
        description: "A collection of interactive graphics and visualizations.",
        img: graphicsImage,
        url: "https://kevnkm.github.io/graphics/",
        height: 400,
    },
    {
        id: "5",
        name: "Roster Tracker",
        description: "A web app to help users manage and track rosters for professional sports.",
        url: "https://kevnkm.github.io/rosters/",
        height: 400,
    },
    {
        id: "6",
        name: "Apparel Design Module",
        description: "A VR module that educates users on apparel design concepts through interactive lessons and quizzes.",
        img: apparelDesignImage,
        url: "https://github.com/kevnkm/apparel-design",
        height: 500,
    },
    {
        id: "7",
        name: "OCD Simulation Module",
        description: "A VR simulation that provides users with an immersive experience to understand the challenges faced by individuals with Obsessive-Compulsive Disorder (OCD).",
        img: ocdSimulationImage,
        url: "https://github.com/kevnkm/ocd-simulation",
        height: 600,
    },
];

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
const Masonry = ({ items }: { items: typeof projectItems }) => {
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
    const isDesktop = useMedia(["(min-width: 768px)"], [true], false);

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
    const { grid, gridHeight } = useMemo(() => {
        if (!width || !imagesReady) return { grid: [], gridHeight: 0 };

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
    }, [width, columns, items, imagesReady]);

    // GSAP Animations
    useLayoutEffect(() => {
        if (!imagesReady || !grid.length) return;

        if (isInitialLoad) {
            grid.forEach((item) => {
                const sel = `[data-key="${item.id}"]`;
                gsap.set(sel, {
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                });
            });
            setIsInitialLoad(false);
            return;
        }

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
    }, [grid, imagesReady]);

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
                style={{ height: gridHeight || 600 }}
            >
                {imagesReady &&
                    grid.map((item) => (
                        <div
                            key={item.id}
                            data-key={item.id}
                            className="absolute cursor-pointer will-change-transform"
                            style={{
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
                                        className="w-full h-full bg-cover bg-center"
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

            {/* MODAL */}
            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>{selectedItem?.name}</DialogTitle>
                            {selectedItem?.description && (
                                <DialogDescription>{selectedItem.description}</DialogDescription>
                            )}
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            {selectedItem?.img && (
                                <img src={selectedItem.img} alt={selectedItem.name} className="w-full rounded-lg aspect-video object-cover" />
                            )}
                            {selectedItem?.url && (
                                <Button className="w-full" onClick={() => window.open(selectedItem.url, "_blank")}>
                                    {selectedItem.url.includes("meta.com") ? (
                                        <FaMeta className="w-4 h-4 mr-2" />
                                    ) : selectedItem.url.includes("github.com") ? (
                                        <FaGithub className="w-4 h-4 mr-2" />
                                    ) : (
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                    )}
                                    View Project
                                </Button>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>{selectedItem?.name}</DrawerTitle>
                            {selectedItem?.description && <DrawerDescription>{selectedItem.description}</DrawerDescription>}
                        </DrawerHeader>
                        <div className="p-4 space-y-4">
                            {selectedItem?.img && (
                                <img src={selectedItem.img} alt={selectedItem.name} className="w-full rounded-lg aspect-video object-cover" />
                            )}
                            {selectedItem?.url && (
                                <Button className="w-full" onClick={() => window.open(selectedItem.url, "_blank")}>
                                    {selectedItem.url.includes("meta.com") ? (
                                        <FaMeta className="w-4 h-4 mr-2" />
                                    ) : selectedItem.url.includes("github.com") ? (
                                        <FaGithub className="w-4 h-4 mr-2" />
                                    ) : (
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                    )}
                                    View Project
                                </Button>
                            )}
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-full">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    );
};

const Projects: React.FC = () => {
    return (
        <section className="min-h-screen pt-20 px-4 bg-background" id="projects">
            <div className="max-w-7xl mx-auto space-y-12">
                <Masonry items={projectItems} />
            </div>
        </section>
    );
};

export default Projects;