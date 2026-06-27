import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Container, { Section } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Riwayat Booking | CATNIP",
};

export default async function RiwayatBookingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const bookings = await prisma.booking.findMany({
    where: { user_id: parseInt(session.user.id) },
    include: {
      cat: true,
      room_class: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'dikonfirmasi':
        return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">DIKONFIRMASI</span>;
      case 'selesai':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">SELESAI</span>;
      case 'ditolak':
      case 'dibatalkan':
        return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">{status.toUpperCase()}</span>;
      default:
        return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">MENUNGGU KONFIRMASI</span>;
    }
  };

  return (
    <Section background="cream" className="min-h-[85vh] py-12">
      <Container>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#333333] mb-1">Riwayat Booking</h1>
              <p className="text-sm text-gray-500">Daftar semua transaksi penitipan kucing Anda.</p>
            </div>
          </div>

          {bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="p-4 border-b-2 border-gray-100 bg-gray-50 text-gray-600 font-bold text-sm">ID / TANGGAL PESAN</th>
                    <th className="p-4 border-b-2 border-gray-100 bg-gray-50 text-gray-600 font-bold text-sm">DETAIL KUCING</th>
                    <th className="p-4 border-b-2 border-gray-100 bg-gray-50 text-gray-600 font-bold text-sm">JADWAL & KELAS</th>
                    <th className="p-4 border-b-2 border-gray-100 bg-gray-50 text-gray-600 font-bold text-sm">BIAYA</th>
                    <th className="p-4 border-b-2 border-gray-100 bg-gray-50 text-gray-600 font-bold text-sm">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 border-b border-gray-100 align-top">
                        <div className="font-bold text-gray-800">#CTNP-{booking.id.toString().padStart(4, '0')}</div>
                        <div className="text-xs text-gray-500 mt-1">{booking.created_at.toLocaleDateString('id-ID')}</div>
                      </td>
                      <td className="p-4 border-b border-gray-100 align-top">
                        <div className="font-semibold">{booking.cat.nama_kucing}</div>
                        <div className="text-xs text-gray-500 capitalize">{booking.cat.jenis_kucing}</div>
                      </td>
                      <td className="p-4 border-b border-gray-100 align-top">
                        <div className="text-sm font-medium">{booking.tanggal_checkin.toLocaleDateString('id-ID')} - {booking.tanggal_checkout.toLocaleDateString('id-ID')}</div>
                        <div className="text-xs text-gray-500 mt-1">{booking.room_class.nama_kelas}</div>
                      </td>
                      <td className="p-4 border-b border-gray-100 align-top">
                        <div className="font-bold text-[#CC5500]">
                          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(booking.total_biaya))}
                        </div>
                        <div className="text-xs text-gray-500 uppercase mt-1">{booking.metode_pembayaran}</div>
                      </td>
                      <td className="p-4 border-b border-gray-100 align-top">
                        {getStatusBadge(booking.status_booking)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-100 rounded-xl">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-bold text-gray-600 mb-1">Belum Ada Riwayat</h3>
              <p className="text-sm text-gray-400">Anda belum pernah melakukan booking penitipan.</p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
