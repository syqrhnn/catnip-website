import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Katalog Kamar | CATNIP",
  description: "Lihat daftar fasilitas dan kelas penitipan kucing di CATNIP.",
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

const roomImages: Record<number, string> = {
  1: "/room-kelas1.png",
  2: "/room-kelas2.png",
  3: "/room-kelas3.png",
};

export default async function KatalogPage() {
  const roomClasses = await prisma.roomClass.findMany({
    orderBy: { id: "asc" },
  });

  const allFacilities = Array.from(
    new Set(
      roomClasses.flatMap((rc) => {
        try {
          return JSON.parse(rc.fasilitas) as string[];
        } catch (e) {
          return [];
        }
      })
    )
  );

  return (
    <div>
      {/* Header — warm gradient */}
      <section className="relative overflow-hidden pt-20 pb-28" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 60%)" }}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#CC5500] opacity-5 rounded-full blur-3xl"></div>
        <Container className="text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#333333] text-[#FFF5E6] text-xs font-bold tracking-wider mb-5">FASILITAS KAMI</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4">Katalog <span className="text-[#CC5500]">Kamar</span></h1>
          <p className="text-[#525252] max-w-2xl mx-auto text-lg">
            Bandingkan dan pilih kelas kamar yang paling nyaman untuk kucing kesayangan Anda.
          </p>
        </Container>
      </section>

      {/* Room cards — overlap effect */}
      <section className="relative z-10 -mt-14 px-4 md:px-0 mb-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomClasses.map((rc) => {
              let fasilitas: string[] = [];
              try {
                fasilitas = JSON.parse(rc.fasilitas);
              } catch (e) {}

              return (
                <div key={rc.id} className="group bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100 hover:shadow-soft-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-56 relative overflow-hidden">
                    <Image
                      src={roomImages[rc.id] || "/room-kelas1.png"}
                      alt={`Foto ${rc.nama_kelas}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h2 className="font-bold text-2xl text-white drop-shadow-md">{rc.nama_kelas}</h2>
                    </div>
                    <span className={`absolute top-4 right-4 badge ${
                      rc.status_ketersediaan === 'tersedia' ? 'badge-available' :
                      rc.status_ketersediaan === 'hampir_penuh' ? 'badge-almost-full' : 'badge-full'
                    }`}>
                      {rc.status_ketersediaan === 'tersedia' ? `Tersedia (${rc.jumlah_kamar_tersedia})` :
                       rc.status_ketersediaan === 'hampir_penuh' ? `Hampir Penuh (${rc.jumlah_kamar_tersedia})` : 'Penuh'}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-[#525252] mb-5">{rc.deskripsi}</p>
                    
                    <div className="mb-5">
                      <h3 className="font-semibold text-xs mb-3 uppercase tracking-wider text-[#CC5500]">Fasilitas:</h3>
                      <ul className="space-y-2">
                        {fasilitas.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#525252]">
                            <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <div className="pt-4 border-t border-gray-100 mb-4">
                        <span className="text-xs text-[#525252] block mb-1">Harga Mulai</span>
                        <span className="text-[#CC5500] font-bold text-2xl">{formatRupiah(Number(rc.harga_domestik))}</span>
                        <span className="text-sm text-[#525252]"> / hari</span>
                      </div>
                      <Button href={`/booking?room=${rc.id}`} variant="primary" fullWidth>
                        Pilih Kelas Ini
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Tabel Perbandingan Fasilitas */}
      <Section background="white">
        <Container>
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#FDF0E8] text-[#CC5500] text-xs font-bold tracking-wider mb-5">PERBANDINGAN</span>
            <h2 className="text-3xl font-bold mb-4 text-[#333333]">Perbandingan Fasilitas</h2>
            <p className="text-[#525252] max-w-xl mx-auto">
              Lihat secara detail perbedaan fasilitas yang didapatkan dari masing-masing kelas.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-soft border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 md:p-6 border-b-2 border-gray-100 bg-gray-50 font-bold text-[#333333] w-1/3">
                    Fitur & Fasilitas
                  </th>
                  {roomClasses.map((rc) => (
                    <th key={rc.id} className="p-4 md:p-6 border-b-2 border-gray-100 bg-gray-50 font-bold text-center w-[22%] text-[#333333]">
                      {rc.nama_kelas}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFacilities.map((facility, idx) => (
                  <tr key={idx} className="hover:bg-[#FDF0E8]/30 transition-colors">
                    <td className="p-4 md:p-6 border-b border-gray-100 font-medium text-[#525252]">
                      {facility}
                    </td>
                    {roomClasses.map((rc) => {
                      let rcFasilitas: string[] = [];
                      try { rcFasilitas = JSON.parse(rc.fasilitas); } catch (e) {}
                      
                      const hasFacility = rcFasilitas.includes(facility);
                      
                      return (
                        <td key={rc.id} className="p-4 md:p-6 border-b border-gray-100 text-center">
                          {hasFacility ? (
                            <span className="inline-flex w-8 h-8 bg-green-100 text-green-600 rounded-full items-center justify-center font-bold">
                              ✓
                            </span>
                          ) : (
                            <span className="inline-flex w-8 h-8 bg-gray-100 text-gray-400 rounded-full items-center justify-center font-bold">
                              -
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </div>
  );
}
