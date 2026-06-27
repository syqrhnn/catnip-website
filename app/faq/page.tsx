import { Metadata } from "next";
import Container, { Section } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "FAQ | CATNIP",
  description: "Pertanyaan yang Sering Diajukan mengenai layanan penitipan kucing di CATNIP.",
};

const faqs = [
  {
    question: "Apa syarat utama untuk menitipkan kucing di CATNIP?",
    answer: "Kucing harus dalam keadaan sehat, bebas kutu dan jamur, serta sudah mendapatkan vaksinasi lengkap (minimal vaksin F3/Tricat). Kami mewajibkan Pet Parents membawa buku vaksin sebagai bukti pada saat check-in."
  },
  {
    question: "Apakah makanan disediakan atau harus bawa sendiri?",
    answer: "Harga penitipan sudah termasuk makanan reguler (dry food premium). Namun, jika kucing Anda memiliki kebutuhan diet khusus atau sangat sensitif terhadap pergantian makanan, kami sangat menyarankan untuk membawa makanan sendiri dari rumah."
  },
  {
    question: "Bagaimana jika kucing saya tiba-tiba sakit saat dititipkan?",
    answer: "Staff kami memantau kondisi setiap kucing secara rutin. Jika ada tanda-tanda sakit, kami akan langsung menghubungi Anda atau kontak darurat yang didaftarkan. Jika membutuhkan penanganan medis segera, kami akan membawanya ke klinik hewan rekanan kami dengan persetujuan Anda (biaya medis ditanggung pemilik)."
  },
  {
    question: "Apakah saya akan mendapatkan update kondisi kucing saya?",
    answer: "Tentu! Kami akan mengirimkan foto dan video singkat tentang aktivitas dan kondisi kucing Anda setiap hari melalui WhatsApp. Anda bisa liburan dengan tenang!"
  },
  {
    question: "Bagaimana kebijakan pembatalan (cancellation policy)?",
    answer: "Pembatalan maksimal H-3 sebelum tanggal check-in akan mendapatkan pengembalian DP (Down Payment) 100%. Pembatalan kurang dari H-3, DP akan hangus atau dapat di-reschedule maksimal 1 kali dalam kurun waktu 30 hari."
  },
  {
    question: "Jam berapa saya bisa mengantar dan menjemput kucing?",
    answer: "Proses check-in dan check-out dapat dilakukan selama jam operasional kami, yaitu setiap hari Senin - Minggu pukul 08:00 WIB hingga 20:00 WIB. Keterlambatan penjemputan melewati jam operasional tanpa konfirmasi dapat dikenakan biaya tambahan 1 hari."
  }
];

export default function FAQPage() {
  return (
    <div>
      {/* Header — warm gradient */}
      <section className="relative overflow-hidden pt-20 pb-28" style={{ background: "linear-gradient(135deg, #FFF5E6 0%, #FFE5E5 60%)" }}>
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#CC5500] opacity-5 rounded-full blur-3xl"></div>
        <Container className="text-center relative z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#333333] text-[#FFF5E6] text-xs font-bold tracking-wider mb-5">FAQ</span>
          <h1 className="text-3xl md:text-5xl font-bold text-[#333333] mb-4">Pertanyaan <span className="text-[#CC5500]">Umum</span></h1>
          <p className="text-[#525252] max-w-2xl mx-auto text-lg">
            Temukan jawaban untuk pertanyaan yang sering diajukan seputar layanan penitipan kucing kami.
          </p>
        </Container>
      </section>

      <section className="relative z-10 -mt-16 px-4 md:px-0 mb-20 min-h-[50vh]">
        <Container className="max-w-3xl">
          <div className="bg-white rounded-3xl shadow-soft-xl p-6 md:p-10 border border-gray-100">
            <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 md:p-6 font-bold cursor-pointer text-[#333333] hover:bg-[#FDF0E8]/50 transition-colors">
                  <span className="text-lg">{faq.question}</span>
                  <span className="shrink-0 transition-transform duration-300 group-open:-rotate-180 bg-[#FDF0E8] text-[#CC5500] w-8 h-8 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="p-5 md:p-6 pt-0 text-[#525252] leading-relaxed bg-white">
                  <div className="mt-2">{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>

          </div>

          <div className="mt-12 text-center p-8 bg-gradient-to-br from-[#FFF5E6] to-[#FDF0E8] rounded-3xl border border-[#FFE5E5] shadow-sm">
            <p className="text-[#333333] font-bold text-lg mb-2">Tidak menemukan jawaban yang Anda cari?</p>
            <p className="text-[#525252] mb-6">Staff kami siap membantu menjawab pertanyaan Anda.</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold bg-[#CC5500] text-white px-6 py-3 rounded-xl hover:bg-[#A84400] transition-colors shadow-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.36 2 2 0 012.88 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
              </svg>
              Chat kami via WhatsApp
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
