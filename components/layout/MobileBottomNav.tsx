"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Beranda",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
    activeIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22" fill="white"/>
      </svg>
    ),
  },
  {
    href: "/katalog",
    label: "Katalog",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    activeIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: "/booking",
    label: "Booking",
    icon: (
      // Center "Booking" button — special design
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3" fill="none" stroke="white" strokeWidth="2"/>
        <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="2"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/>
        <line x1="12" y1="13" x2="12" y2="18" stroke="white" strokeWidth="2"/>
        <line x1="9.5" y1="15.5" x2="14.5" y2="15.5" stroke="white" strokeWidth="2"/>
      </svg>
    ),
    activeIcon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3" fill="none" stroke="white" strokeWidth="2"/>
        <line x1="3" y1="9" x2="21" y2="9" stroke="white" strokeWidth="2"/>
        <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2"/>
        <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2"/>
        <line x1="12" y1="13" x2="12" y2="18" stroke="white" strokeWidth="2"/>
        <line x1="9.5" y1="15.5" x2="14.5" y2="15.5" stroke="white" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    href: "/harga",
    label: "Harga",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    activeIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    href: "/profil",
    label: "Profil",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    activeIcon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden"
      aria-label="Navigasi bawah mobile"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(51,51,51,0.08)",
        display: "flex",
        alignItems: "center",
        height: "68px",
        padding: "0 0.25rem",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname?.startsWith(item.href);
        const isBooking = item.href === "/booking";

        if (isBooking) {
          return (
            <Link
              key={item.href}
              href={item.href}
              id="mobile-nav-booking"
              aria-label="Booking Sekarang"
              style={{
                flex: "0 0 auto",
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: "#CC5500",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(204,85,0,0.4)",
                margin: "0 auto",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {item.icon}
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            id={`mobile-nav-${item.href.replace("/", "") || "home"}`}
            aria-current={isActive ? "page" : undefined}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              height: "100%",
              color: isActive ? "#CC5500" : "#888888",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
          >
            {isActive ? item.activeIcon : item.icon}
            <span
              style={{
                fontSize: "0.625rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1,
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default MobileBottomNav;
