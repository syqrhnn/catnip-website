import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Container, { Section } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Dashboard | CATNIP",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Section background="cream" className="min-h-[80vh] py-12">
      <Container>
        <div className="bg-white p-8 rounded-2xl shadow-soft">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#333333] mb-2">
              Halo, <span className="text-[#CC5500]">{session.user?.name || "Pet Parent"}</span>! 👋
            </h1>
            <p className="text-gray-500">
              Selamat datang di dashboard CATNIP Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-100 rounded-xl p-6 hover:border-[#CC5500] transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-1">Riwayat Booking</h3>
              <p className="text-sm text-gray-500">Lihat status penitipan dan riwayat transaksi sebelumnya.</p>
            </div>

            <div className="border border-gray-100 rounded-xl p-6 hover:border-[#CC5500] transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-1">Profil Saya</h3>
              <p className="text-sm text-gray-500">Atur informasi pribadi dan kontak darurat Anda.</p>
            </div>

            <div className="border border-gray-100 rounded-xl p-6 hover:border-[#CC5500] transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10.000 10.000 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-1">Profil Kucing</h3>
              <p className="text-sm text-gray-500">Daftarkan profil anabul untuk mempercepat proses booking.</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
