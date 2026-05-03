import React from "react";
import Container from "@/Components/Container";
import SectionHeading from "../Partials/SectionHeading";
import GalleryGrid from "../Partials/GalleryGrid";

export default function GallerySection() {
    const images = [
        "/assets/home/gallery.jpg",
        "/assets/home/gallery.jpg",
        "/assets/home/gallery.jpg",
        "/assets/home/gallery.jpg",
        "/assets/home/gallery.jpg",
        "/assets/home/gallery.jpg",
        "/assets/home/gallery.jpg",
    ];

    const items = [
        // Mobile (grid-cols-6): 3+3
        // Desktop (grid-cols-12): 3,2,3,4
        { id: 1, src: images[0], spanClass: "col-span-3 md:col-span-3" },
        { id: 2, src: images[1], spanClass: "col-span-3 md:col-span-2" },

        // Mobile: 2+2+2 (three small tiles)
        { id: 3, src: images[2], spanClass: "col-span-2 md:col-span-3" },
        { id: 4, src: images[3], spanClass: "col-span-2 md:col-span-4" },
        { id: 5, src: images[4], spanClass: "col-span-2 md:col-span-6" },

        // Mobile: 3+3
        { id: 6, src: images[5], spanClass: "col-span-3 md:col-span-4" },
        { id: 7, src: images[6], spanClass: "col-span-3 md:col-span-2" },
    ];

    return (
        <section className="py-12 text-center mt-8 pt-4">
            <Container>
                <SectionHeading
                    label="Gallery"
                    align="center"
                    className="mb-12"
                />

                <h2 className="text-3xl font-medium mb-10 text-neutral-700 leading-normal">
                    Temukan Bentang Alam,{" "}
                    <span className="text-neutral-500">
                        Budaya, dan
                        <br /> Momen-Momen dalam Foto
                    </span>
                </h2>

                <div className="mb-8">
                    <GalleryGrid items={items} ctaLabel="Lihat Lebih Banyak" />
                </div>

                <p className="text-sm text-neutral-700 max-w-2xl mx-auto">
                    Masuki dunia melalui galeri kurasi kami, yang mengabadikan
                    keindahan, budaya, dan momen tak terlupakan dari perjalanan
                    kami di seluruh negeri.
                </p>
            </Container>
        </section>
    );
}
