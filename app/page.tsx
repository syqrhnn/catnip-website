import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";

function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export default async function Home() {
  const roomClasses = await prisma.roomClass.findMany({
    orderBy: { id: "asc" },
  });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div>
      {/* Hero Section */}
      <Section background="charcoal" className="relative overflow-hidden pt-20 pb-32">
        <Container className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white max-w-4xl">
            Penitipan Kucing Nyaman, Bersih, dan <span className="text-[#CC5500]">Penuh Kasih Sayang</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
            Tinggalkan rasa khawatir saat Anda bepergian. Di CATNIP, kucing kesayangan Anda mendapatkan perawatan terbaik dengan fasilitas lengkap dan staff profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/booking" variant="primary" size="lg">
              Booking Sekarang
            </Button>
            <Button href="/katalog" variant="white" size="lg">
              Lihat Fasilitas
            </Button>
          </div>
        </Container>
      </Section>

      {/* Mengapa Memilih CATNIP Section */}
      <Section background="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Memilih CATNIP?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Kami memberikan standar pelayanan tertinggi untuk kenyamanan dan kesehatan anabul Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Feeding 3x Sehari", desc: "Jadwal makan teratur dengan nutrisi terjaga sesuai kebiasaan kucing Anda." },
              { title: "Air Minum Bersih", desc: "Penyediaan air minum bersih yang diganti secara berkala setiap hari." },
              { title: "Daily Cleaning", desc: "Kandang dibersihkan setiap hari menggunakan disinfektan aman untuk hewan." },
              { title: "Kandang Nyaman", desc: "Sirkulasi udara baik dengan ukuran kandang yang luas untuk bergerak bebas." },
              { title: "Staff Berpengalaman", desc: "Ditangani oleh cat lover profesional yang mengerti karakter setiap kucing." },
              { title: "Waktu Bermain", desc: "Sesi bermain dengan mainan khusus untuk menghindari stres selama dititipkan." },
            ].map((feature, idx) => (
              <Card key={idx} variant="flat" padding="md" className="text-center border border-gray-100 hover:border-[#CC5500] transition-colors">
                <CardBody>
                  <div className="w-12 h-12 bg-[#F8D7DA] text-[#CC5500] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Ringkasan Layanan Section */}
      <Section background="cream">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pilihan Kelas Kamar</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Pilih kelas penitipan yang paling sesuai dengan kebutuhan kucing domestik maupun kucing ras kesayangan Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomClasses.map((rc) => (
              <Card key={rc.id} variant="default">
                <div className="h-48 bg-gray-200 relative">
                  {/* Placeholder for image since we don't have actual images in public/ yet */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                    [ Foto {rc.nama_kelas} ]
                  </div>
                </div>
                <CardBody className="p-6">
                  <h3 className="font-bold text-xl mb-2">{rc.nama_kelas}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{rc.deskripsi}</p>
                  <div className="mb-4">
                    <span className="text-xs text-gray-500 block mb-1">Harga Mulai</span>
                    <span className="text-[#CC5500] font-bold text-2xl">{formatRupiah(Number(rc.harga_domestik))}</span>
                    <span className="text-sm text-gray-500"> / hari</span>
                  </div>
                  <div className="mb-4">
                    <span className={`badge ${
                      rc.status_ketersediaan === 'tersedia' ? 'badge-available' :
                      rc.status_ketersediaan === 'hampir_penuh' ? 'badge-almost-full' : 'badge-full'
                    }`}>
                      {rc.status_ketersediaan === 'tersedia' ? `Tersedia (${rc.jumlah_kamar_tersedia} kamar)` :
                       rc.status_ketersediaan === 'hampir_penuh' ? `Hampir Penuh (${rc.jumlah_kamar_tersedia} kamar)` : 'Penuh'}
                    </span>
                  </div>
                  <Button href="/booking" variant="outline" fullWidth>
                    Booking Kelas Ini
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button href="/katalog" variant="secondary" size="lg">
              Lihat Detail Semua Fasilitas
            </Button>
          </div>
        </Container>
      </Section>

      {/* Testimoni Section */}
      <Section background="white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Pet Parents?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Kepercayaan Anda adalah prioritas kami. Simak pengalaman mereka yang telah menitipkan anabulnya di CATNIP.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimoni) => (
              <Card key={testimoni.id} variant="accent" padding="md">
                <CardBody>
                  <div className="flex gap-1 mb-4 text-[#F59E0B]">
                    {[...Array(testimoni.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                    {[...Array(5 - testimoni.rating)].map((_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic mb-6">"{testimoni.komentar}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#CC5500] text-white rounded-full flex items-center justify-center font-bold">
                      {testimoni.nama_tampilan.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{testimoni.nama_tampilan}</h4>
                      <p className="text-xs text-gray-500">Customer CATNIP</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
