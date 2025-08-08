"use client"

import { useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { computeMbti, mbtiDescriptions, type MbtiType, type Likert } from "@/lib/mbti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function MBTIResultPage() {
  const params = useSearchParams()
  const router = useRouter()
  const raw = params.get("answers")

  const parsed = useMemo(() => {
    try {
      return raw ? (JSON.parse(decodeURIComponent(raw)) as Record<number, Likert>) : {}
    } catch {
      return {}
    }
  }, [raw])

  const type: MbtiType | null = useMemo(() => {
    const keys = Object.keys(parsed)
    if (keys.length === 0) return null
    return computeMbti(parsed)
  }, [parsed])

  if (!type) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader>
            <CardTitle>Hasil Tidak Ditemukan</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-white/90">Isi kuesioner terlebih dahulu untuk melihat hasil MBTI.</p>
            <Button onClick={() => router.push("/mbti")} className="text-white">Kembali ke Test</Button>
          </CardContent>
        </Card>
      </section>
    )
  }

  const info = mbtiDescriptions[type]

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">Hasil MBTI Kamu</h1>
        <p className="text-white/90 mt-2">Tipe kepribadian berikut dapat membantumu memilih gaya belajar dan materi yang cocok.</p>
      </div>

      <Card className="bg-white/[0.06] border-white/12 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="outline" className="border-yellow-400/60 text-yellow-300">{type}</Badge>
            <span className="font-semibold">{info.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-white/90">{info.summary}</p>
          <div>
            <h3 className="font-semibold">Rekomendasi Materi:</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {info.recommendations.map((r) => (
                <li key={r}>
                  <Link
                    href="/materi"
                    className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 text-sm hover:bg-white/[0.1] transition text-white"
                  >
                    <span className="size-2 rounded-full bg-blue-300" />
                    {r}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild className="text-white">
              <Link href="/materi">Lanjut Belajar</Link>
            </Button>
            <Button asChild variant="outline" className="border-yellow-400/60 text-yellow-300">
              <Link href="/mbti">Ulangi Test</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
