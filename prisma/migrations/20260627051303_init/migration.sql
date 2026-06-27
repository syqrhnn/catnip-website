-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_telepon" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'user',
    "preferensi_bahasa" TEXT NOT NULL DEFAULT 'id',
    "dark_mode" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "cats" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "nama_kucing" TEXT NOT NULL,
    "jenis_kucing" TEXT NOT NULL,
    "riwayat_alergi" TEXT,
    "makanan_khusus" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "room_classes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_kelas" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "fasilitas" TEXT NOT NULL,
    "harga_ras" DECIMAL NOT NULL,
    "harga_domestik" DECIMAL NOT NULL,
    "status_ketersediaan" TEXT NOT NULL DEFAULT 'tersedia',
    "jumlah_kamar_tersedia" INTEGER NOT NULL DEFAULT 5,
    "foto_url" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "cat_id" INTEGER NOT NULL,
    "room_class_id" INTEGER NOT NULL,
    "tanggal_checkin" DATETIME NOT NULL,
    "tanggal_checkout" DATETIME NOT NULL,
    "logistik" TEXT NOT NULL,
    "alamat_jemput" TEXT,
    "metode_pembayaran" TEXT NOT NULL,
    "bukti_pembayaran_url" TEXT,
    "total_biaya" DECIMAL NOT NULL,
    "status_booking" TEXT NOT NULL DEFAULT 'menunggu_konfirmasi',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "bookings_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "cats" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookings_room_class_id_fkey" FOREIGN KEY ("room_class_id") REFERENCES "room_classes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "nama_tampilan" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "komentar" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "testimonials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
