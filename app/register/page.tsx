"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password minimal 8 karakter.");
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
    <Section background="cream" className="min-h-[85vh] flex items-center justify-center py-12">
      <Container className="max-w-md w-full">
        <div className="bg-white p-8 rounded-2xl shadow-soft">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#CC5500] mb-2">Daftar Akun</h1>
            <p className="text-gray-500 text-sm">Bergabung dengan CATNIP untuk kemudahan booking.</p>
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
              <label htmlFor="nama" className="form-label">Nama Lengkap</label>
              <input type="text" id="nama" className="form-input" required value={formData.nama} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-input" required value={formData.email} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="no_telepon" className="form-label">Nomor Telepon (Opsional)</label>
              <input type="tel" id="no_telepon" className="form-input" value={formData.no_telepon} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-input" required minLength={8} value={formData.password} onChange={handleChange} />
              <p className="text-xs text-gray-500 mt-1">Minimal 8 karakter.</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
              <input type="password" id="confirmPassword" className="form-input" required value={formData.confirmPassword} onChange={handleChange} />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" size="lg" fullWidth isLoading={loading}>
                Daftar Sekarang
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-[#CC5500] hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
