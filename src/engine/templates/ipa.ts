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
    steps: ["☀️ Penguapan", "☁️ Kondensasi", "🌧️ Hujan", "🌊 Aliran ke laut"],
    hint: "Air menguap → jadi awan → turun hujan → kembali ke laut.",
  },
  {
    prompt: "Urutkan pertumbuhan tanaman:",
    steps: ["🌰 Benih", "🌱 Berkecambah", "🌿 Tunas", "🪴 Tanaman kecil", "🌳 Tanaman besar"],
    hint: "Mulai dari benih sampai tumbuh besar.",
  },
  {
    prompt: "Urutkan siklus kupu-kupu:",
    steps: ["🥚 Telur", "🐛 Ulat", "🧵 Kepompong", "🦋 Kupu-kupu"],
    hint: "Telur → ulat → kepompong → kupu-kupu.",
  },
];

export function makeIpaQuestion({ difficulty, rng }: MakeParams) {
  const pick = pickOne(rng, processes);

  const answer = pick.steps;
  const bank = shuffle(rng, answer);

  const prompt = difficulty <= 4 ? pick.prompt : `${pick.prompt} (lebih teliti ya!)`;
  const hint = pick.hint;

  return { prompt, hint, bank, answer };
}
