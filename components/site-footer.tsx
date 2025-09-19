import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, Shield } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-white/15 bg-gradient-to-b from-transparent to-[#0a122f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-4">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="" className="w-8 h-8" />
            <span className="font-bold">SIGMA SI KENCANA</span>
          </div>
          <p className="mt-3 text-sm text-white/85">
            Aksi Genre Mencegah Ancaman Seks Bebas dan Pernikahan Dini menuju Keluarga Berencana.
            Edukasi kesehatan remaja yang modern, terpercaya, dan relevan.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Navigasi</h4>
          <ul className="text-sm space-y-2">
            <li><Link href="/materi" className="text-white/90 hover:text-white">Materi Edukasi</Link></li>
            <li><Link href="/mbti" className="text-white/90 hover:text-white">Test MBTI</Link></li>
            <li><Link href="/quiz" className="text-white/90 hover:text-white">Quiz Interaktif</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Kontak</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2 text-white/90">
              <Mail className="size-4" /> muhamadhamudi08@gmail.com
            </li>
            <li className="flex items-center gap-2 text-white/90">
              <Phone className="size-4" /> +62 8810-1125-8484
            </li>
          </ul>
          <div className="flex gap-3 mt-4">
            <Link aria-label="Facebook" target="_blank" href="https://www.facebook.com/mhmd.hamudi.2025?mibextid=ZbWKwL" className="p-2 rounded-md bg-white/[0.06] hover:bg-white/[0.12] transition text-white">
              <Facebook className="size-4" />
            </Link>
            <Link aria-label="Instagram" target="_blank" href="https://www.instagram.com/mhmdhamudiii_?igsh=MTh0cXR5M3dnYTVrcQ==" className="p-2 rounded-md bg-white/[0.06] hover:bg-white/[0.12] transition text-white">
              <Instagram className="size-4" />
            </Link>
          </div>
          <p className="text-sm mt-2">Animated by: <a target="_blank" href="https://www.instagram.com/novaripakev?igsh=MTJ2OWp3eHVtMzM3aQ=="><i>Elang Novari Alam</i></a></p>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-4 text-xs text-white/85">
          © {new Date().getFullYear()} SIGMA SI KENCANA. All rights reserved. Muhamad Hamudi | Duta Genre Kota Sukabumi
        </p>
      </div>
    </footer>
  )
}
