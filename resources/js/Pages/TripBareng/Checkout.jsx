import React, { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import axios from "axios"; 
import Container from "@/Components/Container";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import MainLayout from "@/Layouts/MainLayout";

import { FaChevronLeft, FaUserFriends, FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Checkout({ trip }) {
    const storageKey = `trip_${trip.id}_participants`;

    // 1. State Partisipan (dari LocalStorage)
    const [participants, setParticipants] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) return JSON.parse(saved);
        return [{ name: "", passport: "", phone: "", nik: "" }];
    });

    const [quantity, setQuantity] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved).length : 1;
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [snapToken, setSnapToken] = useState(null); 
    
    // --- STATE BARU UNTUK VALIDASI ERROR ---
    const [errors, setErrors] = useState([]);

    // Simpan data partisipan ke LocalStorage setiap ada perubahan
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(participants));
    }, [participants, storageKey]);

    // Muat Script Midtrans
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "Mid-client-4rh5_t-r2jDJxAyN");
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Fungsi Mengubah Data Form Partisipan
    const handleParticipantChange = (index, field, value) => {
        const newParticipants = [...participants];
        newParticipants[index][field] = value;
        setParticipants(newParticipants);

        // Hapus pesan error merah saat user mulai mengetik
        if (errors[index] && errors[index][field]) {
            const newErrors = [...errors];
            newErrors[index][field] = false;
            setErrors(newErrors);
        }
    };

    // Fungsi Tambah/Kurang Kuantitas
    const handleQuantityChange = (type) => {
        if (type === "minus" && quantity > 1) {
            setQuantity(quantity - 1);
            setParticipants(participants.slice(0, quantity - 1));
            setErrors(errors.slice(0, quantity - 1)); // Potong error juga
        }
        if (type === "plus" && quantity < trip.remaining_quota) {
            setQuantity(quantity + 1);
            setParticipants([
                ...participants,
                { name: "", passport: "", phone: "", nik: "" }
            ]);
        }
    };

    // 3. Fungsi Bayar Midtrans Terintegrasi Validasi
    const handlePayment = async () => {
        // --- VALIDASI FORM INLINE & SCROLL ---
        let newErrors = [];
        let firstInvalidIndex = -1;

        participants.forEach((p, idx) => {
            let currentError = { name: false, phone: false };
            
            if (p.name.trim() === "") {
                currentError.name = true;
                if (firstInvalidIndex === -1) firstInvalidIndex = idx;
            }
            if (p.phone.trim() === "") {
                currentError.phone = true;
                if (firstInvalidIndex === -1) firstInvalidIndex = idx;
            }
            newErrors[idx] = currentError;
        });

        setErrors(newErrors);

        // Jika ada error, gulir layar ke form yang belum diisi
        if (firstInvalidIndex !== -1) {
            const element = document.getElementById(`participant-form-${firstInvalidIndex}`);
            if (element) {
                // Scroll agar elemen berada di tengah layar dengan animasi mulus
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return; // Hentikan proses pembayaran
        }

        // --- BUKA KEMBALI POPUP JIKA SUDAH ADA TOKEN ---
        if (snapToken) {
            openMidtransPopup(snapToken);
            return;
        }

        // --- PROSES MEMBUAT TRANSAKSI BARU ---
        setIsProcessing(true);
        try {
            const response = await axios.post(`/trip-bareng/${trip.id}/payment`, {
                quantity: quantity,
                participants: participants
            });

            setSnapToken(response.data.snap_token);
            openMidtransPopup(response.data.snap_token);

        } catch (error) {
            console.error("Gagal mendapatkan token", error);
            alert("Terjadi kesalahan sistem. Coba beberapa saat lagi.");
            setIsProcessing(false);
        }
    };

    const openMidtransPopup = (token) => {
        window.snap.pay(token, {
            onSuccess: function (result) {
                localStorage.removeItem(storageKey);
                router.visit(`/trip-bareng/${trip.id}/success`); 
            },
            onPending: function (result) {
                console.log("Menunggu pembayaran Anda!");
            },
            onError: function (result) {
                alert("Pembayaran gagal. Silakan coba lagi.");
                setIsProcessing(false);
            },
            onClose: function () {
                setIsProcessing(false);
            }
        });
    };

    // Calculations
    const subtotal = trip.price * quantity;
    const serviceFee = 5000 * quantity; 
    const insuranceFee = 5000 * quantity; 
    const total = subtotal + serviceFee + insuranceFee;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-6">
            <Head title="Checkout Trip - Barengin" />

            <Container>
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/trip-bareng/${trip.id}`}
                        className="inline-flex items-center text-2xl font-bold text-neutral-900 hover:text-primary-700 mb-2 gap-3 transition"
                    >
                        <FaChevronLeft className="text-xl" />
                        Checkout Trip
                    </Link>
                    <p className="text-neutral-500 ml-9">
                        Selesaikan pesanan Anda dengan aman dan cepat
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* LEFT COLUMN: Forms */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* 1. Trip Summary & Quantity Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                            <div className="flex gap-4 items-center pb-6 border-b border-neutral-100">
                                <img
                                    src={trip.image}
                                    alt={trip.title}
                                    className="w-20 h-20 rounded-xl object-cover border border-neutral-200"
                                    onError={(e) =>
                                        (e.target.src =
                                            "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2071&auto=format&fit=crop")
                                    }
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                                        {trip.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 font-medium">
                                        <FaUserFriends className="text-neutral-400" />
                                        {trip.joined_count} / {trip.capacity}{" "}
                                        orang telah bergabung
                                    </div>
                                    <p className="text-primary-700 font-bold">
                                        Rp {trip.price.toLocaleString("id-ID")} <span className="text-sm font-normal text-neutral-500">/orang</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6">
                                <div>
                                    <h4 className="font-bold text-neutral-900">
                                        Total partisipan
                                    </h4>
                                    <p className="text-sm text-neutral-500">
                                        Hanya tersisa {trip.remaining_quota}{" "}
                                        kuota lagi
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleQuantityChange("minus")}
                                        disabled={quantity <= 1 || isProcessing || snapToken}
                                        className="w-8 h-8 rounded-full border-2 border-primary-100 text-primary-700 flex items-center justify-center hover:bg-primary-50 disabled:opacity-30 transition"
                                    >
                                        <FaMinus className="text-xs" />
                                    </button>
                                    <span className="font-bold text-lg w-4 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange("plus")}
                                        disabled={quantity >= trip.remaining_quota || isProcessing || snapToken}
                                        className="w-8 h-8 rounded-full bg-primary-700 text-white flex items-center justify-center shadow-sm hover:bg-primary-800 disabled:opacity-50 transition"
                                    >
                                        <FaPlus className="text-xs" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 2. Participant Forms */}
                        {participants.map((p, idx) => (
                            <div
                                key={idx}
                                id={`participant-form-${idx}`} // ID DITAMBAHKAN DI SINI UNTUK TARGET SCROLL
                                className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 animate-fade-in ${
                                    (errors[idx]?.name || errors[idx]?.phone) 
                                        ? "border-red-400 ring-4 ring-red-50" 
                                        : "border-neutral-100"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-neutral-900">
                                        Info Partisipan {idx + 1}
                                    </h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${idx % 2 === 0 ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                                    >
                                        Person {idx + 1}
                                    </span>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <Input
                                            label="Nama Lengkap"
                                            placeholder="Masukkan nama lengkap anda sesuai ktp"
                                            value={p.name}
                                            onChange={(e) => handleParticipantChange(idx, "name", e.target.value)}
                                            disabled={snapToken !== null}
                                        />
                                        {/* PESAN ERROR NAMA */}
                                        {errors[idx]?.name && (
                                            <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                                                <IoMdInformationCircleOutline className="text-sm" /> Nama Lengkap wajib diisi.
                                            </p>
                                        )}
                                    </div>
                                    
                                    <Input
                                        label="No. Paspor (optional)"
                                        placeholder="Nomor paspor resmi anda"
                                        value={p.passport}
                                        onChange={(e) => handleParticipantChange(idx, "passport", e.target.value)}
                                        disabled={snapToken !== null}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <Input
                                                label="Nomor Telepon"
                                                placeholder="No Telpon"
                                                value={p.phone}
                                                onChange={(e) => handleParticipantChange(idx, "phone", e.target.value)}
                                                disabled={snapToken !== null}
                                                leftAddon={
                                                    <span className="text-neutral-700 font-medium">
                                                        +62
                                                    </span>
                                                }
                                            />
                                            {/* PESAN ERROR TELEPON */}
                                            {errors[idx]?.phone && (
                                                <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1">
                                                    <IoMdInformationCircleOutline className="text-sm" /> Nomor Telepon wajib diisi.
                                                </p>
                                            )}
                                        </div>

                                        <Input
                                            label="NIK (Optional)"
                                            placeholder="NIK"
                                            value={p.nik}
                                            onChange={(e) => handleParticipantChange(idx, "nik", e.target.value)}
                                            disabled={snapToken !== null}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <MdOutlineShoppingBag className="text-xl text-neutral-800" />
                                <h3 className="text-lg font-bold text-neutral-900">
                                    Detail Pembayaran
                                </h3>
                            </div>

                            <div className="space-y-4 text-sm text-neutral-600 border-b border-neutral-100 pb-6 mb-6">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal ({quantity} orang)</span>
                                    <span className="font-semibold text-neutral-900">
                                        Rp {subtotal.toLocaleString("id-ID")}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Biaya Layanan</span>
                                    <span className="font-semibold text-neutral-900">
                                        Rp {serviceFee.toLocaleString("id-ID")}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Biaya Asuransi Trip</span>
                                    <span className="font-semibold text-neutral-900">
                                        Rp {insuranceFee.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-neutral-900">
                                    Total Pembayaran
                                </span>
                                <span className="text-lg font-bold text-neutral-900">
                                    Rp {total.toLocaleString("id-ID")}
                                </span>
                            </div>
                            
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-3 mb-6">
                                <IoMdInformationCircleOutline className="text-orange-600 text-2xl shrink-0 mt-0.5" />
                                <p className="text-xs text-orange-800 leading-relaxed">
                                    Dengan menekan tombol 'Bayar Sekarang', Anda
                                    menyetujui Ketentuan Layanan dan Kebijakan
                                    Pembatalan kami untuk perjalanan grup. Pembayaran akan ditangani dengan aman oleh Midtrans.
                                </p>
                            </div>

                            <Button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                type="button"
                                size="md"
                                className="w-full font-bold flex justify-center py-3 rounded-lg disabled:opacity-70 disabled:cursor-not-allowed  text-white"
                            >
                                {isProcessing 
                                    ? "Memproses..." 
                                    : snapToken 
                                        ? "Buka Kembali Pembayaran Anda" 
                                        : "Bayar Sekarang"
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

Checkout.layout = (page) => <MainLayout children={page} />;