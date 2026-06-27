import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Container, { Section } from "@/components/ui/Container";
import Card, { CardBody } from "@/components/ui/Card";
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

export default async function KatalogPage() {
  const roomClasses = await prisma.roomClass.findMany({
    orderBy: { id: "asc" },
  });

  // Collect all unique facilities to build the comparison matrix
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
      <Section background="charcoal" className="pt-16 pb-20">
        <Container className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Katalog Kamar</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Bandingkan dan pilih kelas kamar yang paling nyaman untuk kucing kesayangan Anda.
          </p>
        </Container>
      </Section>

      {/* Daftar Card Kelas */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomClasses.map((rc) => {
              let fasilitas: string[] = [];
              try {
                fasilitas = JSON.parse(rc.fasilitas);
              } catch (e) {}

              return (
                <Card key={rc.id} variant="default" className="flex flex-col h-full">
                  <div className="h-56 bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                      [ Foto {rc.nama_kelas} ]
                    </div>
                  </div>
                  <CardBody className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-2xl mb-2">{rc.nama_kelas}</h2>
                    <p className="text-sm text-gray-600 mb-6">{rc.deskripsi}</p>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-500">Fasilitas:</h3>
                      <ul className="space-y-2">
                        {fasilitas.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-[#CC5500] mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <div className="pt-4 border-t border-gray-100 mb-4">
                        <span className="text-xs text-gray-500 block mb-1">Harga Mulai</span>
                        <span className="text-[#CC5500] font-bold text-2xl">{formatRupiah(Number(rc.harga_domestik))}</span>
                        <span className="text-sm text-gray-500"> / hari</span>
                      </div>
                      <div className="mb-4">
                        <span className={`badge ${
                          rc.status_ketersediaan === 'tersedia' ? 'badge-available' :
                          rc.status_ketersediaan === 'hampir_penuh' ? 'badge-almost-full' : 'badge-full'
                        }`}>
                          {rc.status_ketersediaan === 'tersedia' ? `Tersedia (${rc.jumlah_kamar_tersedia})` :
                           rc.status_ketersediaan === 'hampir_penuh' ? `Hampir Penuh (${rc.jumlah_kamar_tersedia})` : 'Penuh'}
                        </span>
                      </div>
                      <Button href={`/booking?room=${rc.id}`} variant="primary" fullWidth>
                        Pilih Kelas Ini
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Tabel Perbandingan Fasilitas */}
      <Section background="cream">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Perbandingan Fasilitas</h2>
            <p className="text-gray-600">
              Lihat secara detail perbedaan fasilitas yang didapatkan dari masing-masing kelas.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl shadow-soft">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 md:p-6 border-b-2 border-gray-100 bg-gray-50 font-bold text-gray-700 w-1/3">
                    Fitur & Fasilitas
                  </th>
                  {roomClasses.map((rc) => (
                    <th key={rc.id} className="p-4 md:p-6 border-b-2 border-gray-100 bg-gray-50 font-bold text-center w-[22%]">
                      {rc.nama_kelas}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFacilities.map((facility, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 md:p-6 border-b border-gray-100 font-medium text-gray-700">
                      {facility}
                    </td>
                    {roomClasses.map((rc) => {
                      let rcFasilitas: string[] = [];
                      try { rcFasilitas = JSON.parse(rc.fasilitas); } catch (e) {}
                      
                      const hasFacility = rcFasilitas.includes(facility);
                      
                      return (
                        <td key={rc.id} className="p-4 md:p-6 border-b border-gray-100 text-center">
                          {hasFacility ? (
                            <span className="inline-flex w-8 h-8 bg-[#DCFCE7] text-[#166534] rounded-full items-center justify-center font-bold">
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
