import React from "react";

export default function GalleryItem({ src, className = "", alt = "Gallery" }) {
    return (
        <div className={["overflow-hidden rounded-2xl", className].join(" ")}>
            <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover"
                loading="lazy"
            />
        </div>
    );
}
