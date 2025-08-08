"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabaseBrowser } from "@/lib/supabase/client"
import { useAuth } from "@/context/auth-provider"
import { ensureKeypair, getPublicKeyBase64, encryptFor, decryptFrom } from "@/utils/crypto"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Msg = {
  id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  nonce: string
  ciphertext: string
  sender_pub: string // sender public key snapshot
  created_at: string
}

export default function ChatPage() {
  const { user, profile } = useAuth()
  const params = useSearchParams()
  const otherId = params.get("with") || ""
  const [messages, setMessages] = useState<Msg[]>([])
  const [otherPub, setOtherPub] = useState<string | null>(null)
  const [text, setText] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  const me = user?.id
  const conversation_id = useMemo(() => {
    if (!me || !otherId) return ""
    return [me, otherId].sort().join(":")
  }, [me, otherId])

  useEffect(() => {
    ensureKeypair()
    // publish my public key to profile if missing
    const publish = async () => {
      const pub = getPublicKeyBase64()
      const supabase = supabaseBrowser()
      if (pub && profile?.public_key !== pub && me) {
        await supabase.from("profiles").update({ public_key: pub }).eq("id", me)
      }
      // fetch other public key
      const { data: p } = await supabase.from("profiles").select("public_key").eq("id", otherId).maybeSingle()
      setOtherPub((p as any)?.public_key || null)
    }
    if (me && otherId) publish()
  }, [me, otherId, profile?.public_key])

  useEffect(() => {
    const load = async () => {
      if (!conversation_id) return
      const supabase = supabaseBrowser()
      const { data } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversation_id)
        .order("created_at", { ascending: true })
      setMessages((data as Msg[]) || [])
      // subscribe
      const channel = supabase
        .channel(`chat:${conversation_id}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `conversation_id=eq.${conversation_id}` }, (payload) => {
          setMessages((cur) => [...cur, payload.new as Msg])
        })
        .subscribe()
      return () => { supabase.removeChannel(channel) }
    }
    const unsub = load()
    return () => { void unsub }
  }, [conversation_id])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length])

  const send = async () => {
    if (!me || !otherId || !otherPub || !text.trim()) return
    const privB64 = localStorage.getItem("sigma:privkey")!
    const { nonce, ciphertext } = encryptFor(otherPub, text.trim(), privB64)
    const supabase = supabaseBrowser()
    await supabase.from("chat_messages").insert({
      conversation_id,
      sender_id: me,
      receiver_id: otherId,
      nonce,
      ciphertext,
      sender_pub: localStorage.getItem("sigma:pubkey"),
    })
    setText("")
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <Card className="bg-white/[0.06] border-white/12 text-white">
        <CardHeader>
          <CardTitle>Chat Konseling (Anonim)</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="h-[50vh] overflow-y-auto rounded-md border border-white/10 p-3 space-y-2">
            {messages.map((m) => {
              const mine = m.sender_id === me
              const privB64 = localStorage.getItem("sigma:privkey")!
              const otherPubKey = mine ? (otherPub || "") : m.sender_pub
              const plain = otherPubKey ? decryptFrom(otherPubKey, m.nonce, m.ciphertext, privB64) : "(menunggu kunci...)"
              return (
                <div key={m.id} className={`max-w-[80%] rounded-md px-3 py-2 ${mine ? "ml-auto bg-blue-500/20 border border-blue-400/30" : "bg-white/[0.06] border border-white/12"}`}>
                  <p className="text-sm">{plain || "pesan terenkripsi"}</p>
                </div>
              )
            })}
            <div ref={endRef} />
          </div>
          <div className="flex gap-2">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tulis pesan..." className="bg-white/[0.06] border-white/12 text-white" />
            <Button onClick={send} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">Kirim</Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
