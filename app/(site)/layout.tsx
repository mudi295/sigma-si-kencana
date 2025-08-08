import type { ReactNode } from "react"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import { AuthProvider } from "@/context/auth-provider"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-[#0b1026] text-white" style={{ colorScheme: "dark" }}>
      <div className="bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(29,78,216,0.35),transparent),linear-gradient(180deg,#0b1026_0%,#0b1026_50%,#0e1635_100%)]">
        <AuthProvider>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </AuthProvider>
      </div>
    </div>
  )
}
