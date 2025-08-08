"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Compass, Brain, Users } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

export default function MBTIPreview() {
  const samples = [
    {
      type: "ENFP",
      desc: "Kreatif, antusias, peduli dengan nilai. Cocok belajar lewat diskusi dan proyek kolaboratif.",
      icon: <Compass className="size-5 text-blue-300" aria-hidden />,
    },
    {
      type: "ENTJ",
      desc: "Pemimpin visioner, logis, tegas. Suka struktur dan target jelas.",
      icon: <Brain className="size-5 text-blue-300" aria-hidden />,
    },
    {
      type: "ISFJ",
      desc: "Penjaga nilai, suportif, teliti. Nyaman dengan materi terstruktur dan praktis.",
      icon: <Users className="size-5 text-blue-300" aria-hidden />,
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 text-center">
        <h3 className="text-xl md:text-2xl font-semibold">Preview Test MBTI</h3>
        <p className="text-white/90 mt-1">Kenali gaya belajar dan rekomendasi materi sesuai kepribadianmu.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {samples.map((s, i) => (
          <motion.div
            key={s.type}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card className="bg-white/[0.06] border-white/12 backdrop-blur hover:bg-white/[0.1] transition text-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {s.icon}
                    <div className="text-lg font-bold">{s.type}</div>
                  </div>
                  <div className="rounded-md border border-yellow-400/60 text-yellow-300 text-xs px-2 py-0.5">
                    Contoh
                  </div>
                </div>
                <p className="text-sm text-white/90 mt-3">{s.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          href="/mbti"
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.1] transition text-white"
        >
          Ikuti Test MBTI
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  )
}
