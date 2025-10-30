// Timeline.tsx
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
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
import { FaMeta, FaGithub } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";

import graduationImage from "@/images/me/graduation.jpg";
import { PROJECTS, getProjectById, type Project } from "@/data/projects";

const preloadImages = async (urls: string[]) => {
    await Promise.all(
        urls.map(
            (src) =>
                new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

const ImageComponent = ({
    item,
    onOpen,
}: {
    item: Project;
    onOpen: (i: Project) => void;
}) => (
    <button
        onClick={() => onOpen(item)}
        className="group block focus:outline-none cursor-pointer">
        <img
            src={item.img}
            alt={item.name}
            width={200}
            height={200}
            className="h-24 w-48 rounded-lg object-cover sm:h-32 sm:w-64 md:h-40 md:w-80 transition-transform group-hover:scale-95"
        />
    </button>
);

export function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);
    const isDesktop = typeof window !== "undefined"
        ? window.matchMedia("(min-width: 768px)").matches
        : true;

    const openDetail = (item: Project) => {
        setSelected(item);
        setOpen(true);
    };

    useEffect(() => {
        const urls = [graduationImage, ...PROJECTS.map((p) => p.img!).filter(Boolean)];
        preloadImages(urls);
    }, []);

    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
        };
        updateHeight();
        window.addEventListener("resize", updateHeight);
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    /* Timeline entries using shared project data */
    const data = [
        {
            title: "Now",
            content: (
                <p className="text-base font-normal text-muted-foreground mb-6">
                    Focusing on building an AI-powered productivity platform that gamifies
                    note-taking and problem-solving.
                </p>
            ),
        },
        {
            title: "2025",
            content: (
                <div>
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Developed Labbit, Arcadex, and special relativity education module.
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                        <ImageComponent item={getProjectById("labbit")!} onOpen={openDetail} />
                        <ImageComponent item={getProjectById("special-relativity")!} onOpen={openDetail} />
                    </div>
                </div>
            ),
        },
        {
            title: "2024",
            content: (
                <div>
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Developed and launched Huetopia.
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                        <ImageComponent item={getProjectById("huetopia")!} onOpen={openDetail} />
                    </div>
                </div>
            ),
        },
        {
            title: "2023.12",
            content: (
                <div>
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Graduated from Cornell!
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                        <button onClick={() => openDetail({ id: "grad", name: "Graduation", img: graduationImage, height: 400 })}>
                            <img
                                src={graduationImage}
                                alt="Graduation"
                                className="h-24 w-48 rounded-lg object-cover sm:h-32 sm:w-64 md:h-40 md:w-80 transition-transform hover:scale-105"
                            />
                        </button>
                    </div>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Explored foundational concepts of computer graphics.
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                        <ImageComponent item={getProjectById("graphics")!} onOpen={openDetail} />
                    </div>
                </div>
            ),
        },
        {
            title: "2022",
            content: (
                <div>
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Engaged in VR development by building an OCD simulation module and an apparel design education module.
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                        <ImageComponent item={getProjectById("ocd")!} onOpen={openDetail} />
                        <ImageComponent item={getProjectById("apparel")!} onOpen={openDetail} />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div ref={containerRef} className="max-w-4xl mx-auto text-foreground font-sans">
            <div className="w-full mx-auto pt-24 px-4 md:px-8 lg:px-10 lg:pb-5">
                <p className="text-base text-center font-normal text-muted-foreground">
                    I&apos;ve been building a couple of projects over the past few years. Here&apos;s
                    a timeline of my development journey.
                </p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`flex justify-start md:gap-10 ${index === 0 ? 'pt-10 md:pt-10' : 'pt-10 md:pt-20'}`}
                    >
                        <div className="sticky top-40 z-40 flex flex-col md:flex-row items-center self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="absolute left-3 md:left-3 h-10 w-10 rounded-full bg-card flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-muted border border-border" />
                            </div>
                            <h3 className="hidden md:block pl-20 text-xl md:text-5xl font-bold text-foreground">
                                {item.title}
                            </h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-foreground">
                                {item.title}
                            </h3>
                            {item.content}
                        </div>
                    </div>
                ))}

                <div
                    style={{ height: height + "px" }}
                    className="absolute md:left-8 left-8 top-0 w-[2px] overflow-hidden
                        bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                        from-transparent via-border to-transparent
                        [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-accent to-transparent rounded-full"
                    />
                </div>
            </div>

            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>{selected?.name}</DialogTitle>
                            {selected?.description && (
                                <DialogDescription>{selected.description}</DialogDescription>
                            )}
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            {selected?.img && (
                                <img
                                    src={selected.img}
                                    alt={selected.name}
                                    className="w-full rounded-lg aspect-video object-cover"
                                />
                            )}
                            {selected?.url && (
                                <Button
                                    className="w-full"
                                    onClick={() => window.open(selected.url, "_blank")}
                                >
                                    {selected.url.includes("meta.com") ? (
                                        <FaMeta className="w-4 h-4 mr-2" />
                                    ) : selected.url.includes("github.com") ? (
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
                            <DrawerTitle>{selected?.name}</DrawerTitle>
                            {selected?.description && (
                                <DrawerDescription>{selected.description}</DrawerDescription>
                            )}
                        </DrawerHeader>
                        <div className="p-4 space-y-4">
                            {selected?.img && (
                                <img
                                    src={selected.img}
                                    alt={selected.name}
                                    className="w-full rounded-lg aspect-video object-cover"
                                />
                            )}
                            {selected?.url && (
                                <Button
                                    className="w-full"
                                    onClick={() => window.open(selected.url, "_blank")}
                                >
                                    {selected.url.includes("meta.com") ? (
                                        <FaMeta className="w-4 h-4 mr-2" />
                                    ) : selected.url.includes("github.com") ? (
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
        </div>
    );
}