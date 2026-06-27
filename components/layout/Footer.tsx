"use client";

import React from "react";
import Link from "next/link";

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
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="footer"
      aria-label="Footer CATNIP"
      style={{
        backgroundColor: "#333333",
        color: "#FFFDD0",
        paddingTop: "3.5rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container-catnip">
        {/* Top: Logo + Nav */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: "1 / -1", maxWidth: 320 }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: "#CC5500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-label="CATNIP">
                  <path d="M12 2C7 2 4 6 4 10c0 5 3 8 8 10 5-2 8-5 8-10 0-4-3-8-8-8z" fill="white" opacity="0.9"/>
                  <path d="M4 10L2 4l4 3M20 10l2-6-4 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="white"/>
                </svg>
              </div>
              <span
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  color: "#CC5500",
                }}
              >
                CATNIP
              </span>
            </Link>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "#FFFDD0CC",
                marginBottom: "1.25rem",
              }}
            >
              Pet Boarding &amp; Cat Hotel terpercaya untuk kucing kesayangan Anda.
              Penitipan nyaman, bersih, dan penuh kasih sayang dengan staff berpengalaman.
            </p>
            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.36 2 2 0 012.88 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
                </svg>
                <a
                  href="https://wa.me/6281234567890"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", color: "#FFFDD0CC", textDecoration: "none" }}
                >
                  +62 812-3456-7890
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", color: "#FFFDD0CC" }}>
                  Jl. Contoh No. 123, Kota, Indonesia
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CC5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.85rem", color: "#FFFDD0CC" }}>
                  Senin – Minggu: 08.00 – 20.00 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h3
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#FFFDD0",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Layanan
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerLinks.layanan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.875rem",
                      color: "#FFFDD0CC",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#CC5500")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFDD0CC")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div>
            <h3
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#FFFDD0",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Perusahaan
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerLinks.perusahaan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.875rem",
                      color: "#FFFDD0CC",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#CC5500")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFDD0CC")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun */}
          <div>
            <h3
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "#FFFDD0",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Akun
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footerLinks.akun.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.875rem",
                      color: "#FFFDD0CC",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#CC5500")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#FFFDD0CC")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(255,253,208,0.12)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Bottom: Copyright */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.8rem",
              color: "#FFFDD099",
              margin: 0,
            }}
          >
            © {currentYear} CATNIP Pet Boarding &amp; Cat Hotel. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.8rem",
              color: "#FFFDD099",
              margin: 0,
            }}
          >
            Dibuat dengan ❤️ untuk para pecinta kucing
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
