"use client"

import { useEffect, useState, useCallback } from "react"

export type Role = "member" | "konselor"

type StoredUser = { id: string; name: string; email: string; password: string; role: Role }
export type SessionUser = { id: string; name: string; email: string; role: Role }

const USERS_KEY = "sigma_users"
const SESSION_KEY = "sigma_session"
const AUTH_EVENT = "sigma-auth-change"

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return []
  try {
    const raw = JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as any[]
    return raw.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: (u.role ?? "member") as Role,
    }))
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function readSession(): SessionUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}

function writeSession(user: SessionUser | null) {
  if (!user) localStorage.removeItem(SESSION_KEY)
  else localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function useAuth() {
  const [user, setUser] = useState<SessionUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setUser(readSession())
    setLoading(false)
    const onChange = () => setUser(readSession())
    window.addEventListener("storage", onChange)
    window.addEventListener(AUTH_EVENT, onChange)
    return () => {
      window.removeEventListener("storage", onChange)
      window.removeEventListener(AUTH_EVENT, onChange)
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string, role: Role = "member") => {
    setError(null)
    const users = readUsers()
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
    if (exists) {
      setError("Email sudah terdaftar.")
      return { ok: false }
    }
    const id = String(Date.now())
    const newUser: StoredUser = { id, name, email, password, role }
    users.push(newUser)
    writeUsers(users)
    const session: SessionUser = { id, name, email, role }
    writeSession(session)
    setUser(session)
    return { ok: true }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setError(null)
    const users = readUsers()
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!match) {
      setError("Email atau kata sandi tidak sesuai.")
      return { ok: false }
    }
    const session: SessionUser = { id: match.id, name: match.name, email: match.email, role: (match.role ?? "member") as Role }
    writeSession(session)
    setUser(session)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    writeSession(null)
    setUser(null)
  }, [])

  return { user, loading, error, register, login, logout, clearError: () => setError(null) }
}
