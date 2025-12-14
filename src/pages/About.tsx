import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from "motion/react";
import graduationImage from "@/images/me/graduation.jpg";
import TiltedCard from "@/components/TiltedCard";
import AnimatedContent from '@/components/AnimatedContent';
import RotatingText from '@/components/RotatingText';
import { ProjectDetail } from "@/components/ProjectDetail";
import { PROJECTS, getProjectById, type Project } from "@/data/projects";

const useIsTouchDevice = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        const check = () => setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        check();
        window.addEventListener('touchstart', check);
        return () => window.removeEventListener('touchstart', check);
    }, []);
    return isTouchDevice;
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

export default function About() {
    const isTouchDevice = useIsTouchDevice();

    // Timeline refs & state
    const containerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [timelineHeight, setTimelineHeight] = useState(0);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);

    const openDetail = (item: Project) => {
        setSelected(item);
        setOpen(true);
    };

    // Preload images
    useEffect(() => {
        const urls = [graduationImage, ...PROJECTS.map(p => p.img!).filter(Boolean)];
        urls.forEach(src => { new Image().src = src; });
    }, []);

    // Measure timeline height for progress line
    useEffect(() => {
        const update = () => {
            if (timelineRef.current) setTimelineHeight(timelineRef.current.getBoundingClientRect().height);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, timelineHeight]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const timelineData = [
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
        <>
            {/* ===== HERO - FULL VIEWPORT CENTERED ===== */}
            <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-10 text-center bg-background">
                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    duration={1}
                    ease="power3.out"
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.2}
                    delay={0.3}
                >
                    {isTouchDevice ? (
                        <img
                            src={graduationImage}
                            alt="Kevin Kim"
                            className="w-64 h-64 rounded-full mb-6 object-cover"
                            draggable={false}
                        />
                    ) : (
                        <TiltedCard
                            imageSrc={graduationImage}
                            altText="Kevin Kim"
                            containerHeight="16rem"
                            containerWidth="16rem"
                            imageHeight="16rem"
                            imageWidth="16rem"
                            scaleOnHover={1.1}
                            rotateAmplitude={10}
                            showMobileWarning={false}
                            showTooltip={false}
                            displayOverlayContent={false}
                            borderRadius="50%"
                        />
                    )}
                </AnimatedContent>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight pt-6">
                    Hi, I'm Kevin
                </h1>

                {/* Bio */}
                <div className="max-w-2xl mx-auto px-6 pt-5 text-center">
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        I'm an interactive designer and developer passionate about blending{" "}
                        <span className="text-foreground font-semibold">technology</span> and{" "}
                        <span className="text-foreground font-semibold">education</span>.
                        <br /><br />
                        For the past few years, I've been building VR/MR games, AI-powered productivity tools, and immersive learning experiences for research purposes.
                    </p>
                </div>
            </section>

            <main className="bg-background">
                {/* Timeline - 100% identical to your original Timeline page */}
                <section ref={containerRef} className="max-w-4xl mx-auto text-foreground font-sans py-10">
                    <div ref={timelineRef} className="relative max-w-7xl mx-auto pb-20">
                        {timelineData.map((item, index) => (
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

                        {/* Scroll Progress Line */}
                        <div
                            style={{ height: timelineHeight + "px" }}
                            className="absolute md:left-8 left-8 top-0 w-[2px] overflow-hidden
                                    bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
                                    from-transparent via-border to-transparent
                                    [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
                        >
                            <motion.div
                                style={{ height: heightTransform, opacity: opacityTransform }}
                                className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary via-accent to-transparent rounded-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Hobbies */}
                <section className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2 max-w-2xl mx-auto">
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                            Outside of work, I enjoy playing
                        </p>
                        <RotatingText
                            texts={['🏀', '🎹', '🎸', '♟️', 'Smash Bros', 'board games', 'card games']}
                            mainClassName="text-base md:text-lg  text-foreground overflow-hidden justify-center rounded-lg"
                            staggerFrom={"random"}
                            initial={{ y: "-100%" }}
                            animate={{ y: 1 }}
                            exit={{ y: "100%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={3500}
                        />
                    </div>
                </section>
            </main>

            {/* Project Detail Modal */}
            <ProjectDetail open={open} onOpenChange={setOpen} project={selected} />
        </>
    );
}