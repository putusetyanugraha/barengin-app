import React from "react";
import Container from "@/Components/Container";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import SectionHeading from "../Partials/SectionHeading";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaYoutube,
    FaInstagram,
} from "react-icons/fa";

export default function ContactSection() {
    const socials = [
        { label: "Facebook", href: "#", Icon: FaFacebookF },
        { label: "LinkedIn", href: "#", Icon: FaLinkedinIn },
        { label: "YouTube", href: "#", Icon: FaYoutube },
        { label: "Instagram", href: "#", Icon: FaInstagram },
    ];
    return (
        <section className="py-12 pt-4">
            <Container>
                <SectionHeading
                    label="Hubungi Kami"
                    align="right"
                    className="mb-12"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    <div className="block md:hidden">
                        <img
                            src="/assets/home/contact-us.jpg"
                            alt="Contact"
                            className="w-full h-64 object-cover rounded-2xl"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-medium mb-4 text-neutral-700 max-w-md leading-normal">
                            Tuliskan saran{" "}
                            <span className="text-neutral-500">
                                maupun permintaan sekarang
                            </span>
                        </h2>
                        <p className="text-sm text-neutral-700 mb-6">
                            Ada pertanyaan atau saran buat liburanmu? Yuk,
                            hubungi kami di sini dan mari buat perjalananmu
                            lebih seru bareng-bareng!
                        </p>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <Input
                                label="Nama"
                                placeholder="Nama Lengkap Anda"
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Kita akan kembali pada Anda disini"
                            />

                            <Textarea
                                label="Message"
                                placeholder="Tuliskan bagaimana saran ataupun bantuan yang anda inginkan"
                                rows={4}
                            />

                            <Button
                                type="primary"
                                className="md:w-fit px-12 py-3 mt-2 rounded-lg w-full"
                            >
                                Kirim Pesan
                            </Button>
                        </form>
                    </div>

                    <div>
                        <img
                            src="/assets/home/contact-us.jpg"
                            alt="Contact"
                            className="w-full h-64 object-cover rounded-2xl mb-8 hidden md:block"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium mb-2 text-neutral-700">
                                    Kunjungi kami sekarang
                                </h4>
                                <p className="text-sm text-neutral-700 flex items-start gap-2">
                                    <FaLocationDot
                                        className="mt-1 text-lg shrink-0 text-neutral-600"
                                        size={15}
                                    />
                                    Jl. Pakuan No.3, Sumur Batu, Kec. Babakan
                                    Madang, Kabupaten Bogor, Jawa Barat 16810,
                                    Indonesia
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2 text-neutral-700">
                                    Bicara kepada kami
                                </h4>
                                <p className="text-sm text-neutral-700 flex items-center gap-2 mb-2">
                                    <FaPhone
                                        className="text-lg shrink-0 text-neutral-600"
                                        size={15}
                                    />
                                    +628123123123
                                </p>
                                <p className="text-sm text-neutral-700 flex items-center gap-2">
                                    <FaEnvelope
                                        className="text-lg shrink-0 text-neutral-600"
                                        size={15}
                                    />
                                    barenginapp@barengin.co.id
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-8">
                            {socials.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-200 transition"
                                >
                                    <Icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
