import React from "react";
import Container from "@/Components/Container";
import Button from "@/Components/Button";
import SectionHeading from "../Partials/SectionHeading";
import JastipCard from "../Cards/JastipCard";

export default function JastipSection({ products }) {
    return (
        <section className="py-12 pt-4">
            <Container>
                <SectionHeading
                    label="Jasa Titip Terbaru"
                    align="right"
                    className="mb-12"
                />

                <div className="flex flex-col text-center md:text-left md:flex-row justify-between items-center mb-10 gap-4 md:gap-7">
                    <div>
                        <h2 className="text-3xl font-medium leading-normal text-neutral-700">
                            Belanja produk incaranmu
                        </h2>
                        <h2 className="text-3xl font-medium leading-normal text-neutral-500">
                            diseluruh tempat
                        </h2>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm text-neutral-700 mb-4 max-w-[400px] ml-auto">
                            Titip barang impian dari mana pun dengan mudah,
                            aman, dan praktis langsung sampai ke tangan Anda.
                        </p>
                        <Button
                            type="primary"
                            className="px-6 py-2 rounded-full text-sm"
                        >
                            Eksplor Lebih Banyak
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
                    {products.map((p) => (
                        <JastipCard key={p.id} product={p} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
