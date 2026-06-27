"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_telepon: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    // Inline field-level validation
    const newFieldErrors: Record<string, string> = {};
    if (!formData.nama.trim()) newFieldErrors.nama = "Nama lengkap wajib diisi.";
    if (!formData.no_telepon.trim()) newFieldErrors.no_telepon = "Nomor telepon wajib diisi.";
    else if (!/^[0-9+\-\s]{8,15}$/.test(formData.no_telepon)) newFieldErrors.no_telepon = "Format nomor telepon tidak valid (contoh: 08123456789).";
    if (!formData.email.trim()) newFieldErrors.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newFieldErrors.email = "Format email tidak valid.";
    if (formData.password.length < 8) newFieldErrors.password = "Password minimal 8 karakter.";
    if (!formData.confirmPassword) newFieldErrors.confirmPassword = "Konfirmasi password wajib diisi.";
    else if (formData.password !== formData.confirmPassword) newFieldErrors.confirmPassword = "Konfirmasi password tidak cocok.";

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama: formData.nama,
          email: formData.email,
          no_telepon: formData.no_telepon,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal melakukan registrasi");
      }

      // Redirect to login
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 100%)" }}>
      <Container className="max-w-5xl">
        <div className="bg-white rounded-3xl shadow-soft-xl overflow-hidden flex flex-col md:flex-row-reverse border border-[#FDF0E8]">
          {/* Right Side: Decoration */}
          <div className="hidden md:flex md:w-1/2 bg-[#FDF0E8] items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#CC5500]/10 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
            <div className="relative w-full aspect-square z-10">
              <Image 
                src="/login-cat.png" 
                alt="CATNIP Register Decoration"
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>
          </div>

          {/* Left Side: Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#333333] mb-2">Daftar Akun</h1>
              <p className="text-[#525252] text-sm">Bergabung dengan CATNIP untuk kemudahan booking dan mengatur penitipan.</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm border border-red-100 flex items-start gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nama" className="form-label">Nama Lengkap <span className="text-red-500">*</span></label>
                <input type="text" id="nama" className={`form-input ${fieldErrors.nama ? 'error' : ''}`} required value={formData.nama} onChange={handleChange} />
                {fieldErrors.nama && <p className="form-error">⚠ {fieldErrors.nama}</p>}
              </div>

              <div>
                <label htmlFor="email" className="form-label">Email <span className="text-red-500">*</span></label>
                <input type="email" id="email" className={`form-input ${fieldErrors.email ? 'error' : ''}`} required value={formData.email} onChange={handleChange} />
                {fieldErrors.email && <p className="form-error">⚠ {fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="no_telepon" className="form-label">Nomor WhatsApp <span className="text-red-500">*</span></label>
                <input type="tel" id="no_telepon" className={`form-input ${fieldErrors.no_telepon ? 'error' : ''}`} required value={formData.no_telepon} onChange={handleChange} placeholder="08123456789" />
                {fieldErrors.no_telepon && <p className="form-error">⚠ {fieldErrors.no_telepon}</p>}
              </div>

              <div>
                <label htmlFor="password" className="form-label">Password <span className="text-red-500">*</span></label>
                <input type="password" id="password" className={`form-input ${fieldErrors.password ? 'error' : ''}`} required minLength={8} value={formData.password} onChange={handleChange} />
                <p className="text-xs mt-1" style={{ color: "#525252" }}>Minimal 8 karakter.</p>
                {fieldErrors.password && <p className="form-error">⚠ {fieldErrors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password <span className="text-red-500">*</span></label>
                <input type="password" id="confirmPassword" className={`form-input ${fieldErrors.confirmPassword ? 'error' : ''}`} required value={formData.confirmPassword} onChange={handleChange} />
                {fieldErrors.confirmPassword && <p className="form-error">⚠ {fieldErrors.confirmPassword}</p>}
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" fullWidth isLoading={loading}>
                  Daftar Sekarang
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-[#525252]">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-[#CC5500] hover:text-[#A84400] transition-colors">
                Masuk di sini
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
