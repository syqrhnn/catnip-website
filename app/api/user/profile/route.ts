import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Tidak memiliki akses." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.user.id) },
      select: {
        nama: true,
        email: true,
        no_telepon: true,
        preferensi_bahasa: true,
        dark_mode: true,
        cats: {
          select: {
            id: true,
            nama_kucing: true,
            jenis_kucing: true,
            riwayat_alergi: true,
            makanan_khusus: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ message: "Pengguna tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Tidak memiliki akses." }, { status: 401 });
    }

    const body = await req.json();
    const { nama, no_telepon, preferensi_bahasa, dark_mode } = body;

    if (!nama || !no_telepon) {
      return NextResponse.json({ message: "Nama dan Nomor Telepon wajib diisi." }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(session.user.id) },
      data: {
        nama,
        no_telepon,
        preferensi_bahasa,
        dark_mode
      }
    });

    return NextResponse.json({ 
      message: "Profil berhasil diperbarui.",
      user: {
        nama: updatedUser.nama,
        no_telepon: updatedUser.no_telepon
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server saat memperbarui profil." }, { status: 500 });
  }
}
