import React from "react";
import logo from "../images/kevnkm_icon.png";
import MasonryGrid from "../components/MasonryGrid";
import StaggeredMenu from "../components/StaggeredMenu";
import type { MasonryItem } from "../components/MasonryCard";

const tags = [
    "Games",
    "XR",
    "Mobile",
    "Web",
    "Graphics",
    "Research",
    "VR",
    "Desktop",
    "Data",
    "Education",
    "Sports"
];

const projectItems: MasonryItem[] = [
    {
        id: 0,
        title: "Huetopia",
        tags: [tags[0], tags[1]],
        description: "Multiplayer XR tabletop strategy game",
        link: "https://www.meta.com/experiences/26230755453235481/",
        start: "2023",
        height: 300,
        images: Object.values(
            import.meta.glob('/src/images/huetopia/*.{jpg,png}', { eager: true, import: 'default' })
        ),
    },
    {
        id: 8,
        title: "Special Relativity",
        tags: [tags[6], tags[9]],
        description: "Dialogue-based VR learning module on special relativity",
        link: "https://github.com/kevnkm/special-relativity",
        start: "2025",
        finish: "2025",
        height: 300,
        images: Object.values(
            import.meta.glob('/src/images/specialrelativity/*.{jpg,png}', { eager: true, import: 'default' })
        ),
    },
    {
        id: 1,
        title: "Arcadex",
        tags: [tags[0], tags[1]],
        description: "Compilation of XR arcade games",
        link: "https://www.cubeloom.com/",
        start: "2025",
        images: Object.values(
            import.meta.glob('/src/images/arcadex/*.{jpg,png}', { eager: true, import: 'default' })
        ),
    },
    {
        id: 2,
        title: "Labbit",
        tags: [tags[0], tags[1], tags[9]],
        description: "Gamified learning app for physics",
        link: "https://www.cubeloom.com/",
        start: "2025",
        height: 300,
        images: Object.values(
            import.meta.glob('/src/images/labbit/*.{jpg,png}', { eager: true, import: 'default' })
        ),
    },
    {
        id: 3,
        title: "Wildfire",
        tags: [tags[0], tags[2]],
        description: "Designing impactful games for social good",
        link: "https://github.com/games4cause/wildfire/",
        start: "2025",
        images: Object.values(
            import.meta.glob('/src/images/wildfire/*.jpg', { eager: true, import: 'default' })
        ),
    },
    {
        id: 4,
        title: "Graphics Hub",
        tags: [tags[4], tags[3]],
        description: "Showcase of computer graphics demos",
        link: "https://kevnkm.github.io/graphics/",
        start: "2023",
        images: Object.values(
            import.meta.glob('/src/images/graphicshub/*.jpg', { eager: true, import: 'default' })
        ),
    },
    {
        id: 5,
        title: "Roster Tracker",
        tags: [tags[8], tags[3], tags[10]],
        description: "Track and analyze sports rosters",
        link: "https://kevnkm.github.io/rosters/",
        start: "2024",
        images: Object.values(
            import.meta.glob('/src/images/rostertracker/*.jpg', { eager: true, import: 'default' })
        ),
    },
    {
        id: 6,
        title: "Apparel Design",
        tags: [tags[5], tags[6], tags[7]],
        description: "Apparel design education module",
        link: "https://github.com/kevnkm/GarmentQuizDesktop",
        start: "2022",
        finish: "2022",
        height: 300,
        images: Object.values(
            import.meta.glob('/src/images/appareldesign/*.{gif,jpg,jpeg,png}', { eager: true, import: 'default' })
        ),
    },
    {
        id: 7,
        title: "OCD Simulation",
        tags: [tags[5], tags[6], tags[7]],
        description: "Simulation of OCD symptoms",
        link: "https://github.com/kevnkm/ocd-simulation",
        start: "2022",
        finish: "2022",
        height: 300,
        images: Object.values(
            import.meta.glob('/src/images/ocdsimulation/*.{gif,jpg,jpeg,png}', { eager: true, import: 'default' })
        ),
    },
];

// Menu configuration
const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Projects', ariaLabel: 'View my projects', link: '/#projects' },
    { label: 'About', ariaLabel: 'Learn about me', link: '/about' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
];

const socialItems = [
    { label: 'GitHub', link: 'https://github.com/kevnkm' },
    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/kevnkm/' }
];

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <header className="relative z-50 h-16 flex items-center">
                <StaggeredMenu
                    position="right"
                    items={menuItems}
                    socialItems={socialItems}
                    displaySocials={true}
                    displayItemNumbering={true}
                    menuButtonColor="#000"
                    openMenuButtonColor="#ff6b6b"
                    changeMenuColorOnOpen={true}
                    colors={['#B19EEF', '#5227FF']}
                    logoUrl={logo}
                    accentColor="#ff6b6b"
                    onMenuOpen={() => console.log('Menu opened')}
                    onMenuClose={() => console.log('Menu closed')}
                />
            </header>

            <main className="flex flex-1 justify-center items-start pt-8" id="projects">
                <MasonryGrid items={projectItems} />
            </main>

            <footer className="bg-gray-100 text-center text-gray-500 text-sm py-4 mt-auto">
                <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex justify-center space-x-4">
                        <a
                            href="https://github.com/kevnkm"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-blue-500"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/kevnkm/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline text-blue-500"
                        >
                            LinkedIn
                        </a>
                    </div>
                    <div className="text-center sm:text-left">
                        © {new Date().getFullYear()} Kevin Kim. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;