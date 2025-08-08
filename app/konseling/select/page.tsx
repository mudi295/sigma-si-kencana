"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import { useAuth } from "@/context/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Users } from 'lucide-react'

type Counselor = { id: string; name: string | null; assigned: number }

export default function SelectCounselorPage() {
  const { user, profile } = useAuth()
  const [list, setList] = useState<Counselor[]>([])
  const [pending, setPending] = useState<string | null>(null)

  const load = async () => {
    const supabase = supabaseBrowser()
    const { data } = await supabase.rpc("list_counselors_with_load")
    setList((data as Counselor[]) || [])
  }

  useEffect(() => { load() }, [])

  const choose = async (counselor_id: string) => {
    if (!user) return
    setPending(counselor_id)
    const res = await fetch("/api/assign-counselor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member_id: user.id, counselor_id }),
    })
    setPending(null)
    if (res.ok) {
      alert("Konselor berhasil dipilih.")
      location.href = "/"
    } else {
      const j = await res.json().catch(() => ({}))
      alert(j.error || "Gagal memilih konselor.")
    }
  }

  if (profile?.role !== "member") {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12">
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle>Khusus Member</CardTitle></CardHeader>
          <CardContent>Halaman ini untuk memilih konselor.</CardContent>
        </Card>
      </section>
    )
  }

  // if already selected
  if (profile?.counselor_id) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12">
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle>Konselor Sudah Dipilih</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-green-300" />
            Kamu sudah memilih konselor. Hubungi via menu Konseling.
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold">Pilih Konselor</h1>
      <p className="text-white/85 mt-2">Pilih satu konselor. Maksimal 5 member per konselor.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {list.map((c) => (
          <Card key={c.id} className="bg-white/[0.06] border-white/12 text-white">
            <CardHeader><CardTitle className="flex items-center gap-2"><Users className="size-4 text-blue-300" /> {c.name || "Konselor"}</CardTitle></CardHeader>
            <CardContent>
              <p className="text-white/85 text-sm">Terbeban: {c.assigned}/5</p>
              <Button
                disabled={pending === c.id || c.assigned >= 5}
                onClick={() => choose(c.id)}
                className="mt-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white disabled:opacity-60"
              >
                {c.assigned >= 5 ? "Penuh" : pending === c.id ? "Memilih..." : "Pilih"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
