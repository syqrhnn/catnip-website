import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId, // nullable
      namaPemilik,
      emailPemilik,
      noWhatsapp,
      namaKucing,
      jenisKucing,
      riwayatAlergi,
      makananKhusus,
      roomClassId,
      tanggalCheckin,
      tanggalCheckout,
      logistik,
      alamatJemput,
      metodePembayaran,
    } = body;

    if (!namaPemilik || !emailPemilik || !noWhatsapp || !namaKucing || !jenisKucing || !roomClassId || !tanggalCheckin || !tanggalCheckout || !logistik || !metodePembayaran) {
      return NextResponse.json({ message: "Semua field wajib harus diisi." }, { status: 400 });
    }

    const checkin = new Date(tanggalCheckin);
    const checkout = new Date(tanggalCheckout);

    if (checkout <= checkin) {
      return NextResponse.json({ message: "Tanggal Check-out harus setelah Tanggal Check-in." }, { status: 400 });
    }

    const durasiHari = Math.ceil((checkout.getTime() - checkin.getTime()) / (1000 * 3600 * 24));

    // Get room class price and check availability
    const room = await prisma.roomClass.findUnique({
      where: { id: parseInt(roomClassId) },
    });

    if (!room) {
      return NextResponse.json({ message: "Kelas kamar tidak ditemukan." }, { status: 404 });
    }

    if (room.status_ketersediaan === "penuh") {
      return NextResponse.json({ message: "Maaf, kelas kamar ini sudah penuh." }, { status: 400 });
    }

    const hargaPerHari = jenisKucing === "ras" ? Number(room.harga_ras) : Number(room.harga_domestik);
    const totalBiaya = hargaPerHari * durasiHari;

    // We need to associate the Cat with a User, but Prisma schema requires user_id on Cat.
    // Wait! The Prisma schema for Cat has `user_id Int`. It's not nullable!
    // Let me check if `user_id` is nullable in `Cat`.
    // Schema: `user_id Int`.
    // If guest booking is allowed, we need a way to store the user_id. Or we must create a User for the guest, or we must modify Cat schema to make user_id nullable.
    // The PRD says "Data Pemilik — Nama Lengkap, Email, Nomor WhatsApp (wajib semua)".
    // Maybe we should just upsert a User based on the email? If guest, we create a user. If already exists, we use it.
    
    let dbUserId = userId ? parseInt(userId) : null;
    
    if (!dbUserId) {
      // Upsert user based on email (since email is unique)
      let guestUser = await prisma.user.findUnique({ where: { email: emailPemilik } });
      if (!guestUser) {
        guestUser = await prisma.user.create({
          data: {
            nama: namaPemilik,
            email: emailPemilik,
            no_telepon: noWhatsapp,
            password_hash: "guest_no_password", // Placeholder for guest
            role: "user"
          }
        });
      }
      dbUserId = guestUser.id;
    }

    // Create Cat
    const cat = await prisma.cat.create({
      data: {
        user_id: dbUserId,
        nama_kucing: namaKucing,
        jenis_kucing: jenisKucing,
        riwayat_alergi: riwayatAlergi || null,
        makanan_khusus: makananKhusus || null,
      }
    });

    // Create Booking
    const booking = await prisma.booking.create({
      data: {
        user_id: dbUserId,
        cat_id: cat.id,
        room_class_id: parseInt(roomClassId),
        tanggal_checkin: checkin,
        tanggal_checkout: checkout,
        logistik: logistik,
        alamat_jemput: alamatJemput || null,
        metode_pembayaran: metodePembayaran,
        total_biaya: totalBiaya,
        status_booking: "menunggu_konfirmasi",
        bukti_pembayaran_url: metodePembayaran === "qris" ? "placeholder_bukti.jpg" : null, // MVP placeholder
      }
    });

    return NextResponse.json({ message: "Booking berhasil dibuat.", bookingId: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Booking Submission Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
