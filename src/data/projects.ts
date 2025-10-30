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
    id: "huetopia",
    name: "Huetopia",
    description:
      "An XR tabletop game that reimagines classic property-trading mechanics in an immersive environment.",
    img: huetopiaImage,
    url: "https://www.meta.com/experiences/26230755453235481/",
    height: 800,
  },
  {
    id: "special-relativity",
    name: "Special Relativity Simulator",
    description:
      "An interactive simulation that visually demonstrates the principles of special relativity, allowing users to experience time dilation, length contraction, and the relativity of simultaneity through engaging scenarios.",
    img: specialRelativityImage,
    url: "https://github.com/kevnkm/special-relativity",
    height: 500,
  },
  {
    id: "arcadex",
    name: "Arcadex",
    description:
      "A collection of retro-style arcade game in immersive environments, designed for quick play sessions and high replayability.",
    url: "https://www.cubeloom.com/",
    height: 400,
  },
  {
    id: "labbit",
    name: "Labbit",
    description:
      "A gamified learning app that help users learn physics concepts through interactive experiments and challenges.",
    img: labbitImage,
    url: "https://www.cubeloom.com/",
    height: 500,
  },
  {
    id: "wildfire",
    name: "Wildfire",
    description:
      "A fast-paced casual survival game focused on wildfire awareness and charity.",
    url: "https://github.com/games4cause/wildfire/",
    height: 400,
  },
  {
    id: "graphics",
    name: "GraphicsHub",
    description: "A collection of interactive graphics and visualizations.",
    img: graphicsImage,
    url: "https://kevnkm.github.io/graphics/",
    height: 400,
  },
  {
    id: "roster-tracker",
    name: "Roster Tracker",
    description:
      "A web app to help users manage and track rosters for professional sports.",
    url: "https://kevnkm.github.io/rosters/",
    height: 400,
  },
  {
    id: "apparel",
    name: "Apparel Design Module",
    description:
      "A VR module that educates users on apparel design concepts through interactive lessons and quizzes.",
    img: apparelDesignImage,
    url: "https://github.com/kevnkm/apparel-design",
    height: 500,
  },
  {
    id: "ocd",
    name: "OCD Simulation Module",
    description:
      "A VR simulation that provides users with an immersive experience to understand the challenges faced by individuals with Obsessive-Compulsive Disorder (OCD).",
    img: ocdSimulationImage,
    url: "https://github.com/kevnkm/ocd-simulation",
    height: 600,
  },
];

// Helper: Get project by ID
export const getProjectById = (id: string): Project | undefined =>
  PROJECTS.find((p) => p.id === id);
