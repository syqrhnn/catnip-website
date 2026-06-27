"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type RoomClass = {
  id: number;
  nama_kelas: string;
  harga_ras: number;
  harga_domestik: number;
  status_ketersediaan: string;
};

export default function BookingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [roomClasses, setRoomClasses] = useState<RoomClass[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    namaPemilik: "",
    emailPemilik: "",
    noWhatsapp: "",
    namaKucing: "",
    jenisKucing: "domestik",
    riwayatAlergi: "",
    makananKhusus: "",
    roomClassId: "",
    tanggalCheckin: "",
    tanggalCheckout: "",
    logistik: "antar_sendiri",
    alamatJemput: "",
    metodePembayaran: "cash",
  });

  // Auto-fill from session
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        namaPemilik: session.user.name || prev.namaPemilik,
        emailPemilik: session.user.email || prev.emailPemilik,
        noWhatsapp: session.user.no_telepon || prev.noWhatsapp,
      }));
    }
  }, [session]);

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/room-classes");
        const data = await res.json();
        setRoomClasses(data);
      } catch (err) {
        console.error("Gagal memuat kelas kamar:", err);
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Kalkulasi Total Biaya
  const calculateTotal = () => {
    if (!formData.roomClassId || !formData.tanggalCheckin || !formData.tanggalCheckout) return 0;
    
    const checkin = new Date(formData.tanggalCheckin);
    const checkout = new Date(formData.tanggalCheckout);
    if (checkout <= checkin) return 0;

    const durasiHari = Math.ceil((checkout.getTime() - checkin.getTime()) / (1000 * 3600 * 24));
    
    const selectedRoom = roomClasses.find(r => r.id.toString() === formData.roomClassId);
    if (!selectedRoom) return 0;

    const hargaPerHari = formData.jenisKucing === "ras" ? selectedRoom.harga_ras : selectedRoom.harga_domestik;
    return durasiHari * hargaPerHari;
  };

  const nextStep = () => {
    setError("");
    // Validasi basic per step
    if (step === 1 && (!formData.namaPemilik || !formData.emailPemilik || !formData.noWhatsapp)) {
      setError("Harap lengkapi semua data pemilik.");
      return;
    }
    if (step === 2 && !formData.namaKucing) {
      setError("Harap masukkan nama kucing.");
      return;
    }
    if (step === 3) {
      if (!formData.roomClassId) {
        setError("Harap pilih kelas kamar.");
        return;
      }
      if (!formData.tanggalCheckin || !formData.tanggalCheckout) {
        setError("Harap isi tanggal check-in dan check-out.");
        return;
      }
      if (new Date(formData.tanggalCheckout) <= new Date(formData.tanggalCheckin)) {
        setError("Tanggal check-out harus setelah check-in.");
        return;
      }
    }
    
    setStep(step + 1);
  };

  const prevStep = () => {
    setError("");
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.logistik === "jemput" && !formData.alamatJemput) {
      setError("Harap masukkan alamat penjemputan.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: session?.user?.id || null
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal membuat booking.");

      router.push(`/booking/success/${data.bookingId}`);
    } catch (err: any) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const totalBiaya = calculateTotal();

  return (
    <Section background="white" className="min-h-screen py-12">
      <Container className="max-w-2xl">
        <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
          <h1 className="text-2xl font-bold text-[#CC5500] mb-2">Form Booking</h1>
          <p className="mb-6 text-sm" style={{ color: "#525252" }}>Lengkapi data di bawah ini untuk reservasi penitipan.</p>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  step >= num ? "bg-[#CC5500] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {num}
                </div>
                {num < 4 && (
                  <div className={`h-1 w-12 md:w-24 ${step > num ? "bg-[#CC5500]" : "bg-gray-100"}`}></div>
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={step === 4 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
            {/* STEP 1: DATA PEMILIK */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <h2 className="font-bold text-lg border-b pb-2">1. Data Pemilik</h2>
                <div>
                  <label className="form-label">Nama Lengkap</label>
                  <input type="text" name="namaPemilik" className="form-input" value={formData.namaPemilik} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input type="email" name="emailPemilik" className="form-input" value={formData.emailPemilik} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Nomor WhatsApp</label>
                  <input type="tel" name="noWhatsapp" className="form-input" value={formData.noWhatsapp} onChange={handleChange} required />
                </div>
              </div>
            )}

            {/* STEP 2: DATA KUCING */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <h2 className="font-bold text-lg border-b pb-2">2. Data Kucing</h2>
                <div>
                  <label className="form-label">Nama Kucing</label>
                  <input type="text" name="namaKucing" className="form-input" value={formData.namaKucing} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Jenis Kucing</label>
                  <select name="jenisKucing" className="form-input bg-white" value={formData.jenisKucing} onChange={handleChange}>
                    <option value="domestik">Kucing Domestik (Kampung/Lokal)</option>
                    <option value="ras">Kucing Ras (Anggora, Persia, BSH, dll)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Riwayat Alergi (Opsional)</label>
                  <input type="text" name="riwayatAlergi" className="form-input" value={formData.riwayatAlergi} onChange={handleChange} placeholder="Misal: Alergi ayam" />
                </div>
                <div>
                  <label className="form-label">Makanan Khusus (Opsional)</label>
                  <input type="text" name="makananKhusus" className="form-input" value={formData.makananKhusus} onChange={handleChange} placeholder="Misal: Bawa makanan sendiri (Royal Canin Urinary)" />
                </div>
              </div>
            )}

            {/* STEP 3: LAYANAN & JADWAL */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <h2 className="font-bold text-lg border-b pb-2">3. Layanan & Jadwal</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Tanggal Check-in</label>
                    <input type="date" name="tanggalCheckin" className="form-input" value={formData.tanggalCheckin} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <label className="form-label">Tanggal Check-out</label>
                    <input type="date" name="tanggalCheckout" className="form-input" value={formData.tanggalCheckout} onChange={handleChange} required min={formData.tanggalCheckin || new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <div>
                  <label className="form-label">Pilih Kelas Kamar</label>
                  {loadingRooms ? (
                    <p className="text-sm text-gray-500">Memuat kelas kamar...</p>
                  ) : (
                    <div className="space-y-3">
                      {roomClasses.map((rc) => {
                        const isFull = rc.status_ketersediaan === "penuh";
                        const price = formData.jenisKucing === "ras" ? rc.harga_ras : rc.harga_domestik;
                        const formattedPrice = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(price));
                        
                        return (
                          <label key={rc.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${formData.roomClassId === rc.id.toString() ? 'border-[#CC5500] bg-[#FDF0E8]' : 'border-gray-200 hover:bg-gray-50'} ${isFull ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            <input 
                              type="radio" 
                              name="roomClassId" 
                              value={rc.id} 
                              checked={formData.roomClassId === rc.id.toString()} 
                              onChange={handleChange} 
                              disabled={isFull}
                              className="mr-3"
                            />
                            <div className="flex-1">
                              <div className="font-bold">{rc.nama_kelas}</div>
                              <div className="text-sm text-gray-500">{formattedPrice} / hari</div>
                            </div>
                            {isFull && <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">PENUH</span>}
                            {rc.status_ketersediaan === "hampir_penuh" && <span className="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">HAMPIR PENUH</span>}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                {totalBiaya > 0 && (
                  <div className="bg-[#FFFDD0] p-4 rounded-xl mt-4 flex justify-between items-center">
                    <span className="font-bold">Estimasi Biaya:</span>
                    <span className="text-lg font-bold text-[#CC5500]">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(totalBiaya)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: LOGISTIK & PEMBAYARAN */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                <h2 className="font-bold text-lg border-b pb-2">4. Logistik & Pembayaran</h2>
                
                <div>
                  <label className="form-label">Metode Kedatangan</label>
                  <div className="flex gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="logistik" value="antar_sendiri" checked={formData.logistik === "antar_sendiri"} onChange={handleChange} className="mr-2" />
                      Antar Sendiri
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="radio" name="logistik" value="jemput" checked={formData.logistik === "jemput"} onChange={handleChange} className="mr-2" />
                      Jemput ke Rumah
                    </label>
                  </div>
                </div>

                {formData.logistik === "jemput" && (
                  <div>
                    <label className="form-label">Alamat Penjemputan</label>
                    <textarea name="alamatJemput" className="form-input resize-y" rows={3} value={formData.alamatJemput} onChange={handleChange} placeholder="Masukkan alamat lengkap" required></textarea>
                  </div>
                )}

                <div>
                  <label className="form-label">Metode Pembayaran</label>
                  <select name="metodePembayaran" className="form-input bg-white" value={formData.metodePembayaran} onChange={handleChange}>
                    <option value="cash">Cash (Bayar di Tempat)</option>
                    <option value="qris">QRIS (Transfer Sekarang)</option>
                  </select>
                </div>

                {formData.metodePembayaran === "qris" && (
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
                    <div className="w-48 h-48 bg-gray-200 mx-auto mb-4 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400">
                      <span className="text-gray-500 font-bold">[Placeholder QRIS]</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Silakan scan kode QR di atas untuk melakukan pembayaran sebesar <b>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(totalBiaya)}</b>.</p>
                    
                    <div className="text-left">
                      <label className="form-label">Upload Bukti Pembayaran (Opsional/MVP)</label>
                      <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FDF0E8] file:text-[#CC5500] hover:file:bg-[#F5D5C6] cursor-pointer" />
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 p-4 rounded-xl mt-4 flex justify-between items-center border border-gray-200">
                  <span className="font-bold text-gray-700">Total Tagihan Akhir:</span>
                  <span className="text-xl font-bold text-[#333333]">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(totalBiaya)}
                  </span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>Kembali</Button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <Button type="submit" variant="primary">Selanjutnya</Button>
              ) : (
                <Button type="submit" variant="primary" isLoading={isSubmitting}>Selesaikan Booking</Button>
              )}
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
