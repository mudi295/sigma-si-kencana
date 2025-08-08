export type QuizOption = { text: string; isCorrect: boolean; explanation: string }
export type QuizQuestion = { id: number; question: string; options: QuizOption[] }

export const quizBank: Record<"10-14" | "15-19" | "20-24", QuizQuestion[]> = {
  "10-14": [
    {
      id: 1,
      question: "Apa arti 'persetujuan (consent)' dalam pertemanan atau hubungan?",
      options: [
        { text: "Melakukan sesuatu tanpa bertanya", isCorrect: false, explanation: "Itu bukan persetujuan." },
        { text: "Setuju dengan rela, sadar, dan tanpa paksaan", isCorrect: true, explanation: "Consent adalah kesediaan dengan rela dan sadar." },
        { text: "Mengikuti teman agar tidak malu", isCorrect: false, explanation: "Tekanan teman bukan consent." },
        { text: "Diam berarti setuju", isCorrect: false, explanation: "Diam tidak sama dengan setuju." },
      ],
    },
    {
      id: 2,
      question: "Jika teman mengajak melakukan hal yang membuatmu tidak nyaman, kamu sebaiknya?",
      options: [
        { text: "Mengatakan 'tidak' dengan tegas", isCorrect: true, explanation: "Komunikasi asertif penting untuk batas sehat." },
        { text: "Mengikuti agar tidak dikucilkan", isCorrect: false, explanation: "Pilih keselamatanmu." },
        { text: "Membiarkannya dulu", isCorrect: false, explanation: "Segera ambil sikap." },
        { text: "Marah dan membalas", isCorrect: false, explanation: "Tetap tenang dan cari bantuan." },
      ],
    },
    {
      id: 3,
      question: "Jejak digital adalah:",
      options: [
        { text: "Data yang kamu tinggalkan di internet", isCorrect: true, explanation: "Benar, selalu jaga privasi." },
        { text: "Jejak kaki di pantai", isCorrect: false, explanation: "Itu literal, bukan digital." },
        { text: "Nama panggilan", isCorrect: false, explanation: "Bukan definisinya." },
        { text: "Pesan rahasia yang hilang", isCorrect: false, explanation: "Banyak data tetap tersimpan." },
      ],
    },
  ],
  "15-19": [
    {
      id: 1,
      question: "Pernikahan dini berisiko karena, kecuali:",
      options: [
        { text: "Peningkatan risiko komplikasi kehamilan", isCorrect: false, explanation: "Ini benar terjadi." },
        { text: "Kesiapan mental/finansial belum matang", isCorrect: false, explanation: "Faktor risiko yang umum." },
        { text: "Meningkatkan peluang pendidikan tinggi", isCorrect: true, explanation: "Justru berisiko menghambat pendidikan." },
        { text: "Potensi tekanan psikologis", isCorrect: false, explanation: "Ini juga risiko nyata." },
      ],
    },
    {
      id: 2,
      question: "Kontrasepsi darurat (morning-after pill) paling efektif diminum:",
      options: [
        { text: "Lebih dari 5 hari setelah hubungan", isCorrect: false, explanation: "Efektivitas turun drastis." },
        { text: "Dalam 72 jam pertama", isCorrect: true, explanation: "Paling efektif dalam 72 jam." },
        { text: "Hanya saat haid", isCorrect: false, explanation: "Tidak terkait siklus seperti itu." },
        { text: "Setiap hari sebagai rutin", isCorrect: false, explanation: "Bukan untuk pemakaian rutin." },
      ],
    },
    {
      id: 3,
      question: "Consent yang valid berarti:",
      options: [
        { text: "Bisa ditarik kapan saja", isCorrect: true, explanation: "Consent dapat dibatalkan kapan pun." },
        { text: "Cukup diberikan sekali", isCorrect: false, explanation: "Harus berkelanjutan dan jelas." },
        { text: "Diam itu setuju", isCorrect: false, explanation: "Tidak benar." },
        { text: "Boleh dengan paksaan halus", isCorrect: false, explanation: "Paksaan menggugurkan consent." },
      ],
    },
  ],
  "20-24": [
    {
      id: 1,
      question: "Metode kontrasepsi berikut yang juga melindungi dari IMS adalah:",
      options: [
        { text: "Kondom", isCorrect: true, explanation: "Kondom melindungi dari kehamilan dan IMS." },
        { text: "Pil kombinasi", isCorrect: false, explanation: "Tidak melindungi dari IMS." },
        { text: "IUD tembaga", isCorrect: false, explanation: "Efektif cegah hamil, tidak cegah IMS." },
        { text: "Suntik progestin", isCorrect: false, explanation: "Tidak cegah IMS." },
      ],
    },
    {
      id: 2,
      question: "Red flags dalam relasi termasuk, kecuali:",
      options: [
        { text: "Mengisolasi dari teman/keluarga", isCorrect: false, explanation: "Itu tanda kontrol tidak sehat." },
        { text: "Menghormati batasan personal", isCorrect: true, explanation: "Ini justru green flag (positif)." },
        { text: "Cemburu berlebihan", isCorrect: false, explanation: "Termasuk red flag." },
        { text: "Mengakses ponsel tanpa izin", isCorrect: false, explanation: "Melanggar privasi." },
      ],
    },
    {
      id: 3,
      question: "Prinsip komunikasi asertif adalah:",
      options: [
        { text: "Jujur, jelas, hormat, dan fokus solusi", isCorrect: true, explanation: "Itu inti asertif." },
        { text: "Diam agar tak ribut", isCorrect: false, explanation: "Itu pasif, bukan asertif." },
        { text: "Keras agar didengar", isCorrect: false, explanation: "Itu agresif." },
        { text: "Mengalah selalu", isCorrect: false, explanation: "Tidak sehat." },
      ],
    },
  ],
}
