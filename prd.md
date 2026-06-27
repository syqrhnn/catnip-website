# Product Requirements Document (PRD)
# CATNIP — Pet Boarding & Cat Hotel Website

---

## 0. Metadata Project

| Item | Keterangan |
| --- | --- |
| Nama Project | CATNIP — Website Pet Boarding & Cat Hotel |
| Mata Kuliah | Artificial Intelligence |
| Nama Kelompok | `[ISI: Nama Kelompok]` |
| Anggota & NIM | `[ISI: Nama Anggota 1 - NIM]` `[ISI: Nama Anggota 2 - NIM]` `[ISI: dst.]` |
| Kelas | `[ISI: Kelas]` |
| Dosen Pengampu | `[ISI: Nama Dosen]` |
| Versi Dokumen | 1.0 |
| Tanggal | 26 Juni 2026 |
| Dokumen Acuan | `Ketentuan_Website_CATNIP.txt` |
| Tujuan Dokumen | Menjadi konteks pengembangan bagi AI coding assistant (Antigravity) dalam membangun website CATNIP dari awal hingga MVP siap demo |

> **Catatan untuk AI coding assistant:** Dokumen ini adalah satu-satunya sumber kebenaran (source of truth) untuk scope, desain, dan struktur data proyek. Jika ada instruksi pengembangan yang bertentangan dengan dokumen ini, prioritaskan dokumen ini kecuali ada instruksi eksplisit baru dari pengguna.

---

## 1. Overview Project

### 1.1 Latar Belakang

CATNIP adalah bisnis **Pet Boarding & Cat Hotel** yang membutuhkan website untuk memperkenalkan layanan, menampilkan kelas-kelas penitipan kucing, serta menyediakan sistem reservasi (booking) online agar calon pelanggan tidak perlu datang langsung atau menghubungi admin secara manual untuk mengecek ketersediaan kamar.

### 1.2 Tujuan Project

1. Menyediakan **company profile digital** yang modern dan profesional untuk CATNIP.
2. Menyediakan **katalog kelas penitipan** beserta fasilitas dan harga yang transparan.
3. Menyediakan **sistem booking online** yang memungkinkan pengguna memesan kamar tanpa kontak manual.
4. Menyediakan **dashboard admin** sederhana untuk mengelola harga, ketersediaan kamar, dan data booking.
5. Memberikan **kemudahan komunikasi** antara calon pelanggan dan admin melalui integrasi WhatsApp.

### 1.3 Target Pengguna

| Tipe Pengguna | Deskripsi | Kebutuhan Utama |
| --- | --- | --- |
| **Calon Pelanggan (Guest)** | Pemilik kucing yang baru mencari info layanan | Info layanan, harga, dan fasilitas yang jelas |
| **Pelanggan Terdaftar (User)** | Pemilik kucing yang sudah/akan booking | Booking mudah, riwayat booking, status real-time |
| **Admin/Staff CATNIP** | Pengelola operasional cat hotel | Kelola harga, kelola ketersediaan kamar, kelola booking masuk |

### 1.4 Value Proposition

- **Transparansi harga & fasilitas** — pengguna dapat membandingkan kelas kamar secara langsung melalui tabel perbandingan.
- **Booking tanpa ribet** — proses reservasi online lengkap dengan data kucing dan preferensi logistik (antar sendiri/jemput).
- **Kepercayaan melalui transparansi status** — status ketersediaan kamar real-time (Tersedia/Hampir Penuh/Penuh) mengurangi risiko penolakan booking.
- **Komunikasi instan** — tombol Floating WhatsApp di semua halaman memudahkan konsultasi cepat.
- **Pengelolaan mudah bagi admin** — harga dan ketersediaan dapat diubah dari dashboard tanpa menyentuh kode program.

---

## 2. Design Guidelines

### 2.1 Branding & Logo

- Ilustrasi maskot/logo menggunakan **kucing Calico** (kombinasi warna oranye, hitam, putih).
- Gaya ilustrasi: **minimalist line-art** atau **flat vector** (hindari gaya realistis/photo-based untuk logo).
- Wordmark **"CATNIP"** menggunakan font **rounded sans-serif** yang ramah dan mudah dibaca (contoh kategori font: Poppins, Quicksand, Baloo 2, Nunito).

### 2.2 Palet Warna

| Elemen | Nama Warna | Hex Code | Penggunaan |
| --- | --- | --- | --- |
| Primary | Burnt Orange | `#CC5500` | Tombol CTA, highlight, ikon utama |
| Secondary | Charcoal | `#333333` | Teks utama, navigasi, footer |
| Background | Cream / Off White | `#FFFDD0` | Background utama section |
| Accent | Soft Pink / White | `#F8D7DA` / `#FFFFFF` | Background card, badge, elemen pendukung |

> **Aturan kontras:** Kombinasi warna di atas terhadap teks harus memenuhi rasio kontras minimal **WCAG AA (4.5:1)** untuk teks normal. AI assistant agar melakukan pengecekan kontras saat memilih kombinasi teks-di-atas-background.

### 2.3 Karakteristik UI/UX

Website harus konsisten menerapkan:

- **Clean layout** dengan banyak whitespace.
- **Rounded corner** pada card, tombol, dan input field (radius disarankan 8–16px).
- **Shadow lembut** (soft shadow, hindari shadow tajam/hard-edge).
- **Animasi ringan** (micro-interaction, hover state, fade/slide transition) — tidak berlebihan agar tetap profesional dan loading tetap cepat.
- **Konsistensi visual** di seluruh halaman (spacing, tipografi, warna tombol).
- Desain harus **friendly dan mudah digunakan oleh semua usia** — hindari elemen UI yang terlalu kompleks atau memerlukan banyak klik.

### 2.4 Pendekatan Responsive (Mobile First)

Pendekatan wajib: **Mobile First** — desain dan develop dimulai dari mobile, lalu di-scale up ke tablet dan desktop.

| Breakpoint | Layout |
| --- | --- |
| **Mobile** (< 768px) | Single column, card layout, bottom navigation, sticky CTA "Booking Sekarang" selalu terlihat |
| **Tablet** (768px – 1024px) | Grid 2 kolom, sidebar opsional untuk navigasi tambahan |
| **Desktop** (> 1024px) | Header navigation horizontal, grid layout multi-kolom, hero section full width, galeri foto berukuran lebih besar |

Website harus diuji dan berjalan baik pada kategori device: **Smartphone, Tablet, Laptop, Desktop**.

---

## 3. Tech Stack

### 3.1 Stack Sesuai Ketentuan Asli (Baseline/Referensi)

| Layer | Teknologi |
| --- | --- |
| Frontend | HTML5, CSS3, JavaScript, Tailwind CSS |
| Layout | CSS Grid & Flexbox |
| Backend | Laravel (PHP) |
| Database | MySQL |
| Autentikasi | Laravel Authentication (built-in) |
| Pembayaran | QRIS & Cash (manual/semi-manual) |
| Chat | Integrasi WhatsApp (floating button, `wa.me` link) |
| Deployment | Hosting yang mendukung PHP & MySQL |

### 3.2 Rekomendasi Stack untuk Tugas Kuliah (Lebih Simpel & Cepat Dibangun)

Karena konteks proyek adalah **tugas kuliah** dengan keterbatasan waktu, mengingat hanya butuh dibangun untuk keperluan MVP/demo, direkomendasikan stack berikut yang lebih ringan dan cepat dikembangkan terutama dengan bantuan AI coding assistant:

| Layer | Rekomendasi | Alasan |
| --- | --- | --- |
| Frontend | **Next.js (React) + Tailwind CSS** | Satu bahasa (JavaScript/TypeScript) untuk frontend & backend, component-based, mudah di-generate AI assistant |
| Backend | **Next.js API Routes** (full-stack dalam satu project) | Tidak perlu setup server PHP terpisah, deployment jauh lebih simpel |
| Database | **SQLite** (development) atau **PostgreSQL** (jika butuh hosting cloud gratis, misal Supabase/Neon) | Setup minimal, tidak perlu instalasi server database lokal yang rumit |
| ORM | **Prisma** | Migration dan schema management lebih mudah dibaca AI assistant dibanding raw SQL |
| Autentikasi | **NextAuth.js / Auth.js** (credentials provider: email + password) | Siap pakai, tidak perlu membangun sistem auth dari nol |
| Pembayaran | **Simulasi QRIS (gambar statis QR) + opsi Cash** | Integrasi payment gateway sungguhan (Midtrans/Xendit) opsional, di luar scope wajib MVP kuliah |
| Chat | **Floating WhatsApp button** (`wa.me` link, tanpa API berbayar) | Tetap memenuhi ketentuan tanpa kompleksitas integrasi API WhatsApp Business |
| Deployment | **Vercel** (frontend+backend) dan **Supabase/Neon** (database) | Gratis untuk skala kuliah, auto-deploy dari Git |

### 3.3 Trade-off Singkat: Stack Asli vs Stack Rekomendasi

| Aspek | Laravel + MySQL (Asli) | Next.js + Prisma (Rekomendasi) |
| --- | --- | --- |
| Kecepatan setup | Lebih lambat (perlu setup server PHP, composer, migration manual) | Lebih cepat (satu `npx create-next-app`, AI assistant lebih familiar) |
| Kesesuaian dengan ketentuan dokumen | 100% sesuai literal dokumen | Sedikit menyimpang dari ketentuan teknologi literal, namun tetap memenuhi seluruh requirement fungsional |
| Dukungan AI coding assistant | Baik, tapi proyek PHP cenderung lebih verbose | Sangat baik — ekosistem JS/TS adalah yang paling banyak dilatih pada AI coding assistant modern |
| Skill yang dipelajari | PHP, Laravel ecosystem (banyak dipakai industri lokal Indonesia) | JavaScript/TypeScript full-stack (lebih relevan untuk tren global) |
| Hosting gratis untuk demo kuliah | Lebih terbatas (perlu hosting PHP+MySQL, kadang berbayar) | Sangat mudah & gratis (Vercel + Supabase/Neon) |
| Risiko untuk deadline tugas | Lebih tinggi (boilerplate Laravel lebih banyak) | Lebih rendah (lebih sedikit boilerplate, iterasi lebih cepat) |

> **Keputusan:** Dokumen ini merekomendasikan **stack Next.js + Tailwind + Prisma + NextAuth** sebagai default untuk pengembangan dengan AI coding assistant, dengan catatan bahwa requirement *fungsional* (bukan teknologi literal) pada Bagian 4–6 tetap menjadi acuan wajib. Jika dosen/penilai mensyaratkan literal Laravel+MySQL, kelompok dapat menyesuaikan kembali ke Bagian 3.1.

---

## 4. Daftar Halaman & Fitur

### 4.1 Beranda (Home)

**Tujuan:** Memberi kesan pertama yang profesional dan mengarahkan pengguna ke booking secepat mungkin.

| Komponen | Detail |
| --- | --- |
| Hero Section | Slider/banner foto kucing yang dititipkan & fasilitas kandang; CTA utama **"Booking Sekarang"** |
| Mengapa Memilih CATNIP | Grid/list keunggulan: Feeding 3x sehari, Air minum bersih, Daily Cleaning, Mainan, Kandang nyaman, Staff berpengalaman |
| Ringkasan Layanan | Preview card kelas kamar (nama, harga mulai, jumlah kamar tersedia) + section testimoni pelanggan |

**Data ditampilkan:** Daftar kelas kamar (ringkas), testimoni, harga mulai dari.
**Behaviour penting:** CTA "Booking Sekarang" selalu mengarah ke halaman Booking; pada mobile, CTA ini sticky di bagian bawah.

### 4.2 Tentang Kami

**Tujuan:** Membangun kepercayaan melalui informasi profil bisnis.
**Komponen utama:** Cerita singkat CATNIP, visi/misi, foto fasilitas, lokasi (peta opsional).
**Data ditampilkan:** Konten statis (teks + gambar).

### 4.3 Katalog Kamar & Layanan

**Tujuan:** Memungkinkan pengguna membandingkan seluruh kelas penitipan secara detail.

**Komponen utama per kelas (Card):**
- Foto fasilitas
- Nama kelas (Premium / Standard Plus / Standard)
- Harga
- Deskripsi singkat
- Daftar fasilitas (checklist)

| Kelas | Fasilitas |
| --- | --- |
| Kelas 1 (Premium) | Extra Large Cage, Grooming Lengkap, Vitamin Premium, Feeding 3x sehari, Daily Cleaning, Air Bersih, Mainan |
| Kelas 2 (Standard Plus) | Large Cage, Vitamin, Feeding 3x sehari, Daily Cleaning, Air Bersih, Mainan |
| Kelas 3 (Standard) | Standard Cage, Feeding 3x sehari, Daily Cleaning, Air Bersih, Mainan |

**Behaviour penting:** Selain tampilan card, **wajib ada tabel perbandingan** fasilitas antar kelas (matrix fasilitas x kelas) agar mudah dibandingkan dalam satu tampilan.

### 4.4 Daftar Harga

**Tujuan:** Transparansi tarif berdasarkan kelas dan jenis kucing.

| Kelas | Kucing Ras | Kucing Domestik |
| --- | --- | --- |
| Kelas 1 | Rp350.000 / hari | Rp250.000 / hari |
| Kelas 2 | Rp200.000 / hari | Rp150.000 / hari |
| Kelas 3 | Rp100.000 / hari | Rp85.000 / hari |

**Behaviour penting:** Harga **harus dapat diubah lewat dashboard admin** tanpa mengubah kode (disimpan di database, bukan hardcode di frontend).

### 4.5 Booking

**Tujuan:** Inti dari sistem — memungkinkan pengguna melakukan reservasi penitipan kucing.

**Form bertahap (multi-step disarankan):**

1. **Data Pemilik** — Nama Lengkap, Email, Nomor WhatsApp (wajib semua)
2. **Data Kucing** — Nama Kucing, Jenis Kucing (Ras/Domestik), Riwayat Alergi, Makanan Khusus (opsional)
3. **Preferensi Layanan** — Pilih Kelas 1/2/3 (menampilkan harga otomatis sesuai jenis kucing)
4. **Logistik** — Antar sendiri / Jemput ke rumah (jika jemput, tambahkan field alamat)
5. **Tanggal Penitipan** — Tanggal check-in & check-out (untuk hitung total durasi & biaya)
6. **Pembayaran** — Pilih metode: Cash atau QRIS (jika QRIS, tampilkan kode QR statis/dinamis)

**Behaviour penting:**
- Status ketersediaan kamar ditampilkan **real-time** (Tersedia / Hampir Penuh / Penuh) saat memilih kelas — jika kelas berstatus **Penuh**, pengguna tidak dapat melanjutkan booking untuk kelas tersebut.
- Validasi form jelas di setiap step (contoh: format email, nomor WhatsApp, tanggal check-out > check-in).
- Setelah submit, sistem menampilkan ringkasan booking & status "Menunggu Konfirmasi".

### 4.6 Login & Registrasi

**Registrasi** — Field: Nama, Email, Nomor Telepon, Password (dengan konfirmasi password).
**Login** — Field: Email, Password.
**Behaviour penting:** Validasi password minimal (misal 8 karakter), email unik, pesan error yang jelas jika kredensial salah.

### 4.7 Dashboard Pengguna

**Tujuan:** Pusat kendali pengguna setelah login.
**Komponen utama:**
- Data pribadi (ringkas, dengan link ke Profil)
- Riwayat booking (list singkat, status terbaru)
- Status booking aktif (highlight di atas)

### 4.8 Profil Pengguna

**Komponen utama:**
- Data pribadi (edit nama, email, no. telepon)
- Riwayat booking lengkap
- Daftar kucing yang pernah dititipkan (tersimpan dari booking sebelumnya, bisa dipilih ulang saat booking baru agar tidak input ulang)
- Status booking aktif
- **Pengaturan**: Notifikasi (on/off), Preferensi bahasa, Dark Mode (opsional)

### 4.9 Riwayat Booking

**Tujuan:** Menampilkan histori transaksi pengguna.
**Data ditampilkan:** Tanggal booking, kelas kamar, nama kucing, status (Menunggu Konfirmasi/Dikonfirmasi/Selesai/Dibatalkan), total biaya.

### 4.10 Kontak

**Komponen utama:** Alamat, nomor telepon, email, jam operasional, embed peta (opsional), form kontak singkat.

### 4.11 FAQ

**Komponen utama:** Accordion list pertanyaan umum (syarat penitipan, kebijakan pembatalan, jam antar-jemput, dll).

### 4.12 Dashboard Admin

**Tujuan:** Pusat kendali operasional bagi admin/staff.

**Fitur utama:**
- **Kelola Harga** — ubah harga per kelas & jenis kucing tanpa ubah kode.
- **Kelola Ketersediaan Kamar** — update status real-time (Tersedia/Hampir Penuh/Penuh) per kelas.
- **Kelola Booking Masuk** — lihat daftar booking, ubah status (Konfirmasi/Tolak/Selesai), lihat detail data pemilik & kucing.
- **Kelola Konten Katalog** — edit deskripsi/fasilitas/foto tiap kelas (nice-to-have, bisa MVP-lite berupa edit langsung di database/seed jika waktu terbatas).

### 4.13 Floating WhatsApp (Komponen Global)

**Tujuan:** Saluran komunikasi instan untuk konsultasi, tanya ketersediaan, dan bantuan booking.
**Behaviour penting:** Tombol floating (biasanya pojok kanan bawah) **tampil di seluruh halaman**, tidak terhalang elemen lain, mengarah ke link `wa.me` dengan nomor admin CATNIP.

---

## 5. User Flow

### 5.1 Flow Registrasi & Login

```
Pengguna baru
   │
   ▼
Klik "Daftar" ──► Isi form (Nama, Email, No. Telp, Password)
   │
   ▼
Validasi data ──► [Gagal] ──► Tampilkan error, tetap di form
   │
   ▼ [Berhasil]
Akun dibuat ──► Redirect ke Login (atau auto-login)
   │
   ▼
Isi Email + Password ──► Validasi kredensial
   │
   ▼ [Berhasil]              ▼ [Gagal]
Masuk ke Dashboard Pengguna   Tampilkan pesan error, coba lagi
```

### 5.2 Flow Booking

```
Pengguna (boleh guest atau sudah login)
   │
   ▼
Buka halaman Booking
   │
   ▼
Isi Data Pemilik ──► Isi Data Kucing ──► Pilih Kelas
   │                                         │
   │                                         ▼
   │                          Cek status ketersediaan kelas
   │                                         │
   │                          [Penuh] ──► Tidak bisa lanjut, sarankan kelas lain
   │                                         │
   │                          [Tersedia/Hampir Penuh]
   │                                         ▼
   │                          Pilih Logistik (Antar/Jemput)
   │                                         │
   ▼                                         ▼
Pilih Tanggal Check-in/Check-out ──► Sistem hitung total biaya
   │
   ▼
Pilih metode pembayaran (Cash / QRIS)
   │
   ▼
Submit Booking ──► Status: "Menunggu Konfirmasi"
   │
   ▼
Notifikasi ke Admin (Dashboard Admin) + Konfirmasi ke pengguna (email/halaman ringkasan)
```

### 5.3 Flow Pembayaran

```
Pengguna memilih metode pembayaran saat checkout booking
   │
   ├── Cash ──► Status pembayaran: "Bayar di Tempat" ──► Dikonfirmasi admin saat kucing diantar
   │
   └── QRIS ──► Tampilkan QR Code ──► Pengguna scan & bayar
                     │
                     ▼
            Pengguna upload bukti bayar (manual, untuk MVP)
                     │
                     ▼
            Admin verifikasi bukti di Dashboard Admin
                     │
                     ▼
            Status booking diubah ke "Dikonfirmasi"
```

> **Catatan MVP:** Untuk tugas kuliah, verifikasi QRIS dilakukan **manual oleh admin** (upload bukti transfer/screenshot), bukan integrasi payment gateway otomatis — kecuali kelompok memiliki waktu tambahan untuk integrasi Midtrans/Xendit.

### 5.4 Flow Admin Mengelola Data

```
Admin Login ──► Dashboard Admin
   │
   ├── Kelola Harga ──► Pilih kelas ──► Edit harga (Ras/Domestik) ──► Simpan ──► Harga ter-update di Daftar Harga & Booking
   │
   ├── Kelola Ketersediaan ──► Pilih kelas ──► Update status (Tersedia/Hampir Penuh/Penuh) ──► Tersimpan & langsung tampil real-time di Booking
   │
   └── Kelola Booking ──► Lihat list booking baru ──► Buka detail ──► Verifikasi pembayaran (jika QRIS) ──► Ubah status (Dikonfirmasi/Ditolak/Selesai)
```

---

## 6. Data Model

> Skema berikut menjadi acuan struktur database (relasional), cocok diimplementasikan dengan Prisma Schema (rekomendasi) maupun migration Laravel (jika memakai stack asli).

### 6.1 Entitas: `User`

| Field | Tipe | Keterangan |
| --- | --- | --- |
| id | UUID/Int (PK) | Primary key |
| nama | String | Nama lengkap |
| email | String (unique) | Digunakan untuk login |
| no_telepon | String | Nomor telepon/WhatsApp |
| password_hash | String | Password terenkripsi |
| role | Enum(`user`, `admin`) | Pembeda hak akses |
| preferensi_bahasa | String (default: `id`) | Untuk fitur pengaturan |
| dark_mode | Boolean (default: false) | Opsional |
| created_at / updated_at | DateTime | Timestamp |

### 6.2 Entitas: `Cat` (Kucing)

| Field | Tipe | Keterangan |
| --- | --- | --- |
| id | UUID/Int (PK) | Primary key |
| user_id | FK → User | Pemilik kucing |
| nama_kucing | String | Nama kucing |
| jenis_kucing | Enum(`ras`, `domestik`) | Menentukan tarif |
| riwayat_alergi | Text (nullable) | Catatan alergi |
| makanan_khusus | Text (nullable) | Opsional |
| created_at | DateTime | Timestamp |

### 6.3 Entitas: `RoomClass` (Kelas Kamar)

| Field | Tipe | Keterangan |
| --- | --- | --- |
| id | UUID/Int (PK) | Primary key |
| nama_kelas | String | "Kelas 1 (Premium)", dst. |
| deskripsi | Text | Deskripsi layanan |
| fasilitas | JSON/Array<String> | List fasilitas |
| harga_ras | Decimal | Tarif kucing ras / hari |
| harga_domestik | Decimal | Tarif kucing domestik / hari |
| status_ketersediaan | Enum(`tersedia`, `hampir_penuh`, `penuh`) | Real-time status, diatur admin |
| jumlah_kamar_tersedia | Int | Untuk perhitungan/preview di Beranda |
| foto_url | String | Path/URL gambar |
| created_at / updated_at | DateTime | Timestamp |

### 6.4 Entitas: `Booking`

| Field | Tipe | Keterangan |
| --- | --- | --- |
| id | UUID/Int (PK) | Primary key |
| user_id | FK → User (nullable jika guest) | Pemilik booking |
| cat_id | FK → Cat | Kucing yang dititipkan |
| room_class_id | FK → RoomClass | Kelas yang dipilih |
| tanggal_checkin | Date | Mulai penitipan |
| tanggal_checkout | Date | Selesai penitipan |
| logistik | Enum(`antar_sendiri`, `jemput`) | Pilihan logistik |
| alamat_jemput | Text (nullable) | Wajib jika logistik = jemput |
| metode_pembayaran | Enum(`cash`, `qris`) | Metode bayar |
| bukti_pembayaran_url | String (nullable) | Untuk QRIS manual upload |
| total_biaya | Decimal | Hasil kalkulasi otomatis |
| status_booking | Enum(`menunggu_konfirmasi`, `dikonfirmasi`, `ditolak`, `selesai`) | Status proses |
| created_at / updated_at | DateTime | Timestamp |

### 6.5 Entitas: `Testimonial`

| Field | Tipe | Keterangan |
| --- | --- | --- |
| id | UUID/Int (PK) | Primary key |
| user_id | FK → User (nullable) | Penulis testimoni |
| nama_tampilan | String | Nama yang ditampilkan publik |
| rating | Int (1–5) | Rating bintang |
| komentar | Text | Isi testimoni |
| created_at | DateTime | Timestamp |

### 6.6 Relasi Antar Entitas

```
User 1───* Cat
User 1───* Booking
Cat  1───* Booking
RoomClass 1───* Booking
User 1───* Testimonial
```

---

## 7. Non-Functional Requirements

### 7.1 Performa

- Waktu loading halaman utama **< 3 detik** pada koneksi standar.
- Gambar dioptimasi (format WebP/compressed) tanpa mengurangi kualitas visual secara signifikan.
- Lazy-loading untuk gambar di galeri/katalog.

### 7.2 Responsivitas

- Wajib **Mobile First**; diuji minimal pada breakpoint mobile (≤768px), tablet (768–1024px), dan desktop (>1024px).
- Tidak ada elemen yang overflow/terpotong pada layar kecil.

### 7.3 Validasi Form

- Semua field wajib memiliki validasi (format email, panjang minimum password, format nomor telepon).
- Pesan error ditampilkan inline, jelas, dan dalam Bahasa Indonesia.
- Tanggal checkout tidak boleh lebih awal/sama dengan check-in.

### 7.4 Aksesibilitas

- Kontras warna teks-background memenuhi **WCAG AA**.
- Semua tombol/CTA memiliki ukuran tap target yang cukup besar untuk mobile (minimal 44x44px).
- Form memiliki label yang jelas (bukan hanya placeholder).

### 7.5 Konsistensi UI

- Komponen (tombol, card, navigasi) konsisten secara visual di seluruh halaman — disarankan membangun design system/komponen reusable sejak awal.

### 7.6 Definition of Done (DoD) untuk MVP

Sebuah fitur dianggap **selesai (Done)** jika:

- [ ] Berfungsi sesuai behaviour yang dijelaskan di Bagian 4.
- [ ] Responsive di mobile, tablet, dan desktop.
- [ ] Validasi form berjalan dan menampilkan pesan error yang sesuai.
- [ ] Data tersimpan/terbaca dengan benar dari database (bukan data dummy hardcoded di frontend, kecuali untuk konten statis seperti FAQ/Tentang Kami).
- [ ] Tidak ada console error/warning kritikal di browser.
- [ ] Sudah diuji minimal 1x flow end-to-end (contoh: registrasi → login → booking → admin konfirmasi).

**MVP dianggap selesai secara keseluruhan jika seluruh 13 halaman pada Bagian 6 ketentuan asli telah dibangun dan flow utama (5.1–5.4) berjalan tanpa error blocking.**

---

## 8. Batasan & Asumsi

### 8.1 Scope MVP (In-Scope)

- Seluruh 13 halaman sesuai daftar di ketentuan asli (Bagian 6 dokumen ketentuan).
- Sistem booking dengan kalkulasi harga otomatis berdasarkan kelas + jenis kucing + durasi.
- Autentikasi dasar (registrasi/login email-password).
- Dashboard admin untuk kelola harga, ketersediaan kamar, dan status booking.
- Integrasi WhatsApp via floating button (link `wa.me`, tanpa API berbayar).
- Pembayaran QRIS disimulasikan secara manual (upload bukti, verifikasi admin) — bukan integrasi payment gateway otomatis.

### 8.2 Di Luar Scope MVP (Out of Scope)

- Integrasi payment gateway otomatis (Midtrans/Xendit) dengan callback otomatis.
- Notifikasi real-time via push notification/WebSocket (cukup polling/refresh manual untuk status booking).
- Multi-bahasa penuh (toggle bahasa di Pengaturan boleh bersifat UI-only/placeholder untuk MVP).
- Sistem rating/review kompleks dengan moderasi.
- Aplikasi mobile native (scope ini hanya website responsive).

### 8.3 Asumsi untuk Ketentuan yang Ambigu

| Area Ambigu | Asumsi yang Diambil |
| --- | --- |
| Ketentuan dokumen asli menyebut stack Laravel+MySQL literal | Diasumsikan tujuan ketentuan adalah **fungsionalitas**, bukan teknologi spesifik, sehingga stack Next.js+Prisma (Bagian 3.2) dapat digunakan sebagai pengganti yang fungsionally equivalent |
| QRIS disebut sebagai "metode pembayaran" tanpa detail integrasi | Diasumsikan QRIS untuk MVP kuliah berupa **gambar QR statis + verifikasi manual oleh admin**, bukan integrasi gateway real-time |
| "Status ketersediaan real-time" tidak dijelaskan mekanismenya | Diasumsikan cukup dengan **update database oleh admin** yang langsung tercermin saat halaman di-refresh/fetch ulang (tidak perlu WebSocket) |
| "Dark Mode (opsional)" pada Pengaturan | Diasumsikan boleh diimplementasikan sebagai **nice-to-have**, dapat ditunda jika waktu terbatas |
| Floating WhatsApp tanpa nomor spesifik diberikan | Diasumsikan menggunakan **nomor placeholder** yang dapat diganti kemudian (`[ISI: Nomor WhatsApp Admin]`) |
| Tidak ada penjelasan kebijakan pembatalan booking | Diasumsikan ditambahkan sebagai bagian dari konten FAQ, kebijakan spesifik diserahkan ke kelompok untuk didefinisikan |
| Bahasa pemrograman/framework spesifik tidak menjadi syarat penilaian | Diasumsikan penilaian berfokus pada **kelengkapan fitur dan kualitas UI/UX**, bukan kepatuhan literal terhadap nama framework di Bagian 5 ketentuan asli |

---

## 9. Lampiran: Ringkasan Prioritas Implementasi (Saran untuk AI Coding Assistant)

Urutan pengembangan yang disarankan agar AI coding assistant dapat membangun secara bertahap dan terstruktur:

1. **Setup project** (Next.js + Tailwind + Prisma) + skema database (Bagian 6).
2. **Halaman statis dahulu**: Beranda, Tentang Kami, Kontak, FAQ (tanpa data dinamis).
3. **Katalog Kamar & Daftar Harga** (data dari database, bisa pakai seed data dahulu).
4. **Autentikasi** (Registrasi, Login) menggunakan NextAuth/Auth.js.
5. **Sistem Booking** end-to-end (form multi-step + kalkulasi harga + status ketersediaan).
6. **Dashboard Pengguna, Profil, Riwayat Booking**.
7. **Dashboard Admin** (kelola harga, ketersediaan, booking).
8. **Floating WhatsApp** + polishing UI/UX (animasi, responsive testing, aksesibilitas).
9. **Testing end-to-end** flow utama sesuai Bagian 5 sebelum demo/submit.

---

*Dokumen ini bersifat hidup (living document) — dapat diperbarui seiring perkembangan implementasi, namun perubahan besar pada scope sebaiknya didiskusikan ulang dengan tim sebelum AI coding assistant melanjutkan development.*
