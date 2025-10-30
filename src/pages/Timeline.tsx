import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import labbitImage from "@/images/labbit/labbit_1.png";
import specialRelativityImage from "@/images/specialrelativity/specialrelativity_13.gif";
import huetopiaImage from "@/images/huetopia/huetopia_0.png";
import graduationImage from "@/images/me/graduation.jpg";
import graphicsImage from "@/images/graphics/graphics_1.gif";
import ocdSimulationImage from "@/images/ocdsimulation/ocd_1.gif";
import apparelDesignImage from "@/images/appareldesign/appareldesign_1.gif";

const preloadImages = async (urls: string[]) => {
    await Promise.all(
        urls.map((src) =>
            new Promise<void>((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = img.onerror = () => resolve();
            })
        )
    );
};

const ImageComponent = ({ src, alt }: { src?: string; alt: string }) => (
    <img
        src={src}
        alt={alt}
        width={200}
        height={200}
        className="h-24 w-48 rounded-lg object-cover sm:h-32 sm:w-64 md:h-40 md:w-80 transition-transform hover:scale-105"
    />
);

export function Timeline() {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    const imageUrls = [
        labbitImage,
        specialRelativityImage,
        huetopiaImage,
        graduationImage,
        ocdSimulationImage,
        apparelDesignImage,
    ];

    useEffect(() => {
        preloadImages(imageUrls);
    }, []);

    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setHeight(rect.height);
            }
        };

        updateHeight();

        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const data = [
        {
            title: "Now",
            content: (
                <div>
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Focusing on building an AI-powered productivity platform that gamifies note-taking and problem-solving.
                    </p>
                </div>
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
                        <ImageComponent src={labbitImage} alt="Labbit" />
                        <ImageComponent src={specialRelativityImage} alt="Special Relativity" />
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
                        <ImageComponent src={huetopiaImage} alt="Huetopia" />
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
                        <ImageComponent src={graduationImage} alt="Cornell" />
                    </div>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Explored foundational concepts of computer graphics through a couple of graphics programming projects.
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                        <ImageComponent src={graphicsImage} alt="Graphics" />
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
                        <ImageComponent src={ocdSimulationImage} alt="OCD Simulation" />
                        <ImageComponent src={apparelDesignImage} alt="Apparel Design" />
                    </div>
                </div>
            ),
        }
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
        </div>
    );
}