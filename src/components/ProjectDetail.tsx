// src/components/ProjectDetail.tsx

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { FaMeta, FaGithub } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";
import React from "react";

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

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = React.useState(true);

    React.useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return isDesktop;
}

export const ProjectDetail = ({ open, onOpenChange, project }: ProjectDetailProps) => {
    const isDesktop = useIsDesktop();

    if (!project) return null;

    const hasLink = Boolean(project.url);

    const Icon = hasLink
        ? project.url!.includes("meta.com")
            ? FaMeta
            : project.url!.includes("github.com")
                ? FaGithub
                : ExternalLink
        : ExternalLink;

    const Body = (
        <div className="space-y-6">
            {project.img && (
                <img
                    src={project.img}
                    alt={project.name}
                    className="w-full aspect-video rounded-lg object-cover shadow-sm"
                />
            )}

            {project.description && (
                <Button
                    className="w-full h-11 text-base font-medium gap-2"
                    disabled={!hasLink}
                    onClick={
                        hasLink ? () => window.open(project.url!, "_blank") : undefined
                    }
                >
                    <Icon className="w-4 h-4" />
                    {hasLink ? "View Project" : "Coming Soon"}
                </Button>
            )}
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-xl gap-4">
                    <DialogHeader className="space-y-2">
                        <DialogTitle className="text-xl">
                            {project.name}
                        </DialogTitle>
                        {project.description && (
                            <DialogDescription className="text-sm">
                                {project.description}
                            </DialogDescription>
                        )}
                    </DialogHeader>

                    {Body}
                </DialogContent>
            </Dialog>
        );
    }

    return (
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

                <div className="px-6">{Body}</div>
            </DrawerContent>
        </Drawer>
    );
};