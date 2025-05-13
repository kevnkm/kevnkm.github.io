import React, { useState, useEffect } from "react";

export interface MasonryItem {
    id: number;
    title: string;
    tags: string[];
    height?: number;
    description: string;
    link: string;
    start: string;
    finish?: string;
    images?: string[]; // Optional list of image URLs
}

interface MasonryCardProps {
    item: MasonryItem;
}

const MasonryCard: React.FC<MasonryCardProps> = ({ item }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Randomly select next image and transition every 5 seconds, only if images exist
    useEffect(() => {
        if (!item.images || item.images.length <= 1) return; // Skip if images is undefined or has 0/1 image

        const interval = setInterval(() => {
            const nextIndex = Math.floor(Math.random() * (item.images ? item.images.length : 0));
            setCurrentImageIndex(nextIndex);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [item.images]);

    const displayDuration =
        !item.finish ? `${item.start} - Current`
            : item.finish !== item.start ? `${item.start} - ${item.finish}`
                : item.start;

    return (
        <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block group relative"
        >
            <div
                className="bg-gray-100 p-4 rounded shadow relative overflow-hidden flex flex-col justify-between"
                style={{ height: item.height ?? 70 }} // Default height of 70px
            >
                {item.images && item.images.length > 0 && (
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                        style={{
                            backgroundImage: `url(${item.images[currentImageIndex]})`,
                            opacity: 1,
                        }}
                    />
                )}
                <div>
                    <div className="text-xs text-gray-500 font-medium">
                        {displayDuration} | {item.tags.map(tag => `#${tag}`).join(" ")}
                    </div>
                    <div className="text-lg font-semibold">{item.title}</div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-90">
                    <div className="text-sm text-white text-center">{item.description}</div>
                </div>
            </div>
        </a>
    );
};

export default MasonryCard;