import React from "react";
import Masonry from "../components/Masonry";
import Header from "../components/Header";

const projectItems = [
    {
        id: "0",
        img: Object.values(
            import.meta.glob("/src/images/huetopia/*.{jpg,png}", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://www.meta.com/experiences/26230755453235481/",
        height: 500,
    },
    {
        id: "8",
        img: Object.values(
            import.meta.glob("/src/images/specialrelativity/*.{jpg,png}", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://github.com/kevnkm/special-relativity",
        height: 500,
    },
    {
        id: "1",
        img: Object.values(
            import.meta.glob("/src/images/arcadex/*.{jpg,png}", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://www.cubeloom.com/",
        height: 400,
    },
    {
        id: "2",
        img: Object.values(
            import.meta.glob("/src/images/labbit/*.{jpg,png}", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://www.cubeloom.com/",
        height: 500,
    },
    {
        id: "3",
        img: Object.values(
            import.meta.glob("/src/images/wildfire/*.jpg", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://github.com/games4cause/wildfire/",
        height: 400,
    },
    {
        id: "4",
        img: Object.values(
            import.meta.glob("/src/images/graphicshub/*.jpg", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://kevnkm.github.io/graphics/",
        height: 400,
    },
    {
        id: "5",
        img: Object.values(
            import.meta.glob("/src/images/rostertracker/*.jpg", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://kevnkm.github.io/rosters/",
        height: 400,
    },
    {
        id: "6",
        img: Object.values(
            import.meta.glob("/src/images/appareldesign/*.{gif,jpg,jpeg,png}", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://github.com/kevnkm/GarmentQuizDesktop",
        height: 500,
    },
    {
        id: "7",
        img: Object.values(
            import.meta.glob("/src/images/ocdsimulation/*.{gif,jpg,jpeg,png}", {
                eager: true,
                import: "default",
            })
        )[0],
        url: "https://github.com/kevnkm/ocd-simulation",
        height: 500,
    },
];

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />

            <main className="flex flex-1 justify-center items-start pt-8" id="projects">
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