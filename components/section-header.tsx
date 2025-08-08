export default function SectionHeader({
  title,
  subtitle,
  accent = "Edukasi Kesehatan",
}: {
  title: string
  subtitle?: string
  accent?: string
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className="inline-block rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs tracking-wide text-white/90">
        {accent}
      </div>
      <h2 className="mt-3 text-2xl md:text-4xl font-bold">{title}</h2>
      {subtitle ? <p className="mt-2 text-white/90">{subtitle}</p> : null}
    </div>
  )
}
