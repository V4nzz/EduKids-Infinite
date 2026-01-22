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
  {
    prompt: "Urutkan proses membuat es batu:",
    steps: ["💧 Air", "🧊 Masuk freezer", "⏳ Tunggu", "🧊 Jadi es"],
    hint: "Air dimasukkan ke freezer → tunggu → jadi es.",
  },
  {
    prompt: "Urutkan siklus siang sampai malam:",
    steps: ["🌅 Pagi", "🌞 Siang", "🌇 Sore", "🌙 Malam"],
    hint: "Pagi → siang → sore → malam.",
  },
  {
    prompt: "Urutkan pertumbuhan tanaman sederhana:",
    steps: ["🌰 Biji", "🌱 Tunas", "🌿 Tanaman kecil", "🌳 Tanaman besar"],
    hint: "Biji → tunas → tumbuh kecil → jadi besar.",
  },
  {
    prompt: "Urutkan proses mencuci tangan:",
    steps: ["💧 Basahi tangan", "🧼 Pakai sabun", "🖐️ Gosok", "🚿 Bilas"],
    hint: "Basahi → pakai sabun → gosok → bilas.",
  },
  {
    prompt: "Urutkan proses membuat teh:",
    steps: ["💧 Air", "🔥 Dipanaskan", "🍵 Teh dicelup", "🙂 Diminum"],
    hint: "Air dipanaskan → teh dicelup → siap diminum.",
  },
  {
    prompt: "Urutkan perubahan wujud air:",
    steps: ["🧊 Es", "💧 Air", "💨 Uap"],
    hint: "Es mencair jadi air → air menguap jadi uap.",
  },
  {
    prompt: "Urutkan daur hidup katak:",
    steps: ["🥚 Telur", "🐟 Kecebong", "🐸 Katak muda", "🐸 Katak dewasa"],
    hint: "Telur → kecebong → katak muda → dewasa.",
  },
  {
    prompt: "Urutkan langkah memakai baju:",
    steps: ["👕 Ambil baju", "🧍 Pakai baju", "✅ Rapikan"],
    hint: "Ambil → pakai → rapikan.",
  },
  {
    prompt: "Urutkan sampah organik jadi kompos:",
    steps: ["🍂 Kumpulkan", "🗑️ Masukkan", "⏳ Tunggu", "🌿 Jadi kompos"],
    hint: "Kumpulkan → masukkan → tunggu → jadi kompos.",
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
