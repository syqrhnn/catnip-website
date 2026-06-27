import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Container, { Section } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Dashboard | CATNIP",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Ambil data user, termasuk kucing dan booking aktif
  const user = await prisma.user.findUnique({
    where: { id: parseInt(session.user.id) },
    include: {
      cats: true,
      bookings: {
        where: {
          status_booking: {
            notIn: ["selesai", "ditolak", "dibatalkan"],
          },
        },
        include: {
          cat: true,
          room_class: true,
        },
        orderBy: {
          tanggal_checkin: "asc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const activeBookings = user.bookings;

  return (
    <div className="min-h-screen py-12" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 100%)" }}>
      <Container>
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-soft-xl border border-gray-100">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#333333] mb-2">
                Halo, <span className="text-[#CC5500]">{user.nama}</span>! 👋
              </h1>
              <p className="text-gray-500">
                Selamat datang di dashboard CATNIP Anda.
              </p>
            </div>
            {session.user.role === "admin" && (
              <div className="mt-4 md:mt-0">
                <Link href="/admin" className="inline-flex items-center justify-center gap-2 bg-[#D95B18] text-white px-6 py-3 rounded-full font-bold hover:bg-[#C25015] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  <span className="text-white">Masuk ke Panel Admin</span>
                  <svg className="text-white" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kiri: Status Booking Aktif */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FDF0E8] text-[#CC5500] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10.000 10.000 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </span>
                Booking Aktif
              </h2>

              {activeBookings.length > 0 ? (
                <div className="space-y-4">
                  {activeBookings.map(booking => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs font-bold text-gray-500 mb-1 block">ID: #CTNP-{booking.id.toString().padStart(4, '0')}</span>
                          <h3 className="font-bold text-lg">{booking.cat.nama_kucing}</h3>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                            booking.status_booking === 'dikonfirmasi' ? 'bg-green-100 text-green-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status_booking === 'dikonfirmasi' ? 'DIKONFIRMASI' : 'MENUNGGU KONFIRMASI'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mt-4 border-t border-gray-100 pt-4">
                        <div>
                          <span className="text-gray-500 block mb-1">Check-in</span>
                          <span className="font-semibold">{booking.tanggal_checkin.toLocaleDateString('id-ID')}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block mb-1">Check-out</span>
                          <span className="font-semibold">{booking.tanggal_checkout.toLocaleDateString('id-ID')}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block mb-1">Kamar</span>
                          <span className="font-semibold">{booking.room_class.nama_kelas}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block mb-1">Total Biaya</span>
                          <span className="font-semibold text-[#CC5500]">
                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(booking.total_biaya))}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 shadow-sm mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-700 mb-1">Belum Ada Booking Aktif</h3>
                  <p className="text-sm text-gray-500 mb-6">Anda belum memiliki jadwal penitipan kucing yang sedang berjalan.</p>
                  <Link href="/booking" className="btn btn-primary btn-sm">
                    Buat Booking Baru
                  </Link>
                </div>
              )}
            </div>

            {/* Kanan: Navigasi Cepat */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                Menu Akses Cepat
              </h2>
              
              <Link href="/profil" className="block border border-gray-100 rounded-xl p-5 hover:border-[#CC5500] hover:bg-[#FDF0E8] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-[#CC5500] rounded-full flex items-center justify-center transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Profil Saya</h3>
                    <p className="text-sm text-gray-500">Edit data diri & preferensi</p>
                  </div>
                </div>
              </Link>

              <Link href="/riwayat-booking" className="block border border-gray-100 rounded-xl p-5 hover:border-[#CC5500] hover:bg-[#FDF0E8] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-[#CC5500] rounded-full flex items-center justify-center transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Semua Riwayat</h3>
                    <p className="text-sm text-gray-500">Lihat histori penitipan</p>
                  </div>
                </div>
              </Link>

            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
