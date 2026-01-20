import { pickOne } from "../rng";

type MakeParams = { difficulty: number; rng: () => number };

function shuffle<T>(rng: () => number, arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const processes = [
  {
    prompt: "Urutkan daur air yang benar:",
    steps: ["Penguapan", "Kondensasi", "Hujan", "Aliran ke laut"],
    hint: "Ingat: air menguap → jadi awan → turun hujan → kembali ke laut.",
  },
  {
    prompt: "Urutkan pertumbuhan tanaman sederhana:",
    steps: ["Benih", "Berkecambah", "Tunas", "Tanaman kecil", "Tanaman besar"],
    hint: "Dari benih sampai tumbuh besar.",
  },
  {
    prompt: "Urutkan perubahan wujud air (contoh umum):",
    steps: ["Air dipanaskan", "Menguap", "Uap jadi awan", "Turun hujan"],
    hint: "Mulai dari air dipanaskan sampai hujan turun.",
  },
];

export function makeIpaQuestion({ difficulty, rng }: MakeParams) {
  // difficulty tinggi = proses lebih panjang (kalau mau nanti kita tambah)
  const pick = pickOne(rng, processes);

  const answer = pick.steps;
  const bank = shuffle(rng, answer);

  const prompt =
    difficulty <= 4 ? pick.prompt : `${pick.prompt} (lebih teliti ya!)`;

  const hint = pick.hint;

  return {
    prompt,
    hint,
    bank,
    answer,
  };
}