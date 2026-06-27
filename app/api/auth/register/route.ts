import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, email, no_telepon, password } = body;

    // Basic validation
    if (!nama || !email || !password) {
      return NextResponse.json({ message: "Nama, email, dan password wajib diisi." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password minimal 8 karakter." }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Email sudah digunakan." }, { status: 409 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        nama,
        email,
        password_hash,
        no_telepon: no_telepon || "",
        role: "user", // Default role
      },
    });

    return NextResponse.json(
      { message: "Registrasi berhasil", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ message: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
