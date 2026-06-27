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
      <Section background="charcoal" className="pt-16 pb-20">
        <Container className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Daftar Harga</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Harga transparan tanpa biaya tersembunyi. Pilih tarif sesuai dengan jenis kucing Anda.
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-12">
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
          <div className="bg-[#FFFDD0] p-6 md:p-8 rounded-2xl border border-[#F5F0B0] flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-2">Punya kebutuhan khusus?</h3>
              <p className="text-gray-600 text-sm">
                Harga di atas sudah termasuk pakan reguler. Jika anabul Anda membutuhkan pakan khusus atau perawatan medis ringan (pemberian obat), silakan diskusikan dengan staff kami.
              </p>
            </div>
            <div className="shrink-0">
              <Button href="https://wa.me/6281234567890" variant="outline" as="a" target="_blank" rel="noopener noreferrer">
                Hubungi Kami
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
