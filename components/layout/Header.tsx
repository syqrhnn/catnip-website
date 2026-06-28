"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/",          label: "Beranda" },
  { href: "/katalog",   label: "Katalog" },
  { href: "/harga",     label: "Harga" },
  { href: "/tentang",   label: "Tentang Kami" },
  { href: "/kontak",    label: "Kontak" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          backgroundColor: isScrolled ? "rgba(255,253,208,0.92)" : "#FFFDD0",
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(51,51,51,0.08)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container-catnip">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>
            {/* Logo */}
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
            >
              {/* Cat icon SVG */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: "#CC5500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="CATNIP Logo">
                  {/* Cat face simplified icon */}
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
              <span
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "#CC5500",
                  letterSpacing: "-0.01em",
                }}
              >
                CATNIP
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex"
              style={{ alignItems: "center", gap: "1.5rem" }}
              aria-label="Navigasi utama"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-link"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      color: isActive ? "#CC5500" : "#333333",
                      textDecoration: "none",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.75rem" }}>
              {status === "loading" ? (
                <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              ) : session ? (
                <>
                  <Link href="/dashboard" className="text-sm font-semibold text-gray-700 hover:text-[#CC5500]">
                    Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-ghost btn-sm">
                    Keluar
                  </button>
                </>
              ) : (
                <Link href="/login" className="btn btn-ghost btn-sm">
                  Masuk
                </Link>
              )}
              <Link href="/booking" className="btn btn-primary btn-sm" id="header-booking-cta">
                Booking Sekarang
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "none",
                background: isMobileMenuOpen ? "rgba(204,85,0,0.1)" : "transparent",
                cursor: "pointer",
                gap: 5,
                transition: "background 0.2s ease",
                padding: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  backgroundColor: "#333333",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  backgroundColor: "#333333",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 22,
                  height: 2,
                  backgroundColor: "#333333",
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className="md:hidden"
          style={{
            maxHeight: isMobileMenuOpen ? "400px" : "0",
            overflow: "hidden",
            transition: "max-height 0.35s ease",
            backgroundColor: "#FFFDD0",
            borderTop: isMobileMenuOpen ? "1px solid rgba(51,51,51,0.08)" : "none",
          }}
        >
          <nav className="container-catnip" style={{ paddingTop: "1rem", paddingBottom: "1.25rem" }} aria-label="Navigasi mobile">
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "block",
                      padding: "0.65rem 1rem",
                      borderRadius: 10,
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.95rem",
                      color: isActive ? "#CC5500" : "#333333",
                      backgroundColor: isActive ? "rgba(204,85,0,0.08)" : "transparent",
                      textDecoration: "none",
                      transition: "background 0.2s ease",
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {status === "loading" ? (
                <div className="h-10 bg-gray-200 animate-pulse rounded-lg mt-2 mb-2"></div>
              ) : session ? (
                <>
                  <Link href="/dashboard" style={{
                    display: "block",
                    padding: "0.65rem 1rem",
                    borderRadius: 10,
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: "#333333",
                    textDecoration: "none",
                  }}>
                    Dashboard
                  </Link>
                  <button onClick={() => signOut({ callbackUrl: '/' })} style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.65rem 1rem",
                    borderRadius: 10,
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.95rem",
                    color: "#EF4444",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}>
                    Keluar
                  </button>
                </>
              ) : (
                <Link href="/login" style={{
                  display: "block",
                  padding: "0.65rem 1rem",
                  borderRadius: 10,
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "#333333",
                  textDecoration: "none",
                }}>
                  Masuk
                </Link>
              )}
              <div style={{ borderTop: "1px solid rgba(51,51,51,0.1)", marginTop: "0.5rem", paddingTop: "0.75rem" }}>
                <Link href="/booking" className="btn btn-primary w-full" style={{ textAlign: "center" }}>
                  Booking Sekarang
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
