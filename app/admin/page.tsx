import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [totalBookings, pendingBookings, confirmedBookings, totalRooms] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status_booking: "menunggu_konfirmasi" } }),
    prisma.booking.count({ where: { status_booking: "dikonfirmasi" } }),
    prisma.roomClass.count(),
  ]);

  return (
    <div className="max-w-[1200px] mx-auto pt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#2B2B2B] mb-2 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 font-medium text-sm">Ringkasan operasional penitipan kucing CATNIP hari ini.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-[1.75rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col items-start border border-gray-50/50">
          <div className="w-10 h-10 bg-[#FFF9E6] text-[#D9A018] rounded-full flex items-center justify-center mb-5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-[0.6rem] font-bold text-gray-400 mb-1 tracking-widest uppercase h-8 flex items-end">Menunggu<br/>Konfirmasi</div>
          <div className="text-4xl leading-none font-black text-[#F59E0B] mt-2">{pendingBookings}</div>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-[1.75rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col items-start border border-gray-50/50">
          <div className="w-10 h-10 bg-[#E6F9EC] text-[#10B981] rounded-full flex items-center justify-center mb-5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-[0.6rem] font-bold text-gray-400 mb-1 tracking-widest uppercase h-8 flex items-end">Booking Aktif</div>
          <div className="text-4xl leading-none font-black text-[#10B981] mt-2">{confirmedBookings}</div>
        </div>
        
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-[1.75rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col items-start border border-gray-50/50">
          <div className="w-10 h-10 bg-[#E6F0FF] text-[#3B82F6] rounded-full flex items-center justify-center mb-5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="text-[0.6rem] font-bold text-gray-400 mb-1 tracking-widest uppercase h-8 flex items-end">Total Transaksi</div>
          <div className="text-4xl leading-none font-black text-[#3B82F6] mt-2">{totalBookings}</div>
        </div>
        
        {/* Card 4 */}
        <div className="bg-white p-6 rounded-[1.75rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col items-start border border-gray-50/50">
          <div className="w-10 h-10 bg-[#FFF0E5] text-[#D95B18] rounded-full flex items-center justify-center mb-5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="text-[0.6rem] font-bold text-gray-400 mb-1 tracking-widest uppercase h-8 flex items-end">Kelas Kamar</div>
          <div className="text-4xl leading-none font-black text-[#D95B18] mt-2">{totalRooms}</div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FFF5EC] p-8 rounded-[1.75rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-50 flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-20 h-20 bg-[#D95B18] rounded-2xl flex shrink-0 items-center justify-center text-white shadow-lg rotate-0 transition-transform">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="relative z-10 pl-2">
          <h3 className="font-bold text-xl text-[#2B2B2B] mb-2 tracking-tight">Selamat Datang di Admin Control Center</h3>
          <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-3xl">
            Gunakan menu di sebelah kiri untuk mengelola booking masuk, memperbarui status pesanan, dan menyesuaikan ketersediaan setiap kelas kamar dengan cepat dan mudah.
          </p>
        </div>
      </div>
    </div>
  );
}
