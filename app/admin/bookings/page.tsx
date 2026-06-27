"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

type Booking = {
  id: number;
  user_id: number | null;
  cat_id: number;
  room_class_id: number;
  tanggal_checkin: string;
  tanggal_checkout: string;
  logistik: string;
  metode_pembayaran: string;
  total_biaya: number;
  status_booking: string;
  bukti_pembayaran_url: string | null;
  created_at: string;
  user: {
    nama: string;
    no_telepon: string;
  } | null;
  cat: {
    nama_kucing: string;
    jenis_kucing: string;
  };
  room_class: {
    nama_kelas: string;
  };
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    setSavingId(id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status_booking: newStatus }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      
      setBookings(bookings.map(b => b.id === id ? { ...b, status_booking: newStatus } : b));
    } catch (err) {
      alert("Terjadi kesalahan");
    } finally {
      setSavingId(null);
    }
  };

  if (isLoading) return <div>Memuat data...</div>;

  return (
    <div className="max-w-[1200px] mx-auto pt-4">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2B2B2B] mb-2 tracking-tight">Kelola Booking Masuk</h1>
          <p className="text-gray-500 font-medium text-sm">Tinjau dan perbarui status reservasi pelanggan.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-[1.75rem] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">ID & Waktu</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Pelanggan</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Pesanan</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Pembayaran</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking.id} className={`group ${idx !== bookings.length - 1 ? "border-b border-gray-50/50" : ""}`}>
                  <td className="px-5 py-5 align-top">
                    <div className="font-bold text-[#2B2B2B] bg-white inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] mb-1.5 border border-gray-100 shadow-sm">
                      <span className="text-[#D95B18] font-black mr-1">#</span>
                      CTNP-{booking.id.toString().padStart(4, '0')}
                    </div>
                    <div className="text-[10px] font-medium text-gray-400 flex items-center gap-1 mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {new Date(booking.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </td>
                  <td className="px-5 py-5 align-top">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#F4F4F4] flex items-center justify-center font-bold text-gray-500 shrink-0 text-xs">
                        {(booking.user?.nama || "A")[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-[#2B2B2B] text-xs leading-tight">{booking.user?.nama || "Admin CATNIP"}</div>
                        <div className="text-[10px] font-medium text-gray-400 mt-0.5">{booking.user?.no_telepon || "6281234567890"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 align-top">
                    <div className="font-bold text-xs text-[#2B2B2B] mb-1">
                      {booking.room_class.nama_kelas.split(' (')[0]} <span className="text-[#D95B18]">({booking.room_class.nama_kelas.split(' (')[1] || ''}</span>
                    </div>
                    <div className="text-xs font-bold text-[#2B2B2B] mb-2">{booking.cat.nama_kucing} <span className="text-gray-400 font-normal">({booking.cat.jenis_kucing})</span></div>
                    <div className="text-[10px] font-bold text-gray-600 bg-white inline-flex items-center px-2.5 py-1 rounded-lg border border-gray-100 shadow-sm gap-1.5">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3 text-[#D95B18]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="leading-tight text-center">{new Date(booking.tanggal_checkin).getDate()}<br/>{new Date(booking.tanggal_checkin).toLocaleDateString('id-ID', {month: 'short'})}</span>
                      </div>
                      <span className="text-gray-300 mx-0.5">-</span>
                      <div className="flex items-center gap-1">
                        <span className="leading-tight text-center">{new Date(booking.tanggal_checkout).getDate()}<br/>{new Date(booking.tanggal_checkout).toLocaleDateString('id-ID', {month: 'short'})}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 align-top">
                    <div className="font-extrabold text-[#2B2B2B] text-sm mb-1.5">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(booking.total_biaya))}
                    </div>
                    <div className="text-[10px] font-black px-2 py-0.5 rounded-full inline-flex items-center bg-[#F0F7FF] text-[#3B82F6] uppercase tracking-widest">
                      {booking.metode_pembayaran}
                    </div>
                    {booking.metode_pembayaran === 'qris' && booking.bukti_pembayaran_url && (
                      <div className="text-[10px] text-[#D95B18] font-bold mt-1.5 hover:opacity-70 cursor-pointer flex items-center gap-1 transition-opacity">
                        Lihat Bukti
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-5 align-top">
                    <select 
                      className="form-input py-1.5 px-3 text-[10px] font-bold uppercase tracking-widest rounded-lg cursor-pointer bg-white border border-gray-200 text-[#2B2B2B] shadow-sm appearance-none pr-7 focus:ring-0 focus:border-[#D95B18] transition-colors"
                      value={booking.status_booking}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
                      disabled={savingId === booking.id}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='black'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '0.8em 0.8em' }}
                    >
                      <option value="menunggu_konfirmasi">MENUNGGU</option>
                      <option value="dikonfirmasi">DIKONFIRMASI</option>
                      <option value="selesai">SELESAI</option>
                      <option value="ditolak">DITOLAK</option>
                      <option value="dibatalkan">DIBATALKAN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
