"use client"

import AuthCard from "@/components/auth/auth-card"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { AppRole } from "@/context/auth-provider"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-provider"

export default function RegisterPage() {
  const router = useRouter()
  const { supabaseReady } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [role, setRole] = useState<AppRole>("member")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError("Konfirmasi kata sandi tidak cocok.")
      return
    }
    const supabase = getSupabaseBrowser()
    if (!supabase) {
      setError("Supabase belum dikonfigurasi. Tambahkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.")
      return
    }
    setPending(true)
    const { data, error: signErr } = await supabase.auth.signUp({ email, password })
    if (signErr) {
      setPending(false)
      setError(signErr.message)
      return
    }
    const uid = data.user?.id
    // Only allow "member" or "konselor" at signup
    const safeRole: "member" | "konselor" = role === "konselor" ? "konselor" : "member"
    if (uid) {
      await supabase.from("profiles").upsert({ id: uid, name, role: safeRole, counselor_id: null }).eq("id", uid)
    }
    setPending(false)
    if (safeRole === "konselor") router.replace("/konselor")
    else router.replace("/")
  }

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_-10%,rgba(56,189,248,0.25),transparent)]" />
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 grid gap-8 lg:grid-cols-2 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <AuthCard title="Daftar" subtitle="Buat akun untuk pengalaman belajar yang lebih personal.">
            <form onSubmit={onSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input id="name" placeholder="Nama Anda" value={name} onChange={(e) => setName(e.target.value)} className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60" required disabled={!supabaseReady} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nama@contoh.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60" required disabled={!supabaseReady} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60" required minLength={6} disabled={!supabaseReady} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm">Konfirmasi Kata Sandi</Label>
                <Input id="confirm" type="password" placeholder="Ulangi kata sandi" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60" required disabled={!supabaseReady} />
              </div>
              <div className="grid gap-2">
                <Label>Peran</Label>
                <RadioGroup value={role} onValueChange={(v) => setRole(v as AppRole)} className="grid grid-cols-2 gap-2">
                  <label htmlFor="role-member" className="flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 hover:bg-white/[0.1] cursor-pointer">
                    <RadioGroupItem id="role-member" value="member" /> <span className="text-sm">Member</span>
                  </label>
                  <label htmlFor="role-konselor" className="flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 hover:bg-white/[0.1] cursor-pointer">
                    <RadioGroupItem id="role-konselor" value="konselor" /> <span className="text-sm">Konselor</span>
                  </label>
                </RadioGroup>
              </div>
              {error ? <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-md px-3 py-2">{error}</p> : null}
              <Button type="submit" disabled={pending || !supabaseReady} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white">
                {pending ? "Mendaftar..." : "Daftar"}
              </Button>
            </form>
            <p className="mt-4 text-sm text-white/80">
              Sudah punya akun? <Link href="/auth/login" className="text-blue-300 hover:text-blue-200 underline underline-offset-4">Masuk</Link>
            </p>
          </AuthCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
          <div className="rounded-2xl border border-white/12 bg-white/[0.06] backdrop-blur p-3 shadow-[0_0_60px_rgba(59,130,246,0.15)]">
            <Image src="/futuristic-health-education.png" alt="Ilustrasi registrasi futuristik" width={900} height={600} className="rounded-xl object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
