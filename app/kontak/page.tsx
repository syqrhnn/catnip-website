"use client";

import React, { useState } from "react";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    email: "",
    subjek: "pertanyaan",
    pesan: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nama.trim())
      newErrors.nama = "Nama lengkap wajib diisi.";
    if (!formData.telepon.trim())
      newErrors.telepon = "Nomor telepon wajib diisi.";
    else if (!/^[0-9+\-\s]{8,15}$/.test(formData.telepon))
      newErrors.telepon = "Format nomor telepon tidak valid (contoh: 08123456789).";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Format email tidak valid.";
    if (!formData.pesan.trim())
      newErrors.pesan = "Pesan tidak boleh kosong.";
    else if (formData.pesan.trim().length < 10)
      newErrors.pesan = "Pesan terlalu singkat (minimal 10 karakter).";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    // Clear error on change
    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate send — MVP placeholder (no backend endpoint needed per PRD)
    await new Promise((res) => setTimeout(res, 1000));
    setIsSubmitting(false);
    setSuccessMsg("Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.");
    setFormData({ nama: "", telepon: "", email: "", subjek: "pertanyaan", pesan: "" });
    setErrors({});
  };

  return (
    <div>
      {/* Header — warm gradient */}
      <section className="relative overflow-hidden pt-20 pb-28" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 60%)" }}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#CC5500] opacity-5 rounded-full blur-3xl"></div>
        <Container className="text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#333333] text-[#FFF5E6] text-xs font-bold tracking-wider mb-5">HUBUNGI KAMI</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4">Pusat <span className="text-[#CC5500]">Bantuan</span></h1>
          <p className="text-[#525252] max-w-2xl mx-auto text-lg">
            Punya pertanyaan seputar fasilitas atau ingin berkonsultasi tentang kondisi kucing Anda? Tim kami siap membantu.
          </p>
        </Container>
      </section>

      <section className="relative z-10 -mt-16 px-4 md:px-0 mb-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Info Kontak */}
            <div className="w-full lg:w-1/3">
              <div className="bg-gradient-to-b from-white to-[#FDF0E8] p-8 rounded-3xl shadow-soft-xl border border-gray-100 h-full">
                <h2 className="text-2xl font-bold mb-8 text-[#333333]">Informasi Kontak</h2>
                
                <div className="space-y-8">
                  {[
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                      ),
                      title: "Alamat",
                      text: "Jl. Contoh No. 123, Kel. Suka Kucing, Kec. Meow, Kota Fiktif, Indonesia 12345",
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.36 2 2 0 012.88 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
                        </svg>
                      ),
                      title: "Telepon / WhatsApp",
                      text: "+62 812-3456-7890",
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                      ),
                      title: "Email",
                      text: "halo@catnip.com",
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                      ),
                      title: "Jam Operasional",
                      text: "Senin – Minggu: 08.00 – 20.00 WIB",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group items-start">
                      <div className="w-12 h-12 bg-white text-[#CC5500] rounded-2xl shadow-sm flex shrink-0 items-center justify-center transition-all duration-300 group-hover:bg-[#CC5500] group-hover:text-white group-hover:-translate-y-1">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#333333] text-lg">{item.title}</h3>
                        <p className="text-sm mt-1 leading-relaxed text-[#525252]">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Pesan */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft-xl border border-gray-100 h-full">
                <h2 className="text-3xl font-bold mb-2 text-[#333333]">Kirim Pesan</h2>
                <p className="text-sm mb-6" style={{ color: "#525252" }}>
                  Isi form di bawah ini dan tim kami akan segera membalas pesan Anda.
                </p>

                {successMsg && (
                  <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl mb-6 text-sm font-medium flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="nama" className="form-label">Nama Lengkap <span className="text-red-500">*</span></label>
                      <input type="text" id="nama" className={`form-input ${errors.nama ? "error" : ""}`} value={formData.nama} onChange={handleChange} />
                      {errors.nama && <p className="form-error">⚠ {errors.nama}</p>}
                    </div>
                    <div>
                      <label htmlFor="telepon" className="form-label">Nomor Telepon <span className="text-red-500">*</span></label>
                      <input type="tel" id="telepon" className={`form-input ${errors.telepon ? "error" : ""}`} placeholder="08123456789" value={formData.telepon} onChange={handleChange} />
                      {errors.telepon && <p className="form-error">⚠ {errors.telepon}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Email <span className="text-xs font-normal" style={{ color: "#525252" }}>(Opsional)</span></label>
                    <input type="email" id="email" className={`form-input ${errors.email ? "error" : ""}`} placeholder="email@contoh.com" value={formData.email} onChange={handleChange} />
                    {errors.email && <p className="form-error">⚠ {errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subjek" className="form-label">Subjek <span className="text-red-500">*</span></label>
                    <select id="subjek" className="form-input bg-white" value={formData.subjek} onChange={handleChange}>
                      <option value="pertanyaan">Pertanyaan Umum</option>
                      <option value="booking">Informasi Booking</option>
                      <option value="kerjasama">Kerjasama</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pesan" className="form-label">Pesan <span className="text-red-500">*</span></label>
                    <textarea id="pesan" rows={5} className={`form-input resize-y ${errors.pesan ? "error" : ""}`} placeholder="Tulis pesan Anda di sini..." value={formData.pesan} onChange={handleChange}></textarea>
                    {errors.pesan && <p className="form-error">⚠ {errors.pesan}</p>}
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isSubmitting} className="shadow-primary">
                      Kirim Pesan Sekarang
                    </Button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
