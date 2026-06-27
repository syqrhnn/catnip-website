import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | CATNIP",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#333333] text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-gray-200">
            CATNIP <span className="text-[#CC5500] text-sm align-top ml-1">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Overview
          </Link>
          <Link href="/admin/bookings" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Kelola Booking
          </Link>
          <Link href="/admin/rooms" className="block px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Kelola Kamar & Harga
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          <div>Login sebagai:</div>
          <div className="font-bold text-white truncate">{session.user.name}</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center bg-[#333333] text-white p-4 rounded-xl mb-6">
          <span className="font-bold">CATNIP ADMIN</span>
          <div className="flex gap-4 text-sm">
            <Link href="/admin/bookings">Booking</Link>
            <Link href="/admin/rooms">Kamar</Link>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
