"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setPending(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setPending(false)

    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="nama@contoh.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Kata Sandi</Label>
        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/[0.06] border-white/12 text-white placeholder:text-white/60 pr-10"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-white/10"
            aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/30 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white"
      >
        <LogIn className="mr-2 size-4" />
        {pending ? "Masuk..." : "Masuk"}
      </Button>

      <p className="text-sm text-white/80">
        Belum punya akun?{" "}
        <Link
          href="/auth/register"
          className="text-blue-300 hover:text-blue-200 underline underline-offset-4"
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  )
}
