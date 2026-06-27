import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container, { Section } from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Berhasil | CATNIP",
};

export default async function BookingSuccessPage({ params }: { params: { id: string } }) {
  const bookingId = parseInt(params.id);

  if (isNaN(bookingId)) {
    notFound();
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: true,
      cat: true,
      room_class: true,
    }
  });

  if (!booking) {
    notFound();
  }

  return (
    <Section background="cream" className="min-h-[85vh] py-12 flex items-center">
      <Container className="max-w-2xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-soft text-center border-t-8 border-[#CC5500]">
          
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-[#333333] mb-2">Booking Berhasil Dibuat!</h1>
          <p className="text-gray-500 mb-8">
            Terima kasih telah mempercayakan anabul Anda kepada CATNIP. Reservasi Anda sedang dalam status <b>Menunggu Konfirmasi</b> oleh tim kami.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 text-left border border-gray-100 mb-8 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <span className="text-gray-500">ID Booking</span>
              <span className="font-bold">#CTNP-{booking.id.toString().padStart(4, '0')}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
              <div>
                <span className="block text-sm text-gray-500 mb-1">Nama Pemilik</span>
                <span className="font-semibold">{booking.user?.nama || "Guest"}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Nama Kucing</span>
                <span className="font-semibold">{booking.cat.nama_kucing} ({booking.cat.jenis_kucing})</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
              <div>
                <span className="block text-sm text-gray-500 mb-1">Kelas Kamar</span>
                <span className="font-semibold">{booking.room_class.nama_kelas}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Logistik</span>
                <span className="font-semibold">{booking.logistik === 'jemput' ? 'Jemput ke Rumah' : 'Antar Sendiri'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
              <div>
                <span className="block text-sm text-gray-500 mb-1">Check-in</span>
                <span className="font-semibold">{booking.tanggal_checkin.toLocaleDateString('id-ID')}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 mb-1">Check-out</span>
                <span className="font-semibold">{booking.tanggal_checkout.toLocaleDateString('id-ID')}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-600 font-bold">Total Biaya ({booking.metode_pembayaran.toUpperCase()})</span>
              <span className="text-2xl font-bold text-[#CC5500]">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(booking.total_biaya))}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" variant="outline" as="a">
              Kembali ke Beranda
            </Button>
            <Button href="https://wa.me/6281234567890" variant="primary" as="a" target="_blank" rel="noopener noreferrer">
              Konfirmasi via WhatsApp
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
