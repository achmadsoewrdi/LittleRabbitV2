import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    // 1. STATE UNTUK MENU MOBILE
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTogle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50 md:px-8 md:py-1.5 ">
            {/* CONTAINER UTAMA NAVBAR (Brand, Toggle, dan Tombol Desktop) */}
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* KELOMPOK KIRI (Brand dan Toggle Button) */}
                {/* Menggunakan div ini untuk menampung Brand dan Hamburger/X Icon
                   agar bisa dikontrol bersamaan dengan tombol desktop */}
                <div className="flex items-center justify-between w-full md:w-auto">
                    {/* BRAND / LOGO */}
                    <Link to="/" className='font-display text-2xl font-bold text-amber-500' onClick={closeMenu}>
                        LittleRabbit
                    </Link>
                    
                    {/* TOMBOL TOGGLE (Hanya terlihat di mobile) */}
                    <button 
                        className='md:hidden p-2 text-gray-700 hover:text-gray-900 focus:outline-none' 
                        onClick={handleTogle}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* KELOMPOK KANAN: SIGN-IN / SIGN-UP (Hanya Tampil di Desktop) */}
                {/* POLA KUNCI: hidden md:flex */}
                <div className='hidden md:flex flex-row space-x-4 items-center'>
                    {/* Disarankan menggunakan <Link> daripada <button> jika tujuannya navigasi */}
                    <Link to="/signup"> 
                        <button className='px-4 py-2 border-2 font-medium font-display border-gray-500 text-gray-800 rounded-full hover:bg-gray-200 transition-colors'>
                            Sign-in
                        </button>
                    </Link>
                </div>
            </div>
            
            {/* 2. AREA LINK NAVIGASI MOBILE (Dengan Animasi) */}
            {/* Bagian ini masih akan menyertakan link Sign-up dan Sign-in di dalamnya, 
               agar tetap terlihat saat menu mobile dibuka. */}
            <div className={`
                transition-all duration-500 ease-in-out overflow-hidden
                md:flex md:items-center md:space-x-8 md:justify-end md:static
                ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                absolute w-full left-0 bg-white md:bg-transparent shadow-lg md:shadow-none p-0 md:p-0
            `}>
                <ul className="flex flex-col md:flex-row md:space-x-8 md:p-0 p-4">
                    {/* ... Link Home, Projects ... */}
                    <li>
                        <Link to="/" className="nav-link block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors" onClick={closeMenu}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/project-pages" className="nav-link block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors" onClick={closeMenu}>
                            Projects
                        </Link>
                    </li>

                    {/* Link Sign-up dan Sign-in untuk Mobile (WAJIB ADA di sini) */}
                    {/* Kita pastikan link ini HANYA muncul saat mobile dan menu terbuka */}
                    <li className="md:hidden">
                        <Link to="/team-activity-section" className="nav-link block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors" onClick={closeMenu}>
                            Sign-up
                        </Link>
                    </li>
                    <li className="md:hidden">
                        <Link to="/login" className="nav-link block py-2 md:py-0 text-gray-700 hover:text-blue-600 transition-colors" onClick={closeMenu}>
                            Sign-In
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;