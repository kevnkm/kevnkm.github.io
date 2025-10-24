import { useEffect } from "react";
import { Timeline } from "@/components/ui/timeline";
import labbitImage from "@/images/labbit/labbit_1.png";
import specialRelativityImage from "@/images/specialrelativity/specialrelativity_13.gif";
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
        width={200}
        height={200}
        className="h-24 w-48 rounded-lg object-cover sm:h-32 sm:w-64 md:h-40 md:w-80 transition-transform hover:scale-105"
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
                    <p className="text-base font-normal text-muted-foreground mb-6">
                        Focusing on building an AI-powered productivity platform that gamifies note-taking and problem-solving.
                    </p>
                    <div className="flex flex-wrap justify-start gap-4">
                    </div>
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
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <Timeline data={data} />
            </div>
        </div>
    );
}