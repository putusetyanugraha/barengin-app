export default function Footer() {
    return (
        <footer className="bg-white pt-16 mt-auto w-full flex flex-col">
            {/* Bagian Atas: Logo, Teks, dan Social Icons (Background Putih) */}
            <div className="container mx-auto px-6 flex flex-col items-center text-center pb-12">
                {/* Logo Barengin */}
                {/* <a href="/" className="text-3xl font-bold text-[#0077D3] italic tracking-tighter">
                    barengin
                </a> */}
                <img
                    src="/assets/barengin_logows.png"
                    className="h-20 w-auto"
                    alt="Barengin"
                />

                {/* Judul & Deskripsi */}
                <h2 className="text-2xl font-semibold mt-6 text-gray-900">
                    Eksplor bersama barengin
                </h2>
                <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">
                    Mudik dan traveling bukan lagi soal perjalanan sendirian.
                    Temukan teman searah, berbagi cerita, dan buat setiap
                    kilometer terasa lebih seru bareng-bareng!
                </p>

                {/* Social Media Icons */}
                <div className="flex gap-4 mt-8">
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-200 transition"
                    >
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-200 transition"
                    >
                        <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="YouTube"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-200 transition"
                    >
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 hover:bg-gray-200 transition"
                    >
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>

            {/* Bagian Bawah: Bar Biru (Background #0078CF) */}
            <div className="bg-[#0078CF] text-white py-5 px-6 md:px-12 w-full">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-base font-medium">
                    <a
                        href="/privacy-policy"
                        className="hover:text-blue-100 transition mb-2 md:mb-0"
                    >
                        Privacy and Policy
                    </a>
                    <span>@2025 Sevendeadlysins. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
