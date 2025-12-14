// src/data/projects.ts
import huetopiaImage from "@/images/huetopia/huetopia_0.png";
import specialRelativityImage from "@/images/specialrelativity/specialrelativity_13.gif";
import labbitImage from "@/images/labbit/labbit_1.png";
import graphicsImage from "@/images/graphics/graphics_1.gif";
import apparelDesignImage from "@/images/appareldesign/appareldesign_1.gif";
import ocdSimulationImage from "@/images/ocdsimulation/ocd_1.gif";

export type Project = {
  id: string;
  name: string;
  description?: string;
  img?: string;
  url?: string;
  height: number;
};

export const PROJECTS: Project[] = [
  {
    id: "zelf-note",
    name: "ZelfNote",
    description:
      "Note-taking app that streamlines problem solving and gamifies learning experience.",
    url: "https://www.zelfnote.com",
    height: 400,
  },
  {
    id: "huetopia",
    name: "Huetopia",
    description:
      "Tabletop game in virtual reality that reimagines classic property-trading mechanics in an immersive environment.",
    img: huetopiaImage,
    url: "https://www.meta.com/experiences/26230755453235481/",
    height: 800,
  },
  {
    id: "special-relativity",
    name: "Special Relativity Simulator",
    description:
      "Interactive simulation that visually demonstrates the principles of special relativity, allowing users to experience time dilation, length contraction, and the relativity of simultaneity through engaging scenarios.",
    img: specialRelativityImage,
    url: "https://github.com/kevnkm/special-relativity",
    height: 500,
  },
  {
    id: "spiral-jump",
    name: "Spiral Jump",
    description:
      "Casual game in mixed reality where players control a ball to pass through spiraling platforms while avoiding obstacles.",
    height: 700,
  },
  {
    id: "bounce-ball",
    name: "Bounce Ball",
    description:
      "Casual game in mixed reality where players bounce a ball between platforms while avoiding obstacles.",
    height: 500,
  },
  {
    id: "labbit",
    name: "Labbit",
    description:
      "Gamified learning app that helps users learn physics through interactive quizzes and experiments.",
    img: labbitImage,
    height: 500,
  },
  {
    id: "graphics",
    name: "GraphicsHub",
    description: "Collection of interactive graphics and visualizations",
    img: graphicsImage,
    url: "https://kevnkm.github.io/graphics/",
    height: 400,
  },
  {
    id: "roster-tracker",
    name: "Roster Tracker",
    description:
      "Web app to help users manage and track rosters for professional sports",
    url: "https://kevnkm.github.io/rosters/",
    height: 400,
  },
  {
    id: "apparel",
    name: "Apparel Design Module",
    description:
      "VR module for educating apparel design techniques through interactive lessons and quizzes.",
    img: apparelDesignImage,
    url: "https://github.com/kevnkm/apparel-design",
    height: 500,
  },
  {
    id: "ocd",
    name: "OCD Simulation Module",
    description:
      "VR simulation that provides an immersive experience to understand the challenges faced by individuals with Obsessive-Compulsive Disorder (OCD).",
    img: ocdSimulationImage,
    url: "https://github.com/kevnkm/ocd-simulation",
    height: 600,
  },
];

// Helper: Get project by ID
export const getProjectById = (id: string): Project | undefined =>
  PROJECTS.find((p) => p.id === id);
