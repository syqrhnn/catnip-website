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
      <Section background="charcoal" className="pt-16 pb-20">
        <Container className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">FAQ</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Pertanyaan yang sering diajukan seputar layanan penitipan kucing kami.
          </p>
        </Container>
      </Section>

      <Section background="white" className="min-h-[50vh]">
        <Container className="max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-5 font-bold cursor-pointer text-gray-800 hover:bg-gray-50 transition-colors">
                  <span className="text-lg">{faq.question}</span>
                  <span className="shrink-0 transition-transform duration-300 group-open:-rotate-180 bg-[#FDF0E8] text-[#CC5500] w-8 h-8 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                  <div className="mt-4">{faq.answer}</div>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center p-6 bg-[#FDF0E8] rounded-2xl">
            <p className="text-gray-700 font-medium mb-3">Tidak menemukan jawaban yang Anda cari?</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-[#CC5500] hover:text-[#A84400] transition-colors">
              Chat kami via WhatsApp
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
