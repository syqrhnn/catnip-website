import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Akses ditolak." }, { status: 403 });
    }

    const { id, harga_ras, harga_domestik, status_ketersediaan } = await req.json();

    if (!id || harga_ras === undefined || harga_domestik === undefined || !status_ketersediaan) {
      return NextResponse.json({ message: "Data tidak lengkap." }, { status: 400 });
    }

    const updatedRoom = await prisma.roomClass.update({
      where: { id: parseInt(id) },
      data: {
        harga_ras: Number(harga_ras),
        harga_domestik: Number(harga_domestik),
        status_ketersediaan,
      },
    });

    return NextResponse.json({ message: "Berhasil diperbarui", room: updatedRoom }, { status: 200 });
  } catch (error) {
    console.error("Admin Room Update Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}
