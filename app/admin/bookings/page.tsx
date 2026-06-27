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
    <div>
      <h1 className="text-2xl font-bold text-[#333333] mb-6">Kelola Booking Masuk</h1>
      
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr>
              <th className="p-4 bg-gray-50 border-b border-gray-200">ID & Waktu</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Pelanggan</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Pesanan</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Pembayaran</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Status</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 border-b border-gray-100">
                <td className="p-4 align-top">
                  <div className="font-bold text-gray-800">#CTNP-{booking.id.toString().padStart(4, '0')}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(booking.created_at).toLocaleDateString('id-ID')}</div>
                </td>
                <td className="p-4 align-top">
                  <div className="font-semibold">{booking.user?.nama || "Guest"}</div>
                  <div className="text-xs text-gray-500 mt-1">{booking.user?.no_telepon || "-"}</div>
                </td>
                <td className="p-4 align-top">
                  <div className="font-bold text-sm">{booking.room_class.nama_kelas}</div>
                  <div className="text-xs text-gray-600 my-1">{booking.cat.nama_kucing} ({booking.cat.jenis_kucing})</div>
                  <div className="text-xs text-gray-500">
                    {new Date(booking.tanggal_checkin).toLocaleDateString('id-ID')} - {new Date(booking.tanggal_checkout).toLocaleDateString('id-ID')}
                  </div>
                </td>
                <td className="p-4 align-top">
                  <div className="font-bold text-[#CC5500]">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(booking.total_biaya))}
                  </div>
                  <div className="text-xs font-bold mt-1 uppercase text-gray-500">{booking.metode_pembayaran}</div>
                  {booking.metode_pembayaran === 'qris' && booking.bukti_pembayaran_url && (
                    <div className="text-xs text-blue-500 mt-1 cursor-pointer">Lihat Bukti</div>
                  )}
                </td>
                <td className="p-4 align-top">
                  <select 
                    className={`form-input py-1 px-2 text-xs font-bold rounded-lg cursor-pointer ${
                      booking.status_booking === 'dikonfirmasi' ? 'bg-green-100 text-green-700 border-green-200' :
                      booking.status_booking === 'selesai' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      (booking.status_booking === 'ditolak' || booking.status_booking === 'dibatalkan') ? 'bg-red-100 text-red-700 border-red-200' :
                      'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }`}
                    value={booking.status_booking}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    disabled={savingId === booking.id}
                  >
                    <option value="menunggu_konfirmasi">Menunggu Konfirmasi</option>
                    <option value="dikonfirmasi">Dikonfirmasi</option>
                    <option value="selesai">Selesai</option>
                    <option value="ditolak">Ditolak</option>
                    <option value="dibatalkan">Dibatalkan</option>
                  </select>
                </td>
                <td className="p-4 text-right align-top">
                  <Button size="sm" variant="outline" as="a" href={`https://wa.me/${booking.user?.no_telepon}`} target="_blank">
                    Chat WA
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
