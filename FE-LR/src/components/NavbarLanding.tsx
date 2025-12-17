import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Logika Ganti Tombol & Border (Threshold 50px)
      setIsScrolled(currentScrollY > 50);

      // 2. Logika Sembunyi/Muncul saat Scroll
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Sedang scroll ke bawah: Sembunyikan
        setIsVisible(false);
      } else {
        // Sedang scroll ke atas: Munculkan
        setIsVisible(true);
      }

      // 3. Logika "Auto-Reveal" (Muncul setelah diam 3 detik)
      // Hapus timer sebelumnya setiap kali ada gerakan scroll baru
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Set timer baru: Jika diam selama 3000ms, munculkan navbar
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out bg-white ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled ? "border-b border-gray-200" : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-amber-400 tracking-tighter"
        >
          LittleRabbit
        </Link>

        {/* CONTAINER TOMBOL */}
        <div className="relative flex items-center justify-end min-w-30 h-10">
          {/* TOMBOL SIGN IN */}
          <div
            className={`transition-all duration-300 absolute right-0 ${
              isScrolled
                ? "opacity-0 invisible scale-90 translate-x-4"
                : "opacity-100 visible scale-100 translate-x-0"
            }`}
          >
            <Link to="/signin">
              <button className="px-5 py-2 text-sm font-bold text-gray-500 border-2 border-gray-300 hover:bg-gray-100 rounded-full transition-all">
                Sign in
              </button>
            </Link>
          </div>

          {/* TOMBOL GET STARTED */}
          <div
            className={`transition-all duration-300 absolute right-0 ${
              isScrolled
                ? "opacity-100 visible scale-100 translate-x-0"
                : "opacity-0 invisible scale-90 translate-x-4"
            }`}
          >
            <Link to="/signup">
              <button className="px-6 py-2 bg-amber-400 hover:bg-amber-500 text-white text-sm font-bold rounded-full whitespace-nowrap transition-all">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
