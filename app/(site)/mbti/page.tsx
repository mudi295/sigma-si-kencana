"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { mbtiQuestions, type Likert } from "@/lib/mbti"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

const scale = [
  { label: "Sangat Tidak Setuju", value: 1 as Likert },
  { label: "Tidak Setuju", value: 2 as Likert },
  { label: "Netral", value: 3 as Likert },
  { label: "Setuju", value: 4 as Likert },
  { label: "Sangat Setuju", value: 5 as Likert },
]

export default function MBTIPage() {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, Likert>>({})
  const progress = useMemo(() => Math.round((Object.keys(answers).length / mbtiQuestions.length) * 100), [answers])

  const handleChange = (id: number, value: Likert) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = () => {
    const encoded = encodeURIComponent(JSON.stringify(answers))
    router.push(`/mbti/result?answers=${encoded}`)
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">Test MBTI</h1>
        <p className="text-white/90 mt-2">Jawab minimal 10 pernyataan berikut sesuai kondisi dirimu.</p>
      </div>

      <Card className="bg-white/[0.06] border-white/12 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Kuesioner</span>
            <span className="text-sm font-normal text-white/85">{progress}% terisi</span>
          </CardTitle>
          <Progress value={progress} className="h-2 bg-white/10" />
        </CardHeader>
        <CardContent className="grid gap-5">
          {mbtiQuestions.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.02 }}
              className="rounded-lg border border-white/12 bg-white/[0.06] p-4"
            >
              <p className="font-medium">{q.id}. {q.statement}</p>
              <RadioGroup
                value={String(answers[q.id] ?? "")}
                onValueChange={(v) => handleChange(q.id, Number(v) as Likert)}
                className="mt-3 grid gap-2 sm:grid-cols-5"
              >
                {scale.map((s) => (
                  <div key={s.value} className="flex items-center space-x-2 rounded-md border border-white/12 p-2 hover:bg-white/[0.08]">
                    <RadioGroupItem id={`q${q.id}-${s.value}`} value={String(s.value)} />
                    <Label htmlFor={`q${q.id}-${s.value}`} className="text-sm">{s.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          ))}

          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < mbtiQuestions.length}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white"
            >
              Lihat Hasil
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
