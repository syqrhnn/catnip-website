"use client";

import React, { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (registered) {
      setSuccessMsg("Registrasi berhasil! Silakan masuk dengan akun Anda.");
    }
  }, [registered]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl,
      });

      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Terjadi kesalahan yang tidak terduga.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center md:text-left mb-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Selamat Datang Kembali</h1>
        <p className="text-[#525252] text-sm">Masuk ke akun CATNIP Anda untuk mengelola penitipan.</p>
      </div>

      {successMsg && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 text-sm border border-green-200 flex items-start gap-2">
          <span className="font-bold">✓</span>
          <span>{successMsg}</span>
        </div>
      )}

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
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" className="form-input" required value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" className="form-input" required value={formData.password} onChange={handleChange} />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={loading}>
            Masuk
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center md:text-left text-sm text-[#525252]">
        Belum punya akun?{" "}
        <Link href="/register" className="font-bold text-[#CC5500] hover:text-[#A84400] transition-colors">
          Daftar sekarang
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 100%)" }}>
      <Container className="max-w-5xl">
        <div className="bg-white rounded-3xl shadow-soft-xl overflow-hidden flex flex-col md:flex-row border border-[#FDF0E8]">
          {/* Left Side: Decoration */}
          <div className="hidden md:flex md:w-1/2 bg-[#FDF0E8] items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#CC5500]/10 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4"></div>
            <div className="relative w-full aspect-square z-10">
              <Image 
                src="/login-cat.png" 
                alt="CATNIP Login Decoration"
                fill
                className="object-contain mix-blend-multiply"
                priority
              />
            </div>
          </div>
          
          {/* Right Side: Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center">
            <Suspense fallback={<div className="text-center py-20 animate-pulse text-[#CC5500] font-bold">Memuat...</div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </div>
  );
}
