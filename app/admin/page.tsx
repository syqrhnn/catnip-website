import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalBookings, pendingBookings, confirmedBookings, totalRooms] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status_booking: "menunggu_konfirmasi" } }),
    prisma.booking.count({ where: { status_booking: "dikonfirmasi" } }),
    prisma.roomClass.count(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#333333] mb-2">Dashboard Admin</h1>
      <p className="text-gray-500 mb-8">Ringkasan operasional penitipan kucing CATNIP.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-1">Menunggu Konfirmasi</div>
          <div className="text-4xl font-black text-yellow-500">{pendingBookings}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-1">Booking Aktif</div>
          <div className="text-4xl font-black text-green-500">{confirmedBookings}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-1">Total Transaksi</div>
          <div className="text-4xl font-black text-[#333333]">{totalBookings}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
          <div className="text-sm font-bold text-gray-500 mb-1">Kelas Kamar</div>
          <div className="text-4xl font-black text-[#CC5500]">{totalRooms}</div>
        </div>
      </div>

      <div className="bg-[#FFFDD0] p-6 rounded-2xl border border-[#F5F0B0]">
        <h3 className="font-bold text-lg mb-2">Selamat Datang di Panel Admin</h3>
        <p className="text-gray-700">
          Gunakan menu di sebelah kiri untuk mengelola booking masuk dan menyesuaikan harga atau status ketersediaan setiap kelas kamar.
        </p>
      </div>
    </div>
  );
}
