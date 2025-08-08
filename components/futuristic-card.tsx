import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export default function FuturisticCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "group rounded-xl border border-white/12 bg-white/[0.06] backdrop-blur hover:bg-white/[0.1] transition relative overflow-hidden",
        "shadow-[0_0_30px_rgba(59,130,246,0.08)] hover:shadow-[0_0_50px_rgba(59,130,246,0.18)]",
        className
      )}
    >
      <div className="pointer-events-none absolute -top-24 -right-24 size-48 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition" />
      {children}
    </div>
  )
}

FuturisticCard.defaultProps = {
  className: "",
}
