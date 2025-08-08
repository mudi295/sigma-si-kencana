"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [role, setRole] = useState("member")
  const [agree, setAgree] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password.length < 6) {
      return setError("Kata sandi minimal 6 karakter.")
    }

    if (password !== confirm) {
      return setError("Konfirmasi kata sandi tidak cocok.")
    }

    if (!agree) {
      return setError("Anda harus menyetujui ketentuan penggunaan.")
    }

    setPending(true)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    })

    setPending(false)

    if (signUpError) {
      return setError(signUpError.message)
    }

    router.push("/materi")
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nama Lengkap</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/[0.06] border-white/12 text-white"
          placeholder="Nama Anda"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/[0.06] border-white/12 text-white"
          placeholder="nama@contoh.com"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Kata Sandi</Label>
        <div className="relative">
          <Input
            id="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            placeholder="••••••••"
            className="bg-white/[0.06] border-white/12 text-white pr-10"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="confirm">Konfirmasi Kata Sandi</Label>
        <Input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          placeholder="Ulangi kata sandi"
          className="bg-white/[0.06] border-white/12 text-white"
        />
      </div>

      <div className="grid gap-2">
        <Label>Peran</Label>
        <RadioGroup
          value={role}
          onValueChange={(v) => setRole(v)}
          className="grid grid-cols-2 gap-2"
        >
          <label className="flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 cursor-pointer">
            <RadioGroupItem value="member" id="member" /> Member
          </label>
          <label className="flex items-center gap-2 rounded-md border border-white/12 bg-white/[0.06] px-3 py-2 cursor-pointer">
            <RadioGroupItem value="konselor" id="konselor" /> Konselor
          </label>
        </RadioGroup>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox id="agree" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
        <Label htmlFor="agree" className="text-sm text-white/85">
          Saya setuju dengan ketentuan penggunaan dan kebijakan privasi.
        </Label>
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
        <UserPlus className="mr-2 size-4" />
        {pending ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  )
}
