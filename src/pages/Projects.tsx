import React from "react";
import Masonry from "@/components/Masonry";
import huetopiaImage from "@/images/huetopia/huetopia_0.png";
import specialRelativityImage from "@/images/specialrelativity/specialrelativity_13.gif";
import labbitImage from "@/images/labbit/labbit_1.png";
import apparelDesignImage from "@/images/appareldesign/appareldesign_1.gif";
import ocdSimulationImage from "@/images/ocdsimulation/ocd_1.gif";

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
        description: "A fast-paced casual survival game where players must outsmart wildfires, making strategic decisions to put out fires.",
        url: "https://github.com/games4cause/wildfire/",
        height: 400,
    },
    {
        id: "4",
        name: "GraphicsHub",
        description: "A collection of interactive graphics and visualizations.",
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

const Projects: React.FC = () => {
    return (

        <div className="min-h-screen bg-background flex flex-col p-4">
            <main className="flex flex-1 justify-center items-start pt-25" id="projects">
                <Masonry
                    items={projectItems}
                    ease="power3.out"
                    duration={0.6}
                    stagger={0.05}
                    animateFrom="bottom"
                    scaleOnHover={true}
                    hoverScale={0.95}
                    blurToFocus={true}
                    colorShiftOnHover={false}
                />
            </main>
        </div>
    );
};

export default Projects;