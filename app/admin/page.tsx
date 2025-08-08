"use client"

import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Edit3, Users, UserCog, UserPlus } from 'lucide-react'
import { useAuth } from "@/context/auth-provider"

type Row = { id: string; name: string | null; email: string | null; role: "admin" | "member" | "konselor" }

export default function AdminDashboard() {
  const { profile } = useAuth()
  const [stats, setStats] = useState({ total: 0, members: 0, counselors: 0 })
  const [rows, setRows] = useState<Row[]>([])
  const [editing, setEditing] = useState<Row | null>(null)
  const [pending, setPending] = useState(false)

  const load = async () => {
    const supabase = supabaseBrowser()
    // Counts
    const { count: total } = await supabase.from("profiles").select("*", { count: "exact", head: true })
    const { count: members } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "member")
    const { count: counselors } = await supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "konselor")
    setStats({ total: total || 0, members: members || 0, counselors: counselors || 0 })
    // Rows
    const { data: u } = await supabase
      .from("profiles_with_email")
      .select("id,name,email,role")
      .order("role", { ascending: true })
      .order("name", { ascending: true })
    setRows((u as Row[]) || [])
  }

  useEffect(() => {
    load()
  }, [])

  if (profile?.role !== "admin") {
    return (
      <section className="mx-auto max-w-5xl px-4 py-12">
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle>Akses Ditolak</CardTitle></CardHeader>
          <CardContent>Halaman ini khusus Admin.</CardContent>
        </Card>
      </section>
    )
  }

  const saveEdit = async () => {
    if (!editing) return
    setPending(true)
    const supabase = supabaseBrowser()
    await supabase.from("profiles").update({ name: editing.name, role: editing.role }).eq("id", editing.id)
    setPending(false)
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm("Hapus user ini?")) return
    const supabase = supabaseBrowser()
    // delete profile (auth user deletion should be done via server-side admin API in production)
    await supabase.from("profiles").delete().eq("id", id)
    load()
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold">Dashboard Admin</h1>
      <p className="text-white/85 mt-2">Pantau pengguna dan kelola peran.</p>

      <div className="grid gap-4 sm:grid-cols-3 mt-6">
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle className="flex items-center gap-2"><Users className="size-5 text-blue-300" /> Total Akun</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{stats.total}</CardContent>
        </Card>
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle className="flex items-center gap-2"><UserPlus className="size-5 text-blue-300" /> Member</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{stats.members}</CardContent>
        </Card>
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle className="flex items-center gap-2"><UserCog className="size-5 text-blue-300" /> Konselor</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{stats.counselors}</CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="bg-white/[0.06] border-white/12 text-white">
          <CardHeader><CardTitle>Daftar Pengguna</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-white/70">
                <tr>
                  <th className="text-left py-2 pr-4">Nama</th>
                  <th className="text-left py-2 pr-4">Email</th>
                  <th className="text-left py-2 pr-4">Role</th>
                  <th className="text-left py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-white/10">
                    <td className="py-2 pr-4">{r.name || "-"}</td>
                    <td className="py-2 pr-4">{r.email || "-"}</td>
                    <td className="py-2 pr-4 capitalize">{r.role}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setEditing(r)}>
                          <Edit3 className="size-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-400/40 text-red-300 hover:bg-red-500/10" onClick={() => remove(r.id)}>
                          <Trash2 className="size-4 mr-1" /> Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {editing && (
              <div className="mt-6 border-t border-white/10 pt-6">
                <h3 className="font-semibold mb-3">Edit Pengguna</h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <Label>Nama</Label>
                    <Input value={editing.name || ""} onChange={(e) => setEditing({ ...editing!, name: e.target.value })} className="bg-white/[0.06] border-white/12 text-white" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <select value={editing.role} onChange={(e) => setEditing({ ...editing!, role: e.target.value as any })} className="w-full h-10 rounded-md bg-white/[0.06] border border-white/12 px-3">
                      <option value="admin">admin</option>
                      <option value="member">member</option>
                      <option value="konselor">konselor</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button disabled={pending} onClick={saveEdit} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                    Simpan
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setEditing(null)}>
                    Batal
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
