import React from "react";
import Button from "@/Components/Button";
import GalleryItem from "../Cards/GalleryItem";

export default function GalleryGrid({
    items,
    ctaLabel = "Lihat Lebih Banyak",
    onCtaClick,
}) {
    return (
        <div className="relative">
            {/* 6 cols on mobile/tablet, 12 cols on md+ */}
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {items.map((item) => (
                    <GalleryItem
                        key={item.id}
                        src={item.src}
                        alt={item.alt}
                        className={[
                            // smaller height on mobile, bigger on desktop
                            item.heightClass ?? "h-32 sm:h-40 md:h-56",
                            // responsive spans per item
                            item.spanClass,
                        ].join(" ")}
                    />
                ))}
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Button
                    type="neutral"
                    variant="outline"
                    rounded={true}
                    className="pointer-events-auto shadow-lg bg-white"
                    onClick={onCtaClick}
                >
                    {ctaLabel}
                </Button>
            </div>
        </div>
    );
}
