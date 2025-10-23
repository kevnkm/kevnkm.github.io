import React from "react";
import Masonry from "@/components/Masonry";
import Header from "@/components/Header";
import huetopiaImage from "@/images/huetopia/huetopia_0.png";
import specialRelativityImage from "@/images/specialrelativity/specialrelativity_1.png";
import labbitImage from "@/images/labbit/labbit_1.png";
import apparelDesignImage from "@/images/appareldesign/appareldesign_1.gif";
import ocdSimulationImage from "@/images/ocdsimulation/ocd_1.gif";

const projectItems = [
    {
        id: "0",
        img: huetopiaImage,
        url: "https://www.meta.com/experiences/26230755453235481/",
        height: 500,
    },
    {
        id: "8",
        img: specialRelativityImage,
        url: "https://github.com/kevnkm/special-relativity",
        height: 500,
    },
    {
        id: "1",
        url: "https://www.cubeloom.com/",
        height: 400,
    },
    {
        id: "2",
        img: labbitImage,
        url: "https://www.cubeloom.com/",
        height: 500,
    },
    {
        id: "3",
        url: "https://github.com/games4cause/wildfire/",
        height: 400,
    },
    {
        id: "4",
        url: "https://kevnkm.github.io/graphics/",
        height: 400,
    },
    {
        id: "5",
        url: "https://kevnkm.github.io/rosters/",
        height: 400,
    },
    {
        id: "6",
        img: apparelDesignImage,
        url: "https://github.com/kevnkm/apparel-design",
        height: 500,
    },
    {
        id: "7",
        img: ocdSimulationImage,
        url: "https://github.com/kevnkm/ocd-simulation",
        height: 500,
    },
];

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
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

export default Home;