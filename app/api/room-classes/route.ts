import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roomClasses = await prisma.roomClass.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(roomClasses, { status: 200 });
  } catch (error) {
    console.error("Error fetching room classes:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan saat memuat data kelas kamar." },
      { status: 500 }
    );
  }
}
