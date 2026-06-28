"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = {
  layanan: [
    { href: "/katalog", label: "Katalog Kamar" },
    { href: "/harga",   label: "Daftar Harga" },
    { href: "/booking", label: "Booking Online" },
    { href: "/faq",     label: "FAQ" },
  ],
  perusahaan: [
    { href: "/tentang", label: "Tentang Kami" },
    { href: "/kontak",  label: "Kontak" },
  ],
  akun: [
    { href: "/login",    label: "Masuk" },
    { href: "/register", label: "Daftar" },
    { href: "/dashboard", label: "Dashboard" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  // Hide footer on dashboard and admin pages for a cleaner app-like experience
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/profil") || pathname?.startsWith("/riwayat-booking")) {
    return null;
  }

  return (
    <footer className="bg-[#333333] text-[#FFFDD0] pt-16 pb-8 border-t-[8px] border-[#CC5500]">
      <div className="container-catnip">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-[#CC5500] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="CATNIP">
                  <path d="M4 11L2 3l7 4M20 11l2-8-7 4" fill="white" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 13C2 6.5 22 6.5 22 13C22 19.5 17 22.5 12 22.5C7 22.5 2 19.5 2 13Z" fill="white"/>
                  <ellipse cx="6" cy="15" rx="2" ry="1" fill="#FF94A2" opacity="0.8"/>
                  <ellipse cx="18" cy="15" rx="2" ry="1" fill="#FF94A2" opacity="0.8"/>
                  <circle cx="8" cy="13.5" r="2.2" fill="#CC5500"/>
                  <circle cx="16" cy="13.5" r="2.2" fill="#CC5500"/>
                  <circle cx="7.2" cy="12.5" r="0.7" fill="white"/>
                  <circle cx="15.2" cy="12.5" r="0.7" fill="white"/>
                  <path d="M10.5 16.5c.5.5 1 .7 1.5 0 .5.7 1 .5 1.5 0" stroke="#CC5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="12" cy="15.2" r="0.6" fill="#CC5500"/>
                </svg>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                CATNIP
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Pet Boarding & Cat Hotel terpercaya untuk kucing kesayangan Anda. Penitipan nyaman, bersih, dan penuh kasih sayang dengan pengawasan profesional.
            </p>
            
            <div className="space-y-3">
              <a href="https://wa.me/6280000000000" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#CC5500] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.36 2 2 0 012.88 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
                </svg>
                +62 8XX-XXXX-XXXX
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Jl. Dummy Address No. 00, Kota Fiktif, Indonesia
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Senin - Minggu: 08.00 - 20.00 WIB
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-5">Layanan</h3>
            <ul className="space-y-3">
              {footerLinks.layanan.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#CC5500] hover:translate-x-1 inline-block transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-5">Perusahaan</h3>
            <ul className="space-y-3">
              {footerLinks.perusahaan.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#CC5500] hover:translate-x-1 inline-block transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white uppercase tracking-wider text-sm mb-5">Akun</h3>
            <ul className="space-y-3">
              {footerLinks.akun.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#CC5500] hover:translate-x-1 inline-block transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/10 mb-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} CATNIP Pet Boarding & Cat Hotel. All rights reserved.</p>
          <p>Dibuat untuk tugas kuliah AI (Vibe Coding) oleh Kelompok CATNIP 🚀</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
