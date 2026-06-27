import { Metadata } from "next";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Kontak | CATNIP",
  description: "Hubungi CATNIP untuk informasi lebih lanjut mengenai layanan penitipan kucing kami.",
};

export default function KontakPage() {
  return (
    <div>
      <Section background="charcoal" className="pt-16 pb-20">
        <Container className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Hubungi Kami</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Punya pertanyaan seputar fasilitas atau ingin berkonsultasi tentang kondisi kucing Anda? Tim kami siap membantu.
          </p>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Info Kontak */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex shrink-0 items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Alamat</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      Jl. Contoh No. 123, Kel. Suka Kucing, Kec. Meow, Kota Fiktif, Indonesia 12345
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex shrink-0 items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 12 19.79 19.79 0 01.88 3.36 2 2 0 012.88 1.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 9a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.02z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Telepon / WhatsApp</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      +62 812-3456-7890
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex shrink-0 items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      halo@catnip.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#FDF0E8] text-[#CC5500] rounded-full flex shrink-0 items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Jam Operasional</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Senin – Minggu: 08.00 – 20.00 WIB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Pesan */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <h2 className="text-2xl font-bold mb-2">Kirim Pesan</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Isi form di bawah ini dan tim kami akan segera membalas pesan Anda.
                </p>

                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="form-label">Nama Lengkap</label>
                      <input type="text" id="name" className="form-input" placeholder="Budi Santoso" required />
                    </div>
                    <div>
                      <label htmlFor="phone" className="form-label">Nomor Telepon</label>
                      <input type="tel" id="phone" className="form-input" placeholder="0812xxxxxx" required />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Email (Opsional)</label>
                    <input type="email" id="email" className="form-input" placeholder="budi@email.com" />
                  </div>

                  <div>
                    <label htmlFor="subject" className="form-label">Subjek</label>
                    <select id="subject" className="form-input bg-white">
                      <option value="pertanyaan">Pertanyaan Umum</option>
                      <option value="booking">Informasi Booking</option>
                      <option value="kerjasama">Kerjasama</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">Pesan</label>
                    <textarea id="message" rows={5} className="form-input resize-y" placeholder="Tulis pesan Anda di sini..." required></textarea>
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    Kirim Pesan Sekarang
                  </Button>
                </form>
              </div>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
