import Hero from "@/components/hero"
import FuturisticCard from "@/components/futuristic-card"
import SectionHeader from "@/components/section-header"
import Image from "next/image"
import { HeartPulse, ShieldCheck, GraduationCap, Medal, Compass, Sparkles } from 'lucide-react'
import Link from "next/link"

export default function Page() {
const features = [
  {
    title: "Pencegahan Seks Berisiko",
    desc: "Pemahaman komprehensif tentang batasan sehat, persetujuan, dan perlindungan diri.",
    icon: HeartPulse,
  },
  {
    title: "Cegah Pernikahan Dini",
    desc: "Dampak psikologis, sosial, dan kesehatan serta jalur dukungan yang tepat.",
    icon: ShieldCheck,
  },
  {
    title: "Keluarga Berencana",
    desc: "Kontrasepsi modern, mitos vs fakta, dan akses layanan kesehatan remaja.",
    icon: GraduationCap,
  },
  {
    title: "Kembangkan Potensi",
    desc: "Pemetaan minat dan bakat dengan pendekatan MBTI yang relevan.",
    icon: Medal,
  },
]

const ageCards = [
  {
    age: "10–14",
    href: "/quiz?age=10-14",
    placeholder: "/futuristic-kids-learning.png",
    accent: "Dasar Nilai",
  },
  {
    age: "15–19",
    href: "/quiz?age=15-19",
    placeholder: "/teenagers-education-technology-blue-illustration.png",
    accent: "Pilihan Sehat",
  },
  {
    age: "20–24",
    href: "/quiz?age=20-24",
    placeholder: "/futuristic-health-education.png",
    accent: "Tanggung Jawab",
  },
]

return (
  <>
    <Hero />

    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <SectionHeader
        title="Materi Edukasi Komprehensif"
        subtitle="Dirancang oleh pakar dan disusun dengan visual interaktif agar mudah dipahami."
        accent="Highlight Materi"
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <FuturisticCard key={f.title} className="p-5">
            <div className="flex items-start gap-3">
              <f.icon className="size-6 text-blue-300" aria-hidden />
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm text-white/90 mt-1">{f.desc}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/materi"
                className="text-xs text-blue-300 hover:text-blue-200 transition underline underline-offset-4"
              >
                Baca materi
              </Link>
            </div>
          </FuturisticCard>
        ))}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <SectionHeader
        title="Pilih Quiz Sesuai Usia"
        subtitle="Materi dan pembahasan disesuaikan dengan tahap perkembanganmu."
        accent="Quiz Usia"
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {ageCards.map((a) => (
          <FuturisticCard key={a.age} className="overflow-hidden">
            <div className="relative">
              <Image
                src={a.placeholder || "/placeholder.svg"}
                alt={`Quiz usia ${a.age}`}
                width={700}
                height={220}
                className="w-full h-[220px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1026] via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-white/12 bg-white/[0.06] px-2 py-0.5 text-xs text-white/90">{a.accent}</span>
                <Sparkles className="size-4 text-yellow-300" aria-hidden />
              </div>
              <h3 className="mt-2 text-xl font-semibold">
                {a.age} Tahun
              </h3>
              <p className="text-sm text-white/90 mt-1">Soal relevan + pembahasan detail.</p>
              <Link
                href={a.href}
                className="mt-4 inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition underline underline-offset-4"
              >
                Mulai Quiz
                <Compass className="size-4" aria-hidden />
              </Link>
            </div>
          </FuturisticCard>
        ))}
      </div>
    </section>
  </>
)
}
