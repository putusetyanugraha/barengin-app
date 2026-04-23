export default function NavbarGuest() {
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
            {/* Tambahkan flex, justify-between, dan items-center untuk meratakan 3 kolom */}
            <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* 1. Logo (Kiri) */}
                <div className="flex-shrink-0 flex items-center">
                    <img
                        src="/assets/barengin_logows.png"
                        className="h-18 w-auto"
                        alt="Barengin"
                    />
                </div>

                {/* 2. Menu Navigasi (Tengah) - Disembunyikan di layar kecil (mobile) */}
                <nav className="hidden md:flex space-x-10 items-center">
                    <a
                        href=""
                        className="text-gray-900 font-medium hover:text-[#0077D3] transition"
                    >
                        Beranda
                    </a>
                    <button className="text-gray-900 font-medium hover:text-[#0077D3] transition flex items-center gap-1.5 focus:outline-none">
                        Jalan Bareng
                        {/* Ikon Chevron Down */}
                        <svg
                            className="w-4 h-4 text-gray-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            ></path>
                        </svg>
                    </button>
                    <a
                        href="#"
                        className="text-gray-900 font-medium hover:text-[#0077D3] transition"
                    >
                        Jastip
                    </a>
                    <a
                        href="#"
                        className="text-gray-900 font-medium hover:text-[#0077D3] transition"
                    >
                        Forum
                    </a>
                </nav>

                {/* 3. Tombol Aksi (Kanan) */}
                <div className="hidden md:flex items-center space-x-6">
                    <a
                        href="/login"
                        className="text-gray-900 font-medium hover:text-[#0077D3] transition"
                    >
                        Masuk
                    </a>
                    <a
                        href="/register"
                        className="bg-[#0077D3] text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition"
                    >
                        Daftar
                    </a>
                </div>

                {/* (Opsional) Tombol Hamburger Menu untuk Mobile nantinya */}
                <div className="md:hidden flex items-center">
                    <button className="text-gray-600 focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
