import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Akses ditolak." }, { status: 403 });
    }

    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            nama: true,
            no_telepon: true,
          },
        },
        cat: {
          select: {
            nama_kucing: true,
            jenis_kucing: true,
          },
        },
        room_class: {
          select: {
            nama_kelas: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Admin GET Bookings Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Akses ditolak." }, { status: 403 });
    }

    const { id, status_booking } = await req.json();

    if (!id || !status_booking) {
      return NextResponse.json({ message: "Data tidak lengkap." }, { status: 400 });
    }

    const validStatuses = ["menunggu_konfirmasi", "dikonfirmasi", "selesai", "ditolak", "dibatalkan"];
    if (!validStatuses.includes(status_booking)) {
      return NextResponse.json({ message: "Status tidak valid." }, { status: 400 });
    }

    const updated = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status_booking },
    });

    return NextResponse.json({ message: "Status berhasil diperbarui.", booking: updated }, { status: 200 });
  } catch (error) {
    console.error("Admin PUT Booking Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan server." }, { status: 500 });
  }
}
