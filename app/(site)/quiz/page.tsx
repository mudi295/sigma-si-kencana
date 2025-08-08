"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { quizBank, type QuizQuestion } from "@/lib/quiz-data"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

type AgeKey = "10-14" | "15-19" | "20-24"

export default function QuizPage() {
  const search = useSearchParams()
  const router = useRouter()
  const initialAge = (search.get("age") as AgeKey) || "10-14"
  const [age, setAge] = useState<AgeKey>(initialAge)

  useEffect(() => {
    router.replace(`/quiz?age=${age}`)
  }, [age, router])

  const tabTriggerStyle =
    "text-white data-[state=active]:bg-white data-[state=active]:text-black"

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">Quiz Interaktif</h1>
        <p className="text-white/90 mt-2">
          Pilih kategori usia. Soal dan pembahasan disesuaikan.
        </p>
      </div>

      <Tabs value={age} onValueChange={(v) => setAge(v as AgeKey)}>
        <TabsList className="grid w-full grid-cols-3 bg-white/[0.06] border border-white/12 text-white">
          <TabsTrigger value="10-14" className={tabTriggerStyle}>
            10–14 Tahun
          </TabsTrigger>
          <TabsTrigger value="15-19" className={tabTriggerStyle}>
            15–19 Tahun
          </TabsTrigger>
          <TabsTrigger value="20-24" className={tabTriggerStyle}>
            20–24 Tahun
          </TabsTrigger>
        </TabsList>

        {(["10-14", "15-19", "20-24"] as AgeKey[]).map((key) => (
          <TabsContent key={key} value={key} className="mt-6">
            <QuizRunner questions={quizBank[key]} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

function QuizRunner({ questions }: { questions: QuizQuestion[] }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)

  const progress = useMemo(
    () => Math.round((index / questions.length) * 100),
    [index, questions.length]
  )

  const current = questions[index]

  const selectOption = (i: number) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = i
      return next
    })
  }

  const next = () => {
    if (index < questions.length - 1) setIndex(index + 1)
    else setFinished(true)
  }

  const score = useMemo(() => {
    if (!finished) return 0
    let s = 0
    questions.forEach((q, i) => {
      const selected = q.options[answers[i]]
      if (selected?.isCorrect) s += 1
    })
    return s
  }, [finished, questions, answers])

  if (finished) {
    return (
      <Card className="bg-white/[0.06] border-white/12 text-white">
        <CardHeader>
          <CardTitle>Hasil Quiz</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="text-white/90">
            Skor kamu: {score} dari {questions.length}
          </p>
          <div className="grid gap-3">
            {questions.map((q, i) => {
              const chosen = answers[i]
              const op = q.options[chosen]
              const correctIndex = q.options.findIndex((o) => o.isCorrect)
              const isCorrect = op?.isCorrect
              return (
                <div
                  key={q.id}
                  className="rounded-md border border-white/12 bg-white/[0.06] p-3"
                >
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      isCorrect ? "text-green-300" : "text-red-300"
                    }`}
                  >
                    Jawaban kamu: {op ? op.text : "—"}{" "}
                    {isCorrect ? "(Benar)" : "(Kurang tepat)"}
                  </p>
                  <p className="text-white/90 text-sm mt-1">
                    Kunci: {q.options[correctIndex]?.text}
                  </p>
                  <p className="text-white/90 text-sm mt-1">
                    Pembahasan:{" "}
                    {op?.explanation ?? q.options[correctIndex]?.explanation}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setIndex(0)
                setAnswers([])
                setFinished(false)
              }}
              className="text-white"
            >
              Ulangi
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white"
            >
              <a href="/materi">Pelajari Materi Terkait</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/[0.06] border-white/12 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            Pertanyaan {index + 1} / {questions.length}
          </span>
          <span className="text-sm text-white/85">{progress}%</span>
        </CardTitle>
        <Progress value={progress} className="h-2 bg-white/10" />
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-semibold">{current.question}</p>
            <div className="mt-4 grid gap-2">
              {current.options.map((o, i) => {
                const active = answers[index] === i
                return (
                  <button
                    key={i}
                    onClick={() => selectOption(i)}
                    className={`text-left rounded-md border px-3 py-2 transition ${
                      active
                        ? "border-blue-400 bg-blue-500/15"
                        : "border-white/12 hover:bg-white/[0.08]"
                    }`}
                  >
                    {o.text}
                  </button>
                )
              })}
            </div>
            <div className="flex justify-end mt-5">
              <Button
                onClick={next}
                disabled={answers[index] === undefined}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white"
              >
                {index === questions.length - 1 ? "Selesai" : "Lanjut"}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
