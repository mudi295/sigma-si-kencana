import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

type Section = {
  heading: string
  body: string
  points?: string[]
  image?: { src: string; alt: string }
}

type Content = {
  title: string
  tag: string
  cover: string
  intro: string
  sections: Section[]
  resources: { label: string; href: string }[]
}

const db: Record<string, Content> = {
  "pendidikan-seksualitas-sehat": {
    title: "Pendidikan Seksualitas Sehat",
    tag: "Fundamental",
    cover: "/sex-education-modern-illustration-blue.png",
    intro:
      "Fondasi untuk memahami tubuh, nilai, batasan pribadi, dan persetujuan (consent). Materi ini membantu membuat keputusan yang aman dan bertanggung jawab.",
    sections: [
      {
        heading: "Memahami Tubuh & Pubertas",
        body: "Kenali perubahan fisik dan emosi pada masa pubertas serta cara merawat kesehatan reproduksi.",
        points: ["Perubahan hormon & emosi", "Kebersihan organ reproduksi", "Kapan perlu konsultasi"],
        image: { src: "/puberty-education-blue.png", alt: "Ilustrasi pubertas" },
      },
      {
        heading: "Persetujuan (Consent) & Batasan",
        body: "Consent harus jelas, berkelanjutan, tanpa paksaan, dan bisa ditarik kapan saja.",
        points: ["Consent bukan diam", "Bisa berubah pikiran", "Hormati batasan diri & orang lain"],
      },
      {
        heading: "Komunikasi Asertif",
        body: "Sampaikan kebutuhan secara jujur, jelas, dan saling menghormati.",
        points: ["Gunakan pesan 'saya'", "Fokus pada solusi", "Jaga keselamatan diri"],
      },
      {
        heading: "Mitos vs Fakta",
        body: "Luruskan informasi yang salah seputar seksualitas dan kesehatan reproduksi.",
        points: ["Mitos: 'Diam berarti setuju' → Salah", "Mitos: 'Kontrasepsi berbahaya bagi remaja' → Perlu konseling tepat"],
      },
    ],
    resources: [
      { label: "Layanan Kesehatan Remaja (PKPR)", href: "#" },
      { label: "Panduan Consent WHO", href: "#" },
    ],
  },
  "hubungan-sehat-dan-persetujuan": {
    title: "Hubungan Sehat & Persetujuan",
    tag: "Relasi",
    cover: "/healthy-youth-relationship.png",
    intro:
      "Relasi yang sehat dibangun atas rasa hormat, kepercayaan, dan batasan yang jelas. Pelajari tanda-tanda sehat dan tidak sehat (red flags).",
    sections: [
      {
        heading: "Green Flags vs Red Flags",
        body: "Kenali tanda relasi sehat dan tidak sehat untuk mencegah kekerasan dalam pacaran.",
        points: ["Menghormati batasan", "Tidak mengisolasi", "Transparansi tanpa kontrol"],
      },
      {
        heading: "Mengatasi Tekanan Teman",
        body: "Gunakan strategi 'Refuse, Explain, Avoid, Leave' saat berada di situasi tidak aman.",
        points: ["Refuse: katakan tidak", "Explain: alasanmu", "Avoid/Leave: cari tempat aman"],
      },
      {
        heading: "Rencana Keselamatan",
        body: "Siapkan kontak darurat, lokasi aman, dan dukungan teman/keluarga/layanan.",
      },
    ],
    resources: [
      { label: "Hotline Perlindungan Anak", href: "#" },
      { label: "Pusat Krisis Terdekat", href: "#" },
    ],
  },
  "kontrasepsi-dan-keluarga-berencana": {
    title: "Kontrasepsi & Keluarga Berencana",
    tag: "Kesehatan",
    cover: "/futuristic-contraception-education.png",
    intro:
      "Kontrasepsi membantu perencanaan masa depan dan mencegah kehamilan tidak diinginkan. Pelajari jenis, efektivitas, dan aksesnya.",
    sections: [
      {
        heading: "Pilihan Metode",
        body: "Pil kombinasi, suntik, implan, IUD, kondom, dan kontrasepsi darurat.",
        points: ["Efektivitas & efek samping", "Kesesuaian kondisi kesehatan", "Konseling pra-pemakaian"],
      },
      {
        heading: "Mitos vs Fakta",
        body: "Banyak salah kaprah soal kontrasepsi. Ketahui faktanya dari sumber tepercaya.",
        points: ["Kondom melindungi dari IMS", "IUD tidak menyebabkan infertil permanen"],
      },
      {
        heading: "Akses & Layanan",
        body: "Cari layanan ramah remaja (PKPR) dan konsultasi dengan tenaga kesehatan.",
      },
    ],
    resources: [
      { label: "Daftar Faskes Ramah Remaja", href: "#" },
      { label: "Panduan Kontrasepsi Nasional", href: "#" },
    ],
  },
  "tekanan-teman-dan-media-sosial": {
    title: "Tekanan Teman & Media Sosial",
    tag: "Psikososial",
    cover: "/social-media-pressure-youth-tech.png",
    intro:
      "Tekanan sebaya dan media sosial bisa memengaruhi keputusan. Pelajari cara mengelola FOMO, privasi, dan jejak digital.",
    sections: [
      {
        heading: "FOMO & Kesehatan Mental",
        body: "Kelola ekspektasi dan pahami bahwa timeline tidak mencerminkan kenyataan sepenuhnya.",
      },
      {
        heading: "Privasi & Jejak Digital",
        body: "Atur privasi akun, waspadai doxing, dan pikirkan dampak jangka panjang postingan.",
      },
      {
        heading: "Menolak Ajakan Berisiko",
        body: "Gunakan skrip singkat, alihkan topik, dan cari dukungan teman yang sehat.",
      },
    ],
    resources: [
      { label: "Panduan Keamanan Digital", href: "#" },
      { label: "Layanan Konseling Daring", href: "#" },
    ],
  },
  "hukum-budaya-dan-perlindungan": {
    title: "Hukum, Budaya, & Perlindungan",
    tag: "Konteks",
    cover: "/law-culture-youth-education.png",
    intro:
      "Pahami hak dan perlindungan hukum untuk remaja, serta bagaimana budaya berperan dalam keputusan.",
    sections: [
      {
        heading: "Hak Anak & Remaja",
        body: "Hak atas pendidikan, kesehatan, bebas dari kekerasan, dan ruang berpendapat.",
      },
      {
        heading: "Perlindungan dari Kekerasan",
        body: "Kenali jenis kekerasan dan kanal pelaporan aman.",
      },
      {
        heading: "Budaya & Norma",
        body: "Dialog dengan keluarga/komunitas untuk jembatani nilai dan kesehatan.",
      },
    ],
    resources: [
      { label: "Kanal Pelaporan Resmi", href: "#" },
      { label: "Bantuan Hukum", href: "#" },
    ],
  },
  "bantuan-dan-konseling": {
    title: "Bantuan & Konseling",
    tag: "Dukungan",
    cover: "/futuristic-youth-counseling.png",
    intro:
      "Mencari bantuan itu tanda kekuatan. Ketahui kapan perlu, ke mana harus pergi, dan hak atas kerahasiaan.",
    sections: [
      {
        heading: "Kapan Perlu Bantuan",
        body: "Saat merasa tidak aman, bingung, atau butuh klarifikasi atas informasi.",
      },
      {
        heading: "Etika & Kerahasiaan",
        body: "Tenaga profesional memegang etika kerahasiaan; pahami batas-batasnya.",
      },
      {
        heading: "Rujukan Layanan",
        body: "PKPR, konselor sekolah, psikolog, hotline resmi, dan komunitas pendukung.",
      },
    ],
    resources: [
      { label: "Direktori Layanan", href: "#" },
      { label: "Hotline Darurat", href: "#" },
    ],
  },
  "teknologi-dan-kesehatan-reproduksi": {
    title: "Teknologi & Kesehatan Reproduksi",
    tag: "Teknologi",
    cover: "/health-tech-education.png",
    intro:
      "Teknologi memudahkan edukasi dan layanan. Pelajari aplikasi pelacakan, telekonsultasi, dan keamanan data.",
    sections: [
      {
        heading: "Aplikasi Edukasi & Pelacakan",
        body: "Gunakan aplikasi tepercaya; verifikasi sumber dan kebijakan privasi.",
      },
      {
        heading: "Telekonsultasi",
        body: "Siapkan gejala dan pertanyaan sebelum konsultasi jarak jauh.",
      },
      {
        heading: "Keamanan Data",
        body: "Atur autentikasi ganda dan izin data yang minimal.",
      },
    ],
    resources: [
      { label: "Daftar Aplikasi Terverifikasi", href: "#" },
      { label: "Tips Keamanan Data", href: "#" },
    ],
  },
  "perspektif-global-dan-lokal": {
    title: "Perspektif Global & Lokal",
    tag: "Wawasan",
    cover: "/global-local-health-education.png",
    intro:
      "Pelajari praktik baik global dan adaptasi lokal agar sesuai konteks remaja Indonesia.",
    sections: [
      {
        heading: "Praktik Baik Global",
        body: "Program berbasis bukti dengan keterlibatan remaja sebagai co-creator.",
      },
      {
        heading: "Adaptasi Lokal",
        body: "Sesuaikan bahasa, contoh kasus, dan kultur.",
      },
      {
        heading: "Kolaborasi Komunitas",
        body: "Libatkan sekolah, puskesmas, dan organisasi kepemudaan.",
      },
    ],
    resources: [
      { label: "Toolkit Implementasi", href: "#" },
      { label: "Studi Kasus", href: "#" },
    ],
  },
}

export default function MateriDetailPage({ params }: { params: { slug: string } }) {
  const content = db[params.slug]
  if (!content) {
    return notFoundFallback()
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="border-yellow-400/60 text-yellow-300">{content.tag}</Badge>
        <span className="text-white/80">/</span>
        <Link href="/materi" className="text-blue-300 hover:text-blue-200 text-sm underline underline-offset-4">Kembali ke Materi</Link>
      </div>

      <h1 className="mt-3 text-3xl md:text-5xl font-extrabold">{content.title}</h1>
      <p className="mt-2 text-white/90">{content.intro}</p>

      <Card className="mt-6 bg-white/[0.06] border-white/12">
        <CardContent className="p-0">
          <Image
            src={content.cover || "/placeholder.svg?height=340&width=1280&query=futuristic%20health%20education%20cover"}
            alt={content.title}
            width={1280}
            height={340}
            className="w-full h-[220px] md:h-[340px] object-cover rounded-lg"
          />
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl md:text-2xl font-bold">Daftar Isi</h2>
        <ul className="mt-3 grid gap-2 text-sm text-white/90">
          {content.sections.map((s, idx) => (
            <li key={s.heading} className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-blue-300" />
              <a href={`#sec-${idx}`} className="hover:text-white">{s.heading}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <Accordion type="multiple" className="bg-transparent">
          {content.sections.map((s, idx) => (
            <AccordionItem key={s.heading} value={`item-${idx}`} id={`sec-${idx}`} className="border-white/12">
              <AccordionTrigger className="text-left">{s.heading}</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-3">
                  <p className="text-white/90">{s.body}</p>
                  {s.points && (
                    <ul className="list-disc pl-5 text-white/90 grid gap-1">
                      {s.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  )}
                  {s.image && (
                    <Image
                      src={s.image.src || "/placeholder.svg"}
                      alt={s.image.alt}
                      width={1200}
                      height={220}
                      className="w-full h-[200px] md:h-[260px] object-cover rounded-md"
                    />
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Rujukan & Bantuan</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {content.resources.map((r) => (
            <Link
              key={r.label}
              href={r.href}
              className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 text-sm hover:bg-white/[0.1] transition text-white"
            >
              <span className="size-2 rounded-full bg-blue-300" />
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/materi"
          className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.1] transition text-white"
        >
          ← Kembali ke daftar materi
        </Link>
      </div>
    </section>
  )
}

function notFoundFallback() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold">Materi Tidak Ditemukan</h1>
      <p className="mt-2 text-white/90">Topik yang Anda cari belum tersedia. Silakan kembali ke halaman materi.</p>
      <div className="mt-6">
        <Link
          href="/materi"
          className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.1] transition text-white"
        >
          ← Kembali ke Materi
        </Link>
      </div>
    </section>
  )
}
