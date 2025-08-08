"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import { useAuth } from "@/context/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type AssignedMember = { id: string; name: string | null; email: string | null }

export default function KonselorPanel() {
  const { profile } = useAuth()
  const [list, setList] = useState<AssignedMember[]>([])

  useEffect(() => {
    const load = async () => {
      const supabase = supabaseBrowser()
      const { data } = await supabase.from("profiles_with_email").select("id,name,email").eq("counselor_id", profile?.id || "")
      setList((data as AssignedMember[]) || [])
    }
    if (profile?.id) load()
  }, [profile?.id])

  if (profile?.role !== "konselor") {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12">
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle>Khusus Konselor</CardTitle></CardHeader>
          <CardContent>Halaman ini untuk konselor melihat member yang memilihnya.</CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold">Panel Konselor</h1>
      <p className="text-white/85 mt-2">Daftar member yang memilih anda (maksimal 5).</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((m) => (
          <Card key={m.id} className="bg-white/[0.06] border-white/12 text-white">
            <CardHeader><CardTitle>{m.name || "Member"}</CardTitle></CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-white/80 text-sm">{m.email}</span>
              <Link href={`/konseling/chat?with=${m.id}`} className="text-blue-300 hover:text-blue-200 underline underline-offset-4 text-sm">
                Buka Chat
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
