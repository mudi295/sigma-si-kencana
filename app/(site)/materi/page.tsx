"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, HeartHandshake, ShieldCheck, ScrollText, Users, BadgeHelp, Cpu, Globe, FileText } from 'lucide-react'

type Topic = {
  title: string
  icon: any
  tag: string
  img: string
  slug: string
  bullets: string[]
  teaser: string
}

const topics: Topic[] = [
  {
    title: "Pendidikan Seksualitas Sehat",
    icon: BookOpen,
    tag: "Fundamental",
    img: "/sex-education-modern-illustration-blue.png",
    slug: "pendidikan-seksualitas-sehat",
    bullets: [
      "Memahami tubuh & perubahan pubertas",
      "Konsep persetujuan (consent) & batasan pribadi",
      "Komunikasi asertif & keselamatan diri"
    ],
    teaser: "Dasar-dasar seksualitas sehat untuk keputusan yang bertanggung jawab.",
  },
  {
    title: "Hubungan Sehat & Persetujuan",
    icon: HeartHandshake,
    tag: "Relasi",
    img: "/healthy-youth-relationship.png",
    slug: "hubungan-sehat-dan-persetujuan",
    bullets: [
      "Green flags vs red flags",
      "Mengelola tekanan sebaya",
      "Rencana keselamatan & bantuan"
    ],
    teaser: "Bangun relasi yang saling menghormati dengan batasan yang jelas.",
  },
  {
    title: "Kontrasepsi & Keluarga Berencana",
    icon: ShieldCheck,
    tag: "Kesehatan",
    img: "/futuristic-contraception-education.png",
    slug: "kontrasepsi-dan-keluarga-berencana",
    bullets: [
      "Pilihan metode modern",
      "Mitos vs fakta",
      "Akses layanan ramah remaja"
    ],
    teaser: "Kenali opsi kontrasepsi, efektivitas, dan cara akses layanan.",
  },
  {
    title: "Tekanan Teman & Media Sosial",
    icon: Users,
    tag: "Psikososial",
    img: "/social-media-pressure-youth-tech.png",
    slug: "tekanan-teman-dan-media-sosial",
    bullets: [
      "Mengelola FOMO",
      "Jejak digital & privasi",
      "Strategi tolak ajakan berisiko"
    ],
    teaser: "Kuasai literasi digital dan teknik menghadapi tekanan sebaya.",
  },
  {
    title: "Hukum, Budaya, & Perlindungan",
    icon: ScrollText,
    tag: "Konteks",
    img: "/law-culture-youth-education.png",
    slug: "hukum-budaya-dan-perlindungan",
    bullets: [
      "Hak anak & remaja",
      "Perlindungan dari kekerasan",
      "Kanal pelaporan & bantuan"
    ],
    teaser: "Pahami kerangka hukum dan kanal bantuan yang tersedia.",
  },
  {
    title: "Bantuan & Konseling",
    icon: BadgeHelp,
    tag: "Dukungan",
    img: "/futuristic-youth-counseling.png",
    slug: "bantuan-dan-konseling",
    bullets: [
      "Kapan perlu bantuan profesional",
      "Etika & kerahasiaan",
      "Daftar layanan rujukan"
    ],
    teaser: "Cari bantuan tepat ketika dibutuhkan—aman dan rahasia.",
  },
  {
    title: "Teknologi & Kesehatan Reproduksi",
    icon: Cpu,
    tag: "Teknologi",
    img: "/health-tech-education.png",
    slug: "teknologi-dan-kesehatan-reproduksi",
    bullets: [
      "Aplikasi edukasi & pelacakan",
      "Telekonsultasi",
      "Keamanan data"
    ],
    teaser: "Manfaatkan teknologi untuk edukasi & akses layanan.",
  },
  {
    title: "Perspektif Global & Lokal",
    icon: Globe,
    tag: "Wawasan",
    img: "/global-local-health-education.png",
    slug: "perspektif-global-dan-lokal",
    bullets: [
      "Praktik baik global",
      "Adaptasi konteks lokal",
      "Kolaborasi komunitas"
    ],
    teaser: "Belajar dari praktik baik dunia yang relevan di Indonesia.",
  },
]

export default function MateriPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">Materi Edukasi</h1>
        <p className="mt-2 text-white/90">
          Konten super lengkap, visual interaktif, dan mudah dicerna. Klik kartu untuk pratinjau atau buka materi lengkap.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <Dialog key={t.slug}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer bg-white/[0.06] border-white/12 hover:bg-white/[0.1] transition text-white">
                <CardHeader className="flex flex-row items-center gap-3">
                  <t.icon className="size-6 text-blue-300" aria-hidden />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{t.title}</CardTitle>
                  </div>
                  <Badge variant="outline" className="border-yellow-400/60 text-yellow-300">
                    {t.tag}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <Image
                    src={t.img || "/placeholder.svg?height=160&width=720&query=futuristic%20health%20education%20card"}
                    alt={t.title}
                    width={720}
                    height={360}
                    className="rounded-lg object-cover w-full h-40"
                  />
                  <p className="mt-3 text-sm text-white/85">{t.teaser}</p>
                  <ul className="mt-3 grid gap-1 text-sm text-white/85">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1 size-1.5 rounded-full bg-blue-300" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Link
                      href={`/materi/${t.slug}`}
                      className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 text-sm hover:bg-white/[0.1] transition text-white"
                    >
                      <FileText className="size-4" />
                      Lihat materi lengkap
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl bg-[#0b1026] text-white border-white/12">
              <DialogHeader>
                <DialogTitle className="text-xl">{t.title}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <Image
                  src={t.img || "/placeholder.svg?height=224&width=1200&query=futuristic%20health%20education%20header"}
                  alt={t.title}
                  width={1200}
                  height={600}
                  className="rounded-lg object-cover w-full h-56"
                />
                <p className="text-white/90">{t.teaser}</p>
                <ul className="list-disc pl-5 text-sm text-white/90 space-y-1">
                  {t.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <div>
                  <Link
                    href={`/materi/${t.slug}`}
                    className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 text-sm hover:bg-white/[0.1] transition text-white"
                  >
                    <FileText className="size-4" />
                    Buka materi lengkap
                  </Link>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  )
}
