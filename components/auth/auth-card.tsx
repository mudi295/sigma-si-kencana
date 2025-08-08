import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

export default function AuthCard({
  title,
  children,
  subtitle,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <Card className="bg-white/[0.06] border-white/12 text-white backdrop-blur">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        {subtitle ? <p className="mt-1 text-sm text-white/85">{subtitle}</p> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
