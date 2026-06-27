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

const roomImages: Record<number, string> = {
  1: "/room-kelas1.png",
  2: "/room-kelas2.png",
  3: "/room-kelas3.png",
};

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
      <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-48" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 100%)" }}>
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-[#CC5500] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#FFFFFF] opacity-40 rounded-full blur-2xl"></div>
        
        <Container className="relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
            <div className="flex-1 text-center md:text-left animate-in" style={{ animationDelay: '0.1s' }}>
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#333333] text-[#FFFDD0] text-xs font-bold tracking-wider mb-6 shadow-soft">
                HOTEL KUCING PREMIUM
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#333333] leading-[1.15]">
                Penitipan Kucing Nyaman & <span className="text-[#CC5500]">Penuh Kasih</span>
              </h1>
              <p className="text-lg text-[#525252] mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Tinggalkan rasa khawatir saat Anda bepergian. Di CATNIP, anabul kesayangan Anda mendapatkan perawatan terbaik dengan fasilitas lengkap dan staff profesional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button href="/booking" variant="primary" size="lg" className="shadow-primary">
                  Booking Sekarang
                </Button>
                <Button href="/katalog" variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm hover:bg-white border-[#CC5500]/30 hover:border-[#CC5500]">
                  Lihat Fasilitas
                </Button>
              </div>
              <div className="mt-10 flex items-center justify-center md:justify-start gap-5 text-sm text-[#525252] font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span> Update Foto Harian
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span> Cat Lover Staff
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative flex justify-center w-full max-w-md md:max-w-none animate-in">
              <div className="relative w-full aspect-[3/4] md:h-[550px] max-w-md mx-auto">
                <Image 
                  src="/hero-facility.png" 
                  alt="Interior Fasilitas CATNIP" 
                  fill
                  className="object-cover rounded-[2rem] shadow-2xl z-10 border-4 border-white/50"
                  priority
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 md:bottom-12 md:-left-8 bg-white p-4 rounded-2xl shadow-soft-xl z-20 flex items-center gap-3 animate-in" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex items-center justify-center font-bold text-xl">
                  ★
                </div>
                <div>
                  <p className="font-bold text-[#333333] text-sm leading-tight">Rating 4.9/5</p>
                  <p className="text-xs text-gray-500">Dari 100+ Pet Parents</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Mengapa Memilih CATNIP Section */}
      <section className="relative z-20 -mt-16 md:-mt-24 mb-20 px-4 md:px-0">
        <Container>
          <div className="bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 lg:p-16 border border-gray-100 animate-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333]">Mengapa Memilih CATNIP?</h2>
              <p className="text-[#525252] max-w-2xl mx-auto">
                Kami memberikan standar pelayanan tertinggi untuk kenyamanan dan kesehatan anabul Anda.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {[
                { title: "Feeding 3x Sehari", desc: "Jadwal makan teratur dengan nutrisi terjaga sesuai kebiasaan kucing Anda." },
                { title: "Air Minum Bersih", desc: "Penyediaan air minum bersih yang diganti secara berkala setiap hari." },
                { title: "Daily Cleaning", desc: "Kandang dibersihkan setiap hari menggunakan disinfektan aman untuk hewan." },
                { title: "Kandang Nyaman", desc: "Sirkulasi udara baik dengan ukuran kandang yang luas untuk bergerak bebas." },
                { title: "Staff Berpengalaman", desc: "Ditangani oleh cat lover profesional yang mengerti karakter setiap kucing." },
                { title: "Waktu Bermain", desc: "Sesi bermain dengan mainan khusus untuk menghindari stres selama dititipkan." },
              ].map((feature, idx) => (
                <div key={idx} className="group p-6 rounded-2xl hover:bg-[#FDF0E8]/50 transition-colors border border-transparent hover:border-[#FDF0E8]">
                  <div className="w-14 h-14 bg-[#F8D7DA] text-[#CC5500] rounded-2xl flex items-center justify-center mb-5 font-bold text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm">
                    ✓
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#333333]">{feature.title}</h3>
                  <p className="text-sm text-[#525252] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Ringkasan Layanan Section */}
      <Section background="cream">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333]">Pilihan Kelas Kamar</h2>
            <p className="text-[#525252] max-w-2xl mx-auto">
              Pilih kelas penitipan yang paling sesuai dengan kebutuhan kucing domestik maupun kucing ras kesayangan Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomClasses.map((rc) => (
              <Card key={rc.id} variant="default" className="group">
                <div className="h-52 relative overflow-hidden">
                  <Image
                    src={roomImages[rc.id] || "/room-kelas1.png"}
                    alt={`Foto ${rc.nama_kelas}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <span className={`absolute top-4 right-4 badge ${rc.status_ketersediaan === 'tersedia' ? 'badge-available' : rc.status_ketersediaan === 'hampir_penuh' ? 'badge-almost-full' : 'badge-full'}`}>
                    {rc.status_ketersediaan === 'tersedia' ? `Tersedia (${rc.jumlah_kamar_tersedia})` : rc.status_ketersediaan === 'hampir_penuh' ? `Hampir Penuh (${rc.jumlah_kamar_tersedia})` : 'Penuh'}
                  </span>
                </div>
                <CardBody className="p-6">
                  <h3 className="font-bold text-xl mb-2 text-[#333333]">{rc.nama_kelas}</h3>
                  <p className="text-sm text-[#525252] mb-4 line-clamp-2">{rc.deskripsi}</p>
                  <div className="mb-5 pt-4 border-t border-gray-100">
                    <span className="text-xs text-[#525252] block mb-1">Harga Mulai</span>
                    <span className="text-[#CC5500] font-bold text-2xl">{formatRupiah(Number(rc.harga_domestik))}</span>
                    <span className="text-sm text-[#525252]"> / hari</span>
                  </div>
                  <Button href="/booking" variant="primary" fullWidth>
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
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #FFE5E5 0%, #FFF5E6 100%)" }}>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-[#CC5500] opacity-5 rounded-full blur-3xl"></div>
        <Container className="relative z-10 py-20 md:py-24">
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white text-[#CC5500] text-xs font-bold tracking-wider mb-5 shadow-sm">TESTIMONI</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333]">Apa Kata Pet Parents?</h2>
            <p className="text-[#525252] max-w-2xl mx-auto">
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
      </section>
    </div>
  );
}
