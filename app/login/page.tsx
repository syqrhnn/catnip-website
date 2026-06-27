"use client";

import React, { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
    <div className="bg-white p-8 rounded-2xl shadow-soft">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#CC5500] mb-2">Masuk</h1>
        <p className="text-gray-500 text-sm">Masuk ke akun CATNIP Anda.</p>
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

      <div className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link href="/register" className="font-bold text-[#CC5500] hover:underline">
          Daftar sekarang
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Section background="cream" className="min-h-[80vh] flex items-center justify-center py-12">
      <Container className="max-w-md w-full">
        <Suspense fallback={<div className="bg-white p-8 rounded-2xl shadow-soft text-center py-20">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </Container>
    </Section>
  );
}
