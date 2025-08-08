"use client"

import AuthCard from "@/components/auth/auth-card"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const { supabaseReady } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const supabase = getSupabaseBrowser()
    if (!supabase) {
      setError("Supabase belum dikonfigurasi. Tambahkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.")
      return
    }
    setPending(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setPending(false)
    if (err) {
      setError(err.message)
      return
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    const role = profile?.role as "admin" | "member" | "konselor" | undefined
    if (role === "admin") router.replace("/admin")
    else if (role === "konselor") router.replace("/konselor")
    else router.replace("/")
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_80%_-10%,rgba(56,189,248,0.25),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 grid gap-8 lg:grid-cols-2 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <AuthCard title="Masuk" subtitle="Akses materi, quiz, dan dashboard sesuai peran.">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nama@contoh.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60" required disabled={!supabaseReady} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60" required disabled={!supabaseReady} />
              </div>
              {error ? <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-md px-3 py-2">{error}</p> : null}
              <Button type="submit" disabled={pending || !supabaseReady} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white">
                {pending ? "Masuk..." : "Masuk"}
              </Button>
            </form>
            <p className="mt-4 text-sm text-white/80">
              Belum punya akun? <Link href="/auth/register" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">Daftar</Link>
            </p>
          </AuthCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur p-3 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
            <Image src="/futuristic-health-education.png" alt="Ilustrasi login futuristik" width={900} height={600} className="rounded-xl object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
