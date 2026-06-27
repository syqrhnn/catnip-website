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
                  <path d="M12 2C7 2 4 6 4 10c0 5 3 8 8 10 5-2 8-5 8-10 0-4-3-8-8-8z" fill="white" opacity="0.9"/>
                  <path d="M4 10L2 4l4 3M20 10l2-6-4 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="white"/>
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
              <a href="https://wa.me/6281234567890" className="flex items-center gap-3 text-sm text-gray-300 hover:text-[#CC5500] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.36 2 2 0 012.88 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
                </svg>
                +62 812-3456-7890
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Jl. Contoh No. 123, Kota, Indonesia
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Senin – Minggu: 08.00 – 20.00 WIB
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
          <p>Dibuat dengan ❤️ untuk para pecinta kucing</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
