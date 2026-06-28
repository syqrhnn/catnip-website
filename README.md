# 🐱 CATNIP — Website Pet Boarding & Cat Hotel

Website layanan **Pet Boarding & Cat Hotel CATNIP**, dikembangkan sebagai proyek tugas kuliah **Artificial Intelligence** menggunakan pendekatan ***vibe coding*** dengan AI coding assistant **Antigravity** (Gemini & Claude) berdasarkan perencanaan dari **Claude AI**.

---

## 🧑‍🤝‍🧑 Identitas Project

| Item | Keterangan |
| --- | --- |
| Nama Kelompok | `[ISI: Nama Kelompok]` |
| Anggota & NIM | `[ISI: Nama Anggota - NIM]` |
| Mata Kuliah | Artificial Intelligence |
| Kelas | `[ISI: Kelas]` |
| Dosen Pengampu | `[ISI: Nama Dosen]` |

---

## 🚀 Status Pengembangan

| Tahap | Status |
| --- | --- |
| 1. Planning (PRD) | ✅ Selesai |
| 2. Build dengan Antigravity (6 tahap implementasi) | ✅ Selesai |
| 3. Review & Iterasi (bug fixing + redesign visual) | ✅ Selesai |
| 4. Dokumentasi | ✅ Selesai |

Seluruh 13 halaman pada PRD telah dibangun dan diverifikasi (`npm run build` lolos tanpa error). Riwayat bug dan perbaikan tercatat lengkap di tab **[Issues](../../issues?q=is%3Aissue+is%3Aclosed)** repository ini.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
| --- | --- |
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS |
| Backend | Next.js API Routes |
| Database | SQLite (Prisma ORM) |
| Autentikasi | NextAuth.js (Credentials Provider) |
| Integrasi | WhatsApp (floating button) |

> Stack ini dipilih sebagai alternatif yang lebih cepat dikembangkan dengan AI coding assistant dibanding stack literal pada ketentuan awal (Laravel + MySQL). Penjelasan lengkap & trade-off ada di `prd.md` Bagian 3.

---

## ⚙️ Cara Menjalankan Project (Setup Lokal)

### Prasyarat
- [Node.js](https://nodejs.org) versi 18 atau lebih baru
- Git

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/syqrhnn/catnip-website.git
   cd catnip-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Siapkan file environment variable**

   Buat file baru bernama `.env` di root folder (sejajar dengan `package.json`), isi dengan:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_SECRET="catnip-secret-key-change-in-production-2026"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_WA_NUMBER="6281234567890"
   ```

4. **Setup database & data awal**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

6. **Buka di browser**
   ```
   http://localhost:3000
   ```

### Akun untuk Testing

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@catnip.com` | `admin12345` |
| User | *(registrasi sendiri lewat halaman `/register`)* | — |

---

## 📂 Struktur Project

```
catnip-website/
├── app/                      # Halaman & API routes (Next.js App Router)
│   ├── (halaman publik)      # Beranda, Tentang, Katalog, Harga, Kontak, FAQ
│   ├── booking/               # Form booking multi-step
│   ├── dashboard/             # Dashboard pengguna
│   ├── profil/                 # Profil pengguna
│   ├── riwayat-booking/      # Riwayat booking
│   ├── admin/                  # Dashboard admin
│   ├── login/ register/       # Autentikasi
│   └── api/                   # API routes (booking, auth, admin, dll.)
├── components/                # Komponen reusable (UI, layout, providers)
├── lib/                        # Helper (auth, prisma client)
├── prisma/                     # Schema, migration, seed data
├── prd.md                      # Product Requirements Document (acuan utama)
├── prompts.md                  # Daftar prompt yang digunakan di Antigravity
├── github-issues-draft.md      # Draft dokumentasi bug & enhancement (Issues)
├── alur-vibe-coding.md         # Penjelasan proses pengembangan tahap demi tahap
└── README.md                   # File ini
```

---

## 📋 Dokumentasi Lengkap

| Dokumen | Isi |
| --- | --- |
| [`prd.md`](./prd.md) | Spesifikasi lengkap: desain, fitur, user flow, data model |
| [`prompts.md`](./prompts.md) | 6 prompt besar yang digunakan untuk membangun website di Antigravity |
| [`alur-vibe-coding.md`](./alur-vibe-coding.md) | Narasi proses pengembangan dari Planning hingga Dokumentasi |
| [`github-issues-draft.md`](./github-issues-draft.md) | Rincian bug & perbaikan yang ditemukan saat Review & Iterasi |
| Tab **[Issues](../../issues?q=is%3Aissue+is%3Aclosed)** | Bukti tercatat sistem dari seluruh bug yang ditemukan dan diperbaiki |
| Tab **[Commits](../../commits/main)** | Riwayat perkembangan project dari awal hingga akhir |

---

## 🐛 Bug & Perbaikan yang Ditemukan

Sepanjang proses Review & Iterasi, ditemukan dan diperbaiki **8 isu** (4 bug fungsional, 4 enhancement visual), seluruhnya tercatat dan ditutup di tab **Issues** repository ini. Ringkasannya:

- Bug validasi tipe data pada sistem booking
- Bug navigasi (header & bottom nav tampil bersamaan)
- Keterbacaan card pada halaman Katalog
- Tombol Keluar yang terlewat di Dashboard
- Inkonsistensi navigasi pada halaman Riwayat Booking
- Redesign visual Hero Section dan perbaikan tampilan menyeluruh

Detail lengkap setiap isu (deskripsi, root cause, perbaikan) dapat dilihat di tab Issues atau file `github-issues-draft.md`.