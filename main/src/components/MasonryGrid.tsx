import React from "react";
import type { MasonryItem } from "./MasonryCard";
import MasonryCard from "./MasonryCard";

interface MasonryGridProps {
    items: MasonryItem[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-2">
            <div className="masonry-wrapper">
                {items.map((item) => (
                    <MasonryCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default MasonryGrid;
