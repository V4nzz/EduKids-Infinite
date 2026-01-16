import { pickOne } from "../rng";

type MakeParams = { difficulty: number; rng: () => number };

const items = [
  { emoji: "🐟", name: "ikan", type: "hewan" },
  { emoji: "🌳", name: "pohon", type: "tumbuhan" },
  { emoji: "🪑", name: "kursi", type: "benda" },
  { emoji: "🐔", name: "ayam", type: "hewan" },
  { emoji: "🌸", name: "bunga", type: "tumbuhan" },
  { emoji: "📚", name: "buku", type: "benda" },
];

function shuffle<T>(rng: () => number, arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makeIpaQuestion({ difficulty, rng }: MakeParams) {
  const it = pickOne(rng, items);

  const prompt =
    difficulty <= 4
      ? `Ini termasuk apa? ${it.emoji} (${it.name})`
      : `Klasifikasikan: ${it.emoji} (${it.name}) termasuk…`;

  const optionsBase = ["hewan", "tumbuhan", "benda"];
  const options = shuffle(rng, optionsBase);
  const correctIndex = options.indexOf(it.type);

  const hint = "Ingat: hewan = bergerak & makan, tumbuhan = tumbuh, benda = tidak hidup.";

  return {
    prompt,
    hint,
    choices: options.map((t, idx) => ({ id: String(idx), label: t })),
    correctChoiceId: String(correctIndex),
  };
}
