"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

type RoomClass = {
  id: number;
  nama_kelas: string;
  harga_ras: number;
  harga_domestik: number;
  status_ketersediaan: string;
};

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<RoomClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/room-classes");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = (index: number, field: keyof RoomClass, value: string | number) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = { ...updatedRooms[index], [field]: value };
    setRooms(updatedRooms);
  };

  const saveRoom = async (room: RoomClass) => {
    setSavingId(room.id);
    try {
      const res = await fetch("/api/admin/rooms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: room.id,
          harga_ras: room.harga_ras,
          harga_domestik: room.harga_domestik,
          status_ketersediaan: room.status_ketersediaan,
        }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      alert("Berhasil diperbarui!");
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
          <h1 className="text-2xl font-bold text-[#2B2B2B] mb-2 tracking-tight">Kelola Kamar & Harga</h1>
          <p className="text-gray-500 font-medium text-sm">Sesuaikan ketersediaan dan harga per malam untuk setiap kelas.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-[1.75rem] p-5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Nama Kelas</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest text-center">Harga (Domestik)</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest text-center">Harga (Ras)</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-5 py-3 text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, idx) => (
                <tr key={room.id} className={`group ${idx !== rooms.length - 1 ? "border-b border-gray-50/50" : ""}`}>
                  <td className="px-5 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FFF0E5] flex items-center justify-center text-[#D95B18] font-black text-base shrink-0">
                        {idx + 1}
                      </div>
                      <div className="font-extrabold text-[#2B2B2B] text-[0.95rem] leading-tight">
                        {room.nama_kelas.split(' (')[0]} <br/> 
                        <span className="font-bold text-[#2B2B2B] text-xs opacity-90">({room.nama_kelas.split(' (')[1] || ''}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-6">
                    <div className="flex justify-center">
                      <div className="relative inline-flex items-center">
                        <span className="text-gray-400 font-black absolute left-3 text-[10px]">Rp</span>
                        <input 
                          type="number" 
                          className="form-input py-2.5 pl-8 pr-3 w-32 rounded-xl border-gray-200 focus:ring-0 focus:border-[#D95B18] font-black text-[#2B2B2B] bg-white transition-all shadow-sm text-[11px]" 
                          value={room.harga_domestik} 
                          onChange={(e) => handleUpdate(idx, 'harga_domestik', Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-6">
                    <div className="flex justify-center">
                      <div className="relative inline-flex items-center">
                        <span className="text-gray-400 font-black absolute left-3 text-[10px]">Rp</span>
                        <input 
                          type="number" 
                          className="form-input py-2.5 pl-8 pr-3 w-32 rounded-xl border-gray-200 focus:ring-0 focus:border-[#D95B18] font-black text-[#2B2B2B] bg-white transition-all shadow-sm text-[11px]" 
                          value={room.harga_ras} 
                          onChange={(e) => handleUpdate(idx, 'harga_ras', Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-6">
                    <select 
                      className="form-input py-2.5 pl-4 pr-10 text-[10px] font-bold uppercase tracking-widest rounded-xl cursor-pointer bg-white border border-gray-200 text-[#2B2B2B] shadow-sm appearance-none focus:ring-0 focus:border-[#D95B18] transition-colors"
                      value={room.status_ketersediaan}
                      onChange={(e) => handleUpdate(idx, 'status_ketersediaan', e.target.value)}
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='black'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '0.8em 0.8em' }}
                    >
                      <option value="tersedia">TERSEDIA</option>
                      <option value="hampir_penuh">HAMPIR PENUH</option>
                      <option value="penuh">PENUH</option>
                    </select>
                  </td>
                  <td className="px-5 py-6 text-right">
                    <Button size="sm" onClick={() => saveRoom(room)} isLoading={savingId === room.id} className="rounded-full bg-[#D95B18] text-white hover:bg-[#C25015] shadow-sm px-5 py-2 text-xs font-bold transition-transform hover:-translate-y-0.5 border-none">
                      Simpan
                    </Button>
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
