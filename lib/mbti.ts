export type MbtiLetter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P"
export type MbtiType =
  | "ISTJ" | "ISFJ" | "INFJ" | "INTJ"
  | "ISTP" | "ISFP" | "INFP" | "INTP"
  | "ESTP" | "ESFP" | "ENFP" | "ENTP"
  | "ESTJ" | "ESFJ" | "ENFJ" | "ENTJ"

export type Likert = 1 | 2 | 3 | 4 | 5

export type MbtiQuestion = {
  id: number
  statement: string
  // dimension indicates which pair the statement contributes to
  // dir: +1 means favors first letter, -1 favors second letter
  pair: "EI" | "SN" | "TF" | "JP"
  dir: 1 | -1
}

export const mbtiQuestions: MbtiQuestion[] = [
  { id: 1, statement: "Saya berenergi saat bertemu orang baru dan beraktivitas dalam kelompok.", pair: "EI", dir: 1 },
  { id: 2, statement: "Saya merasa pulih saat menyendiri dan merenung dalam diam.", pair: "EI", dir: -1 },
  { id: 3, statement: "Saya fokus pada fakta konkret ketimbang kemungkinan abstrak.", pair: "SN", dir: 1 },
  { id: 4, statement: "Saya suka mengeksplorasi ide baru dan kemungkinan masa depan.", pair: "SN", dir: -1 },
  { id: 5, statement: "Saya mengambil keputusan terutama lewat logika dan konsistensi.", pair: "TF", dir: 1 },
  { id: 6, statement: "Saya memprioritaskan empati dan dampak pada perasaan orang lain.", pair: "TF", dir: -1 },
  { id: 7, statement: "Saya suka perencanaan rapi dan kepastian tenggat waktu.", pair: "JP", dir: 1 },
  { id: 8, statement: "Saya fleksibel, spontan, dan nyaman dengan perubahan rencana.", pair: "JP", dir: -1 },
  { id: 9, statement: "Saya menikmati berbicara sambil berpikir, memproses ide secara eksternal.", pair: "EI", dir: 1 },
  { id: 10, statement: "Saya mengandalkan intuisi dan pola ketimbang detail kecil.", pair: "SN", dir: -1 },
]

export function computeMbti(answers: Record<number, Likert>): MbtiType {
  let E = 0, I = 0, S = 0, N = 0, T = 0, F = 0, J = 0, P = 0
  const weight = (v: Likert) => (v - 3) // -2..+2

  for (const q of mbtiQuestions) {
    const ans = answers[q.id] ?? 3
    const w = weight(ans) * q.dir
    switch (q.pair) {
      case "EI":
        if (w >= 0) E += Math.abs(w)
        else I += Math.abs(w)
        break
      case "SN":
        if (w >= 0) S += Math.abs(w)
        else N += Math.abs(w)
        break
      case "TF":
        if (w >= 0) T += Math.abs(w)
        else F += Math.abs(w)
        break
      case "JP":
        if (w >= 0) J += Math.abs(w)
        else P += Math.abs(w)
        break
    }
  }

  const letters: MbtiLetter[] = [
    E >= I ? "E" : "I",
    S >= N ? "S" : "N",
    T >= F ? "T" : "F",
    J >= P ? "J" : "P",
  ]

  return letters.join("") as MbtiType
}

export const mbtiDescriptions: Record<MbtiType, { title: string; summary: string; recommendations: string[] }> = {
  ISTJ: { title: "The Logistician", summary: "Terstruktur, andal, fokus pada fakta.", recommendations: ["Kontrasepsi & Keluarga Berencana", "Hukum & Perlindungan"] },
  ISFJ: { title: "The Defender", summary: "Peduli, teliti, suportif.", recommendations: ["Hubungan Sehat & Persetujuan", "Bantuan & Konseling"] },
  INFJ: { title: "The Advocate", summary: "Visioner, empatik, berprinsip.", recommendations: ["Pendidikan Seksualitas Sehat", "Tekanan Teman & Media Sosial"] },
  INTJ: { title: "The Architect", summary: "Strategis, independen, sistemik.", recommendations: ["Teknologi & Kesehatan Reproduksi", "Keluarga Berencana"] },
  ISTP: { title: "The Virtuoso", summary: "Praktis, eksperimental, adaptif.", recommendations: ["Literasi Digital & Tekanan Teman", "Kontrasepsi (praktik)"] },
  ISFP: { title: "The Adventurer", summary: "Sensitif, artistik, fleksibel.", recommendations: ["Hubungan Sehat", "Bantuan & Konseling"] },
  INFP: { title: "The Mediator", summary: "Idealistis, reflektif, peduli nilai.", recommendations: ["Seksualitas Sehat (nilai & batasan)", "Persetujuan"] },
  INTP: { title: "The Logician", summary: "Analitis, ingin tahu, konseptual.", recommendations: ["Teknologi & Kesehatan", "Mitos vs Fakta Kontrasepsi"] },
  ESTP: { title: "The Entrepreneur", summary: "Enerjik, langsung, spontan.", recommendations: ["Manajemen Risiko Sosial", "Kontrasepsi praktis"] },
  ESFP: { title: "The Entertainer", summary: "Hangat, spontan, ekspresif.", recommendations: ["Komunikasi Asertif", "Hubungan Sehat"] },
  ENFP: { title: "The Campaigner", summary: "Kreatif, inspiratif, berempati.", recommendations: ["Tekanan Teman & Media Sosial", "Seksualitas Sehat (nilai)"] },
  ENTP: { title: "The Debater", summary: "Argumentatif, inovatif, cepat berpikir.", recommendations: ["Fakta vs Mitos", "Hukum & Budaya"] },
  ESTJ: { title: "The Executive", summary: "Organisator, tegas, efisien.", recommendations: ["Keluarga Berencana (perencanaan)", "Kebijakan & Layanan"] },
  ESFJ: { title: "The Consul", summary: "Peduli komunitas, kolaboratif.", recommendations: ["Hubungan Sehat", "Bantuan & Konseling"] },
  ENFJ: { title: "The Protagonist", summary: "Pemimpin empatik, pembina.", recommendations: ["Persetujuan", "Relasi Sehat & Komunitas"] },
  ENTJ: { title: "The Commander", summary: "Visioner, strategis, tegas.", recommendations: ["Perencanaan Keluarga", "Teknologi & Kebijakan"] },
}
