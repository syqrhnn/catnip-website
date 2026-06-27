import { Metadata } from "next";
import Image from "next/image";
import Container, { Section } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Tentang Kami | CATNIP",
  description: "Pelajari lebih lanjut tentang CATNIP, pet boarding dan cat hotel terpercaya untuk kucing kesayangan Anda.",
};

export default function TentangPage() {
  return (
    <div>
      {/* Header — warm gradient */}
      <section className="relative overflow-hidden pt-20 pb-28" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 60%)" }}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#CC5500] opacity-5 rounded-full blur-3xl"></div>
        <Container className="text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#333333] text-[#FFF5E6] text-xs font-bold tracking-wider mb-5">TENTANG KAMI</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4">Mengenal <span className="text-[#CC5500]">CATNIP</span></h1>
          <p className="text-[#525252] max-w-2xl mx-auto text-lg">
            Rumah kedua bagi kucing kesayangan Anda — tempat di mana kenyamanan, kebersihan, dan kasih sayang menjadi prioritas utama.
          </p>
        </Container>
      </section>

      {/* Cerita Kami — overlap card */}
      <section className="relative z-10 -mt-16 px-4 md:px-0 mb-16">
        <Container>
          <div className="bg-white rounded-3xl shadow-soft-xl p-8 md:p-12 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-soft relative">
                  <Image
                    src="/about-facility.png"
                    alt="Fasilitas CATNIP Cat Hotel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Floating stat badge */}
                <div className="absolute -bottom-4 -right-4 md:-right-6 bg-[#CC5500] text-white p-4 rounded-2xl shadow-primary z-10">
                  <p className="text-2xl font-bold leading-none">100+</p>
                  <p className="text-xs opacity-90 mt-1">Kucing Bahagia</p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-[#CC5500]">Cerita Kami</h2>
                <p className="text-[#525252] mb-4 leading-relaxed">
                  Berawal dari kecintaan kami terhadap anabul, CATNIP didirikan untuk menjawab kebutuhan para Pet Parents yang sering merasa khawatir saat harus meninggalkan kucing kesayangan mereka untuk bepergian.
                </p>
                <p className="text-[#525252] mb-4 leading-relaxed">
                  Kami memahami bahwa kucing bukan sekadar hewan peliharaan, melainkan bagian dari keluarga. Oleh karena itu, kami merancang fasilitas penitipan yang tidak hanya aman, tetapi juga nyaman dan meminimalisir stres pada kucing.
                </p>
                <p className="text-[#525252] leading-relaxed">
                  Dengan pengawasan staff profesional, kebersihan yang terjaga ketat, serta asupan nutrisi yang tepat, kami berkomitmen untuk memberikan pengalaman menginap terbaik—layaknya di rumah sendiri.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Row */}
      <Section background="white" className="py-12">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "3+", label: "Tahun Berpengalaman" },
              { num: "100+", label: "Kucing Dilayani" },
              { num: "4.9", label: "Rating Rata-rata" },
              { num: "24/7", label: "Pengawasan CCTV" },
            ].map((stat, i) => (
              <div key={i} className="group p-6 rounded-2xl hover:bg-[#FDF0E8]/50 transition-colors">
                <p className="text-4xl md:text-5xl font-bold text-[#CC5500] mb-2 group-hover:scale-110 transition-transform">{stat.num}</p>
                <p className="text-sm text-[#525252] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Visi Misi */}
      <Section background="cream">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">Visi & Misi</h2>
            <p className="text-[#525252] max-w-xl mx-auto">Komitmen kami untuk memberikan pelayanan terbaik bagi kucing dan pemiliknya.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-white p-8 md:p-10 rounded-2xl shadow-soft border border-transparent hover:border-[#CC5500]/20 transition-all hover:shadow-soft-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC5500] to-[#E8733A] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#333333]">Visi Kami</h3>
              <p className="text-[#525252] leading-relaxed">
                Menjadi pet boarding & cat hotel pilihan utama yang paling dipercaya oleh Pet Parents di seluruh Indonesia, berkat standar pelayanan berkelas dan kepedulian tulus terhadap kesejahteraan hewan.
              </p>
            </div>
            <div className="group bg-white p-8 md:p-10 rounded-2xl shadow-soft border border-transparent hover:border-[#CC5500]/20 transition-all hover:shadow-soft-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#CC5500] to-[#E8733A] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-primary">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#333333]">Misi Kami</h3>
              <ul className="text-[#525252] space-y-3 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  Menyediakan fasilitas penginapan yang bersih, aman, dan nyaman untuk berbagai ras kucing.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  Menjaga asupan nutrisi dan kesehatan setiap anabul yang dititipkan.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  Memberikan pelayanan yang transparan, komunikatif, dan responsif kepada pelanggan.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs shrink-0 mt-0.5">✓</span>
                  Meningkatkan edukasi kesejahteraan hewan bagi komunitas Pet Parents.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
