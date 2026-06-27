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
      <Section background="charcoal" className="pt-16 pb-20">
        <Container className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Tentang CATNIP</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Mengenal lebih dekat rumah kedua bagi kucing kesayangan Anda.
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 relative overflow-hidden">
                 {/* Placeholder for actual image */}
                 [ Foto Fasilitas CATNIP ]
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-[#CC5500]">Cerita Kami</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Berawal dari kecintaan kami terhadap anabul, CATNIP didirikan untuk menjawab kebutuhan para Pet Parents yang sering merasa khawatir saat harus meninggalkan kucing kesayangan mereka untuk bepergian.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami memahami bahwa kucing bukan sekadar hewan peliharaan, melainkan bagian dari keluarga. Oleh karena itu, kami merancang fasilitas penitipan yang tidak hanya aman, tetapi juga nyaman dan meminimalisir stres pada kucing.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Dengan pengawasan staff profesional, kebersihan yang terjaga ketat, serta asupan nutrisi yang tepat, kami berkomitmen untuk memberikan pengalaman menginap terbaik—layaknya di rumah sendiri.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="cream">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-[#FDF0E8] rounded-full flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CC5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12A10 10 0 0122 12A10 10 0 012 12Z"/>
                  <path d="M12 2A15.3 15.3 0 0112 22A15.3 15.3 0 0112 2Z"/>
                  <path d="M2 12H22"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Visi Kami</h3>
              <p className="text-gray-600">
                Menjadi pet boarding & cat hotel pilihan utama yang paling dipercaya oleh Pet Parents di seluruh Indonesia, berkat standar pelayanan berkelas dan kepedulian tulus terhadap kesejahteraan hewan.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-soft">
              <div className="w-16 h-16 bg-[#FDF0E8] rounded-full flex items-center justify-center mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CC5500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22l-10-5V7l10 5 10-5v10l-10 5z"/>
                  <path d="M12 22l-10-5V7l10-5 10 5v10l-10 5z"/>
                  <path d="M12 12l10-5"/>
                  <path d="M12 12v10"/>
                  <path d="M12 12L2 7"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
              <ul className="text-gray-600 space-y-3 list-disc pl-5">
                <li>Menyediakan fasilitas penginapan yang bersih, aman, dan nyaman untuk berbagai ras kucing.</li>
                <li>Menjaga asupan nutrisi dan kesehatan setiap anabul yang dititipkan.</li>
                <li>Memberikan pelayanan yang transparan, komunikatif, dan responsif kepada pelanggan.</li>
                <li>Meningkatkan edukasi kesejahteraan hewan bagi komunitas Pet Parents.</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
