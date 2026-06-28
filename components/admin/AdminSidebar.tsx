"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function AdminSidebar({ userName }: { userName: string }) {
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/admin",
      label: "Overview",
      exact: true,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      href: "/admin/bookings",
      label: "Kelola Booking",
      exact: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      href: "/admin/rooms",
      label: "Kelola Kamar & Harga",
      exact: false,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] flex flex-col h-[calc(100vh-3rem)] ml-6 mt-6 overflow-hidden border border-gray-100">
      <div className="p-8 pb-4 relative z-10 flex items-center gap-3">
        <Link href="/" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#D95B18] shadow-sm shrink-0">
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
        </Link>
        <div className="flex flex-col">
          <span className="font-extrabold text-[1.4rem] tracking-tight text-[#2B2B2B] leading-none">CATNIP</span>
          <span className="text-[#D95B18] text-[0.65rem] font-bold tracking-[0.15em] mt-1">ADMINISTRATOR</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto mt-6 relative z-10">
        {navLinks.map((link) => {
          const isActive = link.exact ? pathname === link.href : pathname?.startsWith(link.href);
          return (
            <Link 
              key={link.href} 
              href={link.href} 
              className={`flex items-center gap-4 px-5 py-4 rounded-[1.25rem] font-bold transition-all duration-300 ${
                isActive 
                  ? "bg-[#FFF0E5] text-[#2B2B2B]" 
                  : "text-[#4A4A4A] hover:bg-gray-50"
              }`}
            >
              <div className={`transition-colors duration-300 ${isActive ? "text-[#D95B18]" : "text-gray-400"}`}>
                {link.icon}
              </div>
              <span className="tracking-wide text-sm">{link.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 mt-auto relative z-10 mb-4">
        <div className="bg-white rounded-[1.75rem] p-4 flex items-center justify-between border border-gray-100 shadow-sm gap-2 group hover:border-gray-200 transition-colors">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-[#F4F4F4] flex items-center justify-center text-gray-400 shrink-0">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <div className="text-[0.55rem] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Administrator</div>
              <div className="font-extrabold text-xs text-[#2B2B2B] truncate">{userName}</div>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            title="Keluar"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}
