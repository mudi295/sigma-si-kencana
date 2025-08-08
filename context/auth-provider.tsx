"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getSupabaseBrowser, hasSupabaseEnv } from "@/lib/supabase/client"

export type AppRole = "admin" | "member" | "konselor"
export type Profile = {
  id: string
  name: string | null
  role: AppRole
  counselor_id: string | null
  public_key: string | null
}

type AuthContextType = {
  loading: boolean
  user: { id: string; email: string | null } | null
  profile: Profile | null
  refresh: () => Promise<void>
  signOut: () => Promise<void>
  supabaseReady: boolean
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  user: null,
  profile: null,
  refresh: async () => {},
  signOut: async () => {},
  supabaseReady: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<AuthContextType["user"]>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [supabaseReady] = useState(hasSupabaseEnv())

  const load = async () => {
    const supabase = getSupabaseBrowser()
    if (!supabase) {
      // No envs: render site without auth
      setUser(null)
      setProfile(null)
      setLoading(false)
      return
    }
    const { data } = await supabase.auth.getUser()
    const u = data.user
    setUser(u ? { id: u.id, email: u.email } : null)
    if (u) {
      const { data: p } = await supabase
        .from("profiles")
        .select("id,name,role,counselor_id,public_key")
        .eq("id", u.id)
        .maybeSingle()
      setProfile((p as Profile) ?? null)
    } else {
      setProfile(null)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
    const supabase = getSupabaseBrowser()
    if (!supabase) return
    const { data: sub } = supabase.auth.onAuthStateChange(() => load())
    return () => {
      sub.subscription.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo<AuthContextType>(() => ({
    loading,
    user,
    profile,
    supabaseReady,
    refresh: load,
    signOut: async () => {
      const supabase = getSupabaseBrowser()
      if (supabase) {
        await supabase.auth.signOut()
        await load()
      }
    },
  }), [loading, user, profile, supabaseReady])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
