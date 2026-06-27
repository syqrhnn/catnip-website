"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

type Cat = {
  id: number;
  nama_kucing: string;
  jenis_kucing: string;
  riwayat_alergi: string | null;
  makanan_khusus: string | null;
};

export default function ProfilPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_telepon: "",
    preferensi_bahasa: "id",
    dark_mode: false,
  });

  const [cats, setCats] = useState<Cat[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user) {
      // Fetch fresh profile data and cats
      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/user/profile");
          if (res.ok) {
            const data = await res.json();
            setFormData({
              nama: data.nama,
              email: data.email,
              no_telepon: data.no_telepon || "",
              preferensi_bahasa: data.preferensi_bahasa,
              dark_mode: data.dark_mode,
            });
            setCats(data.cats || []);
          }
        } catch (error) {
          console.error("Gagal memuat profil", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ text: "Profil berhasil diperbarui!", type: "success" });
        // Update session client-side with new data
        await update({ name: formData.nama, no_telepon: formData.no_telepon });
      } else {
        setMessage({ text: data.message || "Gagal memperbarui profil.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Terjadi kesalahan pada server.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Section background="cream" className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-gray-500 animate-pulse font-bold text-xl">Memuat profil...</div>
      </Section>
    );
  }

  return (
    <Section background="cream" className="min-h-[85vh] py-12">
      <Container className="max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#333333]">Profil Saya</h1>
          <Button href="/dashboard" variant="outline" size="sm">Kembali ke Dashboard</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Kolom Kiri: Form Profil */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-100 pb-4">Informasi Akun & Pengaturan</h2>
              
              {message.text && (
                <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">Nama Lengkap</label>
                    <input type="text" name="nama" className="form-input" value={formData.nama} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="form-label">Nomor WhatsApp</label>
                    <input type="tel" name="no_telepon" className="form-input" value={formData.no_telepon} onChange={handleChange} required />
                  </div>
                </div>

                <div>
                  <label className="form-label">Email</label>
                  <input type="email" className="form-input bg-gray-50 text-gray-500" value={formData.email} disabled />
                  <p className="text-xs text-gray-400 mt-1">Email tidak dapat diubah karena terhubung ke akun Anda.</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-bold text-gray-700 mb-4">Pengaturan Aplikasi</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="form-label">Bahasa Tampilan</label>
                      <select name="preferensi_bahasa" className="form-input bg-white" value={formData.preferensi_bahasa} onChange={handleChange}>
                        <option value="id">Indonesia</option>
                        <option value="en">English (Coming Soon)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center pt-8">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input type="checkbox" name="dark_mode" className="sr-only" checked={formData.dark_mode} onChange={handleChange} />
                          <div className={`block w-10 h-6 rounded-full transition-colors ${formData.dark_mode ? 'bg-[#CC5500]' : 'bg-gray-300'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.dark_mode ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                        <div className="ml-3 text-sm font-medium text-gray-700">Gunakan Dark Mode</div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button type="submit" variant="primary" isLoading={isSaving}>Simpan Perubahan</Button>
                </div>
              </form>
            </div>
          </div>

          {/* Kolom Kanan: Daftar Kucing */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-soft">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <h2 className="text-lg font-bold">Daftar Anabul</h2>
                <span className="bg-[#FDF0E8] text-[#CC5500] text-xs font-bold px-2 py-1 rounded-full">{cats.length} Ekor</span>
              </div>
              
              {cats.length > 0 ? (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {cats.map((cat) => (
                    <div key={cat.id} className="p-3 border border-gray-100 rounded-xl hover:border-[#CC5500] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xl shrink-0">
                          {cat.jenis_kucing === 'ras' ? '👑' : '🐱'}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-800">{cat.nama_kucing}</h4>
                          <span className="text-xs text-gray-500 capitalize">{cat.jenis_kucing === 'ras' ? 'Kucing Ras' : 'Kucing Domestik'}</span>
                        </div>
                      </div>
                      {(cat.riwayat_alergi || cat.makanan_khusus) && (
                        <div className="mt-2 pt-2 border-t border-gray-50 text-xs text-gray-500 space-y-1">
                          {cat.riwayat_alergi && <div><span className="text-red-400 font-semibold">Alergi:</span> {cat.riwayat_alergi}</div>}
                          {cat.makanan_khusus && <div><span className="text-orange-400 font-semibold">Diet:</span> {cat.makanan_khusus}</div>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  Belum ada kucing yang terdaftar.<br/>Kucing Anda akan otomatis tercatat saat melakukan booking.
                </div>
              )}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
