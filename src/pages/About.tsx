import { useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import Header from "@/components/Header";
import labbitImage from "@/images/labbit/labbit_1.png";
import specialRelativityImage from "@/images/specialrelativity/specialrelativity_1.png";
import huetopiaImage from "@/images/huetopia/huetopia_0.png";
import graduationImage from "@/images/me/graduation.jpg";
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
        width={500}
        height={500}
        className="h-20 w-full rounded-lg object-cover 
        md:h-44 lg:h-60"
    />
);

export function About() {
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

    const data = [
        {
            title: "Now",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        Focusing on building an AI-powered productivity platform that gamifies note-taking and problem-solving.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                    </div>
                </div>
            ),
        },
        {
            title: "2025",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        Developed Labbit, Arcadex, and special relativity education module.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
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
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        Developed and launched Huetopia.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <ImageComponent src={huetopiaImage} alt="Huetopia" />
                    </div>
                </div>
            ),
        },
        {
            title: "2023.12",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        Graduated from Cornell!
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <ImageComponent src={graduationImage} alt="Cornell" />
                    </div>
                </div>
            ),
        },
        {
            title: "2023",
            content: (
                <div>
                    <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        Explored foundational concepts of computer graphics by working on a couple of graphics programming projects.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                    </div>
                </div>
            ),
        },
        {
            title: "2022",
            content: (
                <div>
                    <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        Engaged in VR development by building an OCD simulation module and an apparel design education module.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <ImageComponent src={ocdSimulationImage} alt="OCD Simulation" />
                        <ImageComponent src={apparelDesignImage} alt="Apparel Design" />
                    </div>
                </div>
            ),
        },
        {
            title: "2020",
            content: (
                <div>
                    <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
                        Read <a href="https://en.wikipedia.org/wiki/Homo_Ludens" target="_blank" rel="noopener noreferrer">Homo Ludens</a>
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                    </div>
                </div >
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col px-4 pt-30 pb-[50vh]">
                <div className="container mx-auto">
                    <div className="relative w-full overflow-clip">
                        <Timeline data={data} />
                    </div>
                </div>
            </main>
        </div>
    );
}