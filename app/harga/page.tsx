import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Daftar Harga | CATNIP",
  description: "Daftar harga penitipan kucing di CATNIP Pet Boarding berdasarkan kelas kamar dan jenis kucing.",
};

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default async function HargaPage() {
  const roomClasses = await prisma.roomClass.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div>
      {/* Header — warm gradient */}
      <section className="relative overflow-hidden pt-20 pb-28" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 60%)" }}>
        <div className="absolute top-0 left-0 -ml-32 -mt-32 w-96 h-96 bg-[#CC5500] opacity-5 rounded-full blur-3xl"></div>
        <Container className="text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#333333] text-[#FFF5E6] text-xs font-bold tracking-wider mb-5">DAFTAR HARGA</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4">Harga <span className="text-[#CC5500]">Transparan</span></h1>
          <p className="text-[#525252] max-w-2xl mx-auto text-lg">
            Tanpa biaya tersembunyi. Pilih tarif yang sesuai dengan jenis kucing kesayangan Anda.
          </p>
        </Container>
      </section>

      <section className="relative z-10 -mt-16 px-4 md:px-0 mb-20">
        <Container>
          <div className="bg-white rounded-3xl shadow-soft-xl overflow-hidden border border-gray-100 mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr>
                    <th className="p-5 md:p-8 border-b-2 border-gray-100 bg-[#FDF0E8] w-1/3">
                      <h2 className="font-bold text-xl text-[#CC5500]">Kelas Kamar</h2>
                    </th>
                    <th className="p-5 md:p-8 border-b-2 border-gray-100 bg-gray-50">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                          🐱
                        </div>
                        <h2 className="font-bold text-xl">Kucing Domestik</h2>
                      </div>
                      <p className="text-sm text-gray-500 font-normal">Kucing kampung / lokal</p>
                    </th>
                    <th className="p-5 md:p-8 border-b-2 border-gray-100 bg-gray-50 border-l border-gray-100">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                          👑
                        </div>
                        <h2 className="font-bold text-xl">Kucing Ras</h2>
                      </div>
                      <p className="text-sm text-gray-500 font-normal">Anggora, Persia, BSH, dll</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roomClasses.map((rc, idx) => (
                    <tr key={rc.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-5 md:p-8 border-b border-gray-100 align-top">
                        <h3 className="font-bold text-lg mb-1">{rc.nama_kelas}</h3>
                        <p className="text-sm text-gray-500">{rc.deskripsi.substring(0, 80)}...</p>
                      </td>
                      <td className="p-5 md:p-8 border-b border-gray-100 align-top">
                        <span className="text-2xl font-bold text-[#333333]">
                          {formatRupiah(Number(rc.harga_domestik))}
                        </span>
                        <span className="text-gray-500 text-sm"> / hari</span>
                      </td>
                      <td className="p-5 md:p-8 border-b border-gray-100 border-l border-gray-100 align-top">
                        <span className="text-2xl font-bold text-[#333333]">
                          {formatRupiah(Number(rc.harga_ras))}
                        </span>
                        <span className="text-gray-500 text-sm"> / hari</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FDF0E8] p-8 md:p-10 rounded-3xl border border-[#FFE5E5] shadow-sm flex flex-col md:flex-row gap-8 md:items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-full bg-white text-[#CC5500] flex items-center justify-center font-bold shadow-sm">!</span>
                <h3 className="font-bold text-xl text-[#333333]">Punya kebutuhan khusus?</h3>
              </div>
              <p className="text-[#525252] leading-relaxed max-w-2xl">
                Harga di atas sudah termasuk pakan reguler. Jika anabul Anda membutuhkan pakan khusus atau perawatan medis ringan (pemberian obat), silakan diskusikan dengan staff kami terlebih dahulu.
              </p>
            </div>
            <div className="shrink-0">
              <Button href="https://wa.me/6281234567890" variant="primary" as="a" target="_blank" rel="noopener noreferrer" className="shadow-primary">
                Hubungi Kami via WA
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
