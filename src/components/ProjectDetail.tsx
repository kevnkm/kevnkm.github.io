// src/components/ProjectDetail.tsx

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
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

    const ModalContent = (
        <>
            <DialogHeader className="sm:hidden md:block">
                <DialogTitle>{project.name}</DialogTitle>
                {project.description && <DialogDescription>{project.description}</DialogDescription>}
            </DialogHeader>

            <DrawerHeader className="md:hidden">
                <DrawerTitle>{project.name}</DrawerTitle>
                {project.description && <DrawerDescription>{project.description}</DrawerDescription>}
            </DrawerHeader>

            <div className="space-y-4 py-4">
                {project.img && (
                    <img
                        src={project.img}
                        alt={project.name}
                        className="w-full rounded-lg aspect-video object-cover"
                    />
                )}
                {project.url && (
                    <Button className="w-full" onClick={() => window.open(project.url, "_blank")}>
                        <Icon className="w-4 h-4 mr-2" />
                        View Project
                    </Button>
                )}
            </div>

            {/* Drawer only needs a footer */}
            {(!isDesktop) && (
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline" className="w-full">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            )}
        </>
    );

    return isDesktop ? (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl">{ModalContent}</DialogContent>
        </Dialog>
    ) : (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>{ModalContent}</DrawerContent>
        </Drawer>
    );
};