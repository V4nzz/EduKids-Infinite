import { pickOne, randInt } from "../rng";

type MakeParams = { difficulty: number; rng: () => number };

const vocab = [
  { emoji: "🍎", word: "apel", distractors: ["pisang", "jeruk", "anggur"] },
  { emoji: "🐱", word: "kucing", distractors: ["anjing", "ayam", "ikan"] },
  { emoji: "🏫", word: "sekolah", distractors: ["pasar", "rumah", "kantor"] },
  { emoji: "🚲", word: "sepeda", distractors: ["mobil", "kereta", "perahu"] },
  { emoji: "🌧️", word: "hujan", distractors: ["panas", "angin", "salju"] },
];

function shuffle<T>(rng: () => number, arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makeBahasaQuestion({ difficulty, rng }: MakeParams) {
  const item = pickOne(rng, vocab);

  // difficulty nanti bisa bikin kalimat rumpang; untuk sekarang variasikan prompt.
  const prompts = [
    `Kata yang cocok untuk ${item.emoji} adalah…`,
    `Pilih nama yang benar: ${item.emoji}`,
    `Ini gambar apa? ${item.emoji}`,
  ];

  const prompt = pickOne(rng, prompts);

  // 4 pilihan
  const options = shuffle(rng, [item.word, ...shuffle(rng, item.distractors).slice(0, 3)]);
  const correctIndex = options.indexOf(item.word);

  // hint makin jelas untuk level kecil
  const hint =
    difficulty <= 3 ? "Coba sebutkan dulu di kepala kamu, lalu pilih." : "Perhatikan emoji/gambar ya.";

  return {
    prompt,
    hint,
    choices: options.map((w, idx) => ({ id: String(idx), label: w })),
    correctChoiceId: String(correctIndex),
  };
}
