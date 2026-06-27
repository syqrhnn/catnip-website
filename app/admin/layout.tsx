import React from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
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
    <div className="flex min-h-screen bg-[#F9F9F9] font-sans text-gray-800">
      {/* Sidebar Wrapper */}
      <div className="hidden md:block z-20 sticky top-0 h-screen">
        <AdminSidebar userName={session.user.name || "Admin"} />
      </div>

      {/* Main Content */}
      <main className="flex-1 px-8 py-10 z-10 w-full min-h-screen overflow-x-hidden">
        {/* Mobile Header (Glassmorphic) */}
        <div className="md:hidden flex justify-between items-center bg-white/80 backdrop-blur-xl border border-white/50 shadow-sm text-gray-800 p-5 rounded-[1.5rem] mb-8">
          <span className="font-extrabold tracking-tight text-xl">CATNIP <span className="text-[#CC5500] text-sm">ADMIN</span></span>
          <div className="flex gap-4 text-sm font-semibold">
            <Link href="/admin/bookings" className="hover:text-[#CC5500]">Booking</Link>
            <Link href="/admin/rooms" className="hover:text-[#CC5500]">Kamar</Link>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          {children}
        </div>
      </main>
    </div>
  );
}
