"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, MessagesSquare } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/materi", label: "Materi" },
  { href: "/mbti", label: "Test MBTI" },
  { href: "/quiz", label: "Quiz" },
]

export default function SiteNav({ profile }: { profile?: { role?: string } }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const role = profile?.role

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 backdrop-blur supports-[backdrop-filter]:bg-white/5">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">

        {/* Logo kiri */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img src="/genre.png" alt="Logo" className="w-8 h-8" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold tracking-wide">
                SIGMA <span className="text-blue-300">SI</span>{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">KENCANA</span>
              </span>
              {pathname === "/" && (
                <span className="hidden sm:block text-[11px] md:text-xs text-white/85">
                  Platform edukasi kesehatan digital
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Navigasi kanan */}
        <nav className="hidden md:flex flex-1 justify-end items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-white/90 hover:text-white transition-colors",
                pathname === item.href && "text-white"
              )}
            >
              {item.label}
            </Link>
          ))}

          {role === "admin" && (
            <Link href="/admin" className="text-sm font-medium text-yellow-300 hover:text-yellow-200">Dashboard Admin</Link>
          )}
          {role === "member" && (
            <Link href="/konseling/select" className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200">
              <MessagesSquare className="size-4" /> Konseling
            </Link>
          )}
          {role === "konselor" && (
            <Link href="/konselor" className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200">
              <MessagesSquare className="size-4" /> Konseling
            </Link>
          )}
        </nav>

        {/* Tombol burger mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 transition text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden border-t border-white/15 bg-[#0b1026]/85 backdrop-blur">
          <div className="px-4 py-3 grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium hover:bg-white/10 transition",
                  pathname === item.href ? "bg-white/10 text-white" : "text-white/90"
                )}
              >
                {item.label}
              </Link>
            ))}

            {role === "admin" && (
              <Link href="/admin" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-yellow-300 hover:bg-white/10">
                Dashboard Admin
              </Link>
            )}
            {role === "member" && (
              <Link href="/konseling/select" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-blue-300 hover:bg-white/10">
                Konseling
              </Link>
            )}
            {role === "konselor" && (
              <Link href="/konselor" onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-blue-300 hover:bg-white/10">
                Konseling
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
