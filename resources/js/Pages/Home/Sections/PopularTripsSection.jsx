import React from "react";
import Container from "@/Components/Container";
import Button from "@/Components/Button";
import SectionHeading from "../Partials/SectionHeading";
import TripCard from "../Cards/TripCard";

export default function PopularTripsSection({ trips }) {
    return (
        <section className="py-12 pt-4">
            <Container>
                <SectionHeading
                    label="Trip Popular"
                    align="center"
                    className="mb-12"
                />

                <div className="flex flex-col text-center md:text-left md:flex-row justify-between items-center mb-10 gap-4 md:gap-7">
                    <div>
                        <h2 className="text-3xl font-medium leading-normal text-neutral-700">
                            Perjalanan Melalui
                        </h2>
                        <h2 className="text-3xl font-medium leading-normal text-neutral-500">
                            Destinasi Terbaik di Dunia
                        </h2>
                    </div>

                    <div className="text-center md:text-right">
                        <p className="text-sm text-neutral-700 mb-4 max-w-[400px] ml-auto">
                            Jelajahi kota kosmopolitan dengan perpaduan budaya
                            dan kehidupan modern yang dinamis.
                        </p>
                        <Button
                            type="primary"
                            rounded={true}
                            className="px-6 py-2"
                        >
                            Eksplor Lebih Banyak
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
                    {trips.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
