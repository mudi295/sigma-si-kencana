import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  try {
    const { member_id, counselor_id } = await req.json()
    if (!member_id || !counselor_id) {
      return NextResponse.json({ error: "member_id dan counselor_id wajib" }, { status: 400 })
    }
    const sb = supabaseAdmin()
    // Check existing selection
    const { data: member } = await sb.from("profiles").select("counselor_id, role").eq("id", member_id).maybeSingle()
    if (!member || member.role !== "member") {
      return NextResponse.json({ error: "Hanya member yang dapat memilih konselor" }, { status: 403 })
    }
    if (member.counselor_id) {
      return NextResponse.json({ error: "Member sudah memilih konselor" }, { status: 400 })
    }
    // Check counselor capacity
    const { count } = await sb.from("profiles").select("*", { count: "exact", head: true }).eq("counselor_id", counselor_id)
    if ((count || 0) >= 5) {
      return NextResponse.json({ error: "Konselor sudah penuh (maks 5 member)" }, { status: 400 })
    }
    // Assign
    await sb.from("profiles").update({ counselor_id }).eq("id", member_id)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 })
  }
}
