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
    <div>
      <h1 className="text-2xl font-bold text-[#333333] mb-6">Kelola Kamar & Harga</h1>
      
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Nama Kelas</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Harga (Domestik)</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Harga (Ras)</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200">Status</th>
              <th className="p-4 bg-gray-50 border-b border-gray-200 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, idx) => (
              <tr key={room.id} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-100 font-bold">{room.nama_kelas}</td>
                <td className="p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Rp</span>
                    <input 
                      type="number" 
                      className="form-input py-1 px-2 w-32" 
                      value={room.harga_domestik} 
                      onChange={(e) => handleUpdate(idx, 'harga_domestik', Number(e.target.value))}
                    />
                  </div>
                </td>
                <td className="p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Rp</span>
                    <input 
                      type="number" 
                      className="form-input py-1 px-2 w-32" 
                      value={room.harga_ras} 
                      onChange={(e) => handleUpdate(idx, 'harga_ras', Number(e.target.value))}
                    />
                  </div>
                </td>
                <td className="p-4 border-b border-gray-100">
                  <select 
                    className="form-input py-1 px-2 bg-white"
                    value={room.status_ketersediaan}
                    onChange={(e) => handleUpdate(idx, 'status_ketersediaan', e.target.value)}
                  >
                    <option value="tersedia">Tersedia</option>
                    <option value="hampir_penuh">Hampir Penuh</option>
                    <option value="penuh">Penuh</option>
                  </select>
                </td>
                <td className="p-4 border-b border-gray-100 text-right">
                  <Button size="sm" onClick={() => saveRoom(room)} isLoading={savingId === room.id}>
                    Simpan
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
