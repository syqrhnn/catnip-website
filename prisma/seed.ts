import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // ─────────────────────────────────────────────
  // 1. ROOM CLASSES
  // ─────────────────────────────────────────────
  console.log("📦 Seeding RoomClasses...");

  const kelas1 = await prisma.roomClass.upsert({
    where: { id: 1 },
    update: {},
    create: {
      nama_kelas: "Kelas 1 (Premium)",
      deskripsi:
        "Pengalaman penitipan terbaik untuk kucing kesayangan Anda. Kandang Extra Large dengan fasilitas premium lengkap termasuk grooming, vitamin premium, dan perhatian maksimal dari staff berpengalaman.",
      fasilitas: JSON.stringify([
        "Extra Large Cage",
        "Grooming Lengkap",
        "Vitamin Premium",
        "Feeding 3x sehari",
        "Daily Cleaning",
        "Air Bersih",
        "Mainan",
      ]),
      harga_ras: 350000,
      harga_domestik: 250000,
      status_ketersediaan: "tersedia",
      jumlah_kamar_tersedia: 5,
      foto_url: "/images/kelas1.jpg",
    },
  });

  const kelas2 = await prisma.roomClass.upsert({
    where: { id: 2 },
    update: {},
    create: {
      nama_kelas: "Kelas 2 (Standard Plus)",
      deskripsi:
        "Pilihan terbaik dengan keseimbangan fasilitas dan harga. Kandang Large yang nyaman dengan vitamin dan perawatan rutin harian untuk kenyamanan kucing Anda.",
      fasilitas: JSON.stringify([
        "Large Cage",
        "Vitamin",
        "Feeding 3x sehari",
        "Daily Cleaning",
        "Air Bersih",
        "Mainan",
      ]),
      harga_ras: 200000,
      harga_domestik: 150000,
      status_ketersediaan: "tersedia",
      jumlah_kamar_tersedia: 8,
      foto_url: "/images/kelas2.jpg",
    },
  });

  const kelas3 = await prisma.roomClass.upsert({
    where: { id: 3 },
    update: {},
    create: {
      nama_kelas: "Kelas 3 (Standard)",
      deskripsi:
        "Penitipan dasar yang tetap nyaman dan bersih. Kandang Standard dengan kebutuhan esensial terpenuhi — pilihan ekonomis untuk kucing domestik Anda.",
      fasilitas: JSON.stringify([
        "Standard Cage",
        "Feeding 3x sehari",
        "Daily Cleaning",
        "Air Bersih",
        "Mainan",
      ]),
      harga_ras: 100000,
      harga_domestik: 85000,
      status_ketersediaan: "tersedia",
      jumlah_kamar_tersedia: 10,
      foto_url: "/images/kelas3.jpg",
    },
  });

  console.log(
    `✅ RoomClasses created: ${kelas1.nama_kelas}, ${kelas2.nama_kelas}, ${kelas3.nama_kelas}`
  );

  // ─────────────────────────────────────────────
  // 2. ADMIN USER
  // ─────────────────────────────────────────────
  console.log("👤 Seeding Admin user...");

  const hashedPassword = await bcrypt.hash("admin12345", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@catnip.com" },
    update: {},
    create: {
      nama: "Admin CATNIP",
      email: "admin@catnip.com",
      no_telepon: "6281234567890",
      password_hash: hashedPassword,
      role: "admin",
      preferensi_bahasa: "id",
      dark_mode: false,
    },
  });

  console.log(`✅ Admin created: ${admin.email}`);

  // ─────────────────────────────────────────────
  // 3. TESTIMONIALS
  // ─────────────────────────────────────────────
  console.log("💬 Seeding Testimonials...");

  const testimonials = await Promise.all([
    prisma.testimonial.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nama_tampilan: "Sari Dewi",
        rating: 5,
        komentar:
          "Pelayanannya luar biasa! Kucing saya (Mochi) sangat terawat selama 5 hari dititipkan di CATNIP. Staff-nya ramah dan responsif, kandang bersih, dan Mochi pulang dalam kondisi sehat bahkan lebih bersih dari sebelumnya. Highly recommended! 🐱",
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 2 },
      update: {},
      create: {
        nama_tampilan: "Budi Santoso",
        rating: 5,
        komentar:
          "Sudah 3x titip kucing di sini, selalu puas. Kelas 2 paling worth it menurut saya — fasilitas bagus, harga terjangkau. Sistem booking online juga memudahkan, tidak perlu repot telepon. Terima kasih CATNIP!",
      },
    }),
    prisma.testimonial.upsert({
      where: { id: 3 },
      update: {},
      create: {
        nama_tampilan: "Anisa Rahma",
        rating: 4,
        komentar:
          "Pertama kali titip kucing ras (Persia) dan sempat khawatir. Tapi CATNIP benar-benar profesional — staff mengerti cara handle kucing sensitif. Update foto kucing setiap hari bikin hati tenang waktu liburan. Pasti balik lagi!",
      },
    }),
  ]);

  console.log(`✅ Testimonials created: ${testimonials.length} entries`);

  console.log("\n🎉 Seed completed successfully!");
  console.log("─────────────────────────────────");
  console.log(`  RoomClasses : 3`);
  console.log(`  Admin users : 1 (admin@catnip.com / admin12345)`);
  console.log(`  Testimonials: ${testimonials.length}`);
  console.log("─────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
