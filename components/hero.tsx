"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Rocket, Brain, ListChecks } from 'lucide-react'
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative overflow-hidden -mt-6"> {/* naikkan hero sedikit */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_-10%,rgba(56,189,248,0.25),transparent)] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14 grid gap-10 lg:grid-cols-2 items-center"> {/* jarak vertikal dikurangi */}
        
        {/* Kiri - Teks dan Tombol */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-[1.1]"
          >
            SIGMA SI KENCANA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg md:text-xl text-white/90"
          >
            Aksi Genre Mencegah Ancaman Seks Bebas dan Pernikahan Dini Menuju Keluarga Berencana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white">
              <Link href="/materi">
                <Rocket className="mr-2 size-4" />
                Mulai Belajar
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-indigo-700 to-blue-600 hover:from-blue-500 hover:to-indigo-600 text-white">
              <Link href="/mbti">
                <Brain className="mr-2 size-4" />
                Test MBTI
              </Link>
            </Button>
            <Button asChild variant="secondary" className="bg-white/[0.08] text-white hover:bg-white/[0.12]">
              <Link href="/quiz">
                <ListChecks className="mr-2 size-4" />
                Ikuti Quiz
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Kanan - Gambar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="max-w-[460px] mx-auto mt-4 rounded-xl border border-white/15 bg-white/[0.05] backdrop-blur p-2 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
            <Image
              src="/genre.png"
              width={460}
              height={300}
              alt="Ilustrasi edukasi kesehatan futuristik"
              className="rounded-lg object-cover w-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
