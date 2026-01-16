import { pickOne, randInt } from "../rng";

type MakeParams = { difficulty: number; rng: () => number };

export function makeMathQuestion({ difficulty, rng }: MakeParams) {
  const objects = ["apel", "bintang", "ikan", "kue", "pensil"];
  const places = ["di pasar", "di taman", "di pantai", "di rumah", "di sekolah"];
  const obj = pickOne(rng, objects);
  const place = pickOne(rng, places);

  // scaling angka berdasarkan difficulty
  const max = Math.min(20, 5 + difficulty * 2);
  const a = randInt(rng, 1, max);
  const b = randInt(rng, 1, max);

  const prompt = `Kiko punya ${a} ${obj} ${place}. Lalu dapat ${b} lagi. Totalnya berapa?`;
  const answer = a + b;

  // buat 4 pilihan (1 benar + 3 salah)
  const wrongs = new Set<number>();
  while (wrongs.size < 3) {
    const delta = randInt(rng, -3, 3);
    const val = Math.max(0, answer + (delta === 0 ? 2 : delta));
    if (val !== answer) wrongs.add(val);
  }

  const choicesNums = [answer, ...Array.from(wrongs)];
  // shuffle
  for (let i = choicesNums.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [choicesNums[i], choicesNums[j]] = [choicesNums[j], choicesNums[i]];
  }

  const correctIndex = choicesNums.indexOf(answer);

  return {
    prompt,
    hint: "Ingat: total = yang pertama + yang didapat lagi.",
    answer,
    choices: choicesNums.map((n, idx) => ({ id: String(idx), label: String(n) })),
    correctChoiceId: String(correctIndex),
  };
}
