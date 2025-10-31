// src/components/ProjectDetail.tsx

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaMeta, FaGithub } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";

export type ProjectDetailProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    project: {
        name: string;
        description?: string;
        img?: string;
        url?: string;
    } | null;
};

export const ProjectDetail = ({ open, onOpenChange, project }: ProjectDetailProps) => {
    const isDesktop = typeof window !== "undefined"
        ? window.matchMedia("(min-width: 768px)").matches
        : true;
    if (!project) return null;

    const Icon = project.url?.includes("meta.com")
        ? FaMeta
        : project.url?.includes("github.com")
            ? FaGithub
            : ExternalLink;

    return isDesktop ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl gap-4">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-xl">{project.name}</DialogTitle>
                    {project.description && (
                        <DialogDescription className="text-sm">
                            {project.description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div className="space-y-6">
                    {project.img && (
                        <img
                            src={project.img}
                            alt={project.name}
                            className="w-full rounded-lg aspect-video object-cover shadow-sm"
                        />
                    )}
                    {project.url && (
                        <Button
                            className="w-full h-11 text-base font-medium gap-2"
                            onClick={() => window.open(project.url, "_blank")}
                        >
                            <Icon className="w-4 h-4" />
                            View Project
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    ) : (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="pb-8">
                <DrawerHeader className="space-y-2 text-left">
                    <DrawerTitle className="text-xl">{project.name}</DrawerTitle>
                    {project.description && (
                        <DrawerDescription className="text-sm">
                            {project.description}
                        </DrawerDescription>
                    )}
                </DrawerHeader>

                <div className="space-y-6 px-6">
                    {project.img && (
                        <img
                            src={project.img}
                            alt={project.name}
                            className="w-full rounded-lg aspect-video object-cover shadow-sm"
                        />
                    )}
                    {project.url && (
                        <Button
                            className="w-full h-11 text-base font-medium gap-2"
                            onClick={() => window.open(project.url, "_blank")}
                        >
                            <Icon className="w-4 h-4" />
                            View Project
                        </Button>
                    )}
                </div>
            </DrawerContent>
        </Drawer>
    );
};