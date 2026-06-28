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

      {/* Tim CATNIP Section */}
      <Section background="cream">
        <Container>
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white text-[#CC5500] text-xs font-bold tracking-wider mb-5 shadow-sm">KREATOR CATNIP</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">Tim Kami</h2>
            <p className="text-[#525252] max-w-xl mx-auto">Mengenal lebih dekat kelompok mahasiswa di balik pengembangan platform ini.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              { name: "Ahmad Syauqi Raihan", nim: "0110124241" },
              { name: "Zhahara N Sukirman", nim: "0110124206" },
              { name: "Alya Az-Zahra", nim: "0110124123" },
              { name: "Syifa Maulida Kartini", nim: "0110124104" },
              { name: "Qomariah Syifa Fadillah", nim: "0110124101" },
            ].map((member, i) => (
              <div 
                key={i} 
                className="w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.333%-2rem)] bg-white rounded-[2rem] p-8 shadow-soft hover:shadow-soft-xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-[#CC5500]/20 text-center group relative overflow-hidden"
              >
                {/* Aksen latar belakang abstrak kecil di dalam kartu */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-[#FFF5E6] to-[#FFE5D4] rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#CC5500] to-[#E8733A] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 shadow-sm">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M4 11L2 3l7 4M20 11l2-8-7 4" fill="white" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 13C2 6.5 22 6.5 22 13C22 19.5 17 22.5 12 22.5C7 22.5 2 19.5 2 13Z" fill="white"/>
                      <ellipse cx="6" cy="15" rx="2" ry="1" fill="#FF94A2" opacity="0.8"/>
                      <ellipse cx="18" cy="15" rx="2" ry="1" fill="#FF94A2" opacity="0.8"/>
                      <circle cx="8" cy="13.5" r="2.2" fill="#CC5500"/>
                      <circle cx="16" cy="13.5" r="2.2" fill="#CC5500"/>
                      <circle cx="7.2" cy="12.5" r="0.7" fill="white"/>
                      <circle cx="15.2" cy="12.5" r="0.7" fill="white"/>
                      <path d="M10.5 16.5c.5.5 1 .7 1.5 0 .5.7 1 .5 1.5 0" stroke="#CC5500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <circle cx="12" cy="15.2" r="0.6" fill="#CC5500"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#333333] text-lg mb-2 leading-tight">{member.name}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F9FAFB] border border-gray-100 rounded-full group-hover:bg-[#FFF5E6] group-hover:border-[#FFE5D4] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-[#CC5500] transition-colors">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="text-xs font-mono font-medium text-gray-500 group-hover:text-[#CC5500] transition-colors">{member.nim}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

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
