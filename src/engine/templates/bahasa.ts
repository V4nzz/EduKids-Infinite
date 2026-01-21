import { pickOne } from "../rng";
import { VOCAB } from "../bank";

function shuffle<T>(rng: () => number, arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type MakeParams = {
  difficulty: number;
  rng: () => number;
};

export function makeBahasaQuestion({ difficulty, rng }: MakeParams) {
  const word = pickOne(rng, VOCAB);
  const mode = pickOne(rng, ["susun", "tebak", "awal"]);

  // MODE 1 — SUSUN HURUF
  if (mode === "susun") {
    const letters = shuffle(rng, word.split(""));
    return {
      type: "drag_order",
      prompt: "Susun huruf menjadi kata yang benar ⭐",
      hint: "Tarik huruf ke kotak dari kiri ke kanan",
      letters,
      answer: word,
    };
  }

  // MODE 2 — TEBAK MAKNA
  if (mode === "tebak") {
    const choices = shuffle(rng, [
      word,
      pickOne(rng, VOCAB),
      pickOne(rng, VOCAB),
      pickOne(rng, VOCAB),
    ]).map((w, i) => ({ id: String(i), label: w }));

    const correctIndex = choices.findIndex((c) => c.label === word);

    return {
      prompt: `Pilih kata yang sesuai dengan gambar/teks: "${word}"`,
      hint: "Baca perlahan ya.",
      choices,
      correctChoiceId: String(correctIndex),
    };
  }

  // MODE 3 — HURUF AWAL
  const choices = shuffle(rng, [
    word[0],
    pickOne(rng, VOCAB)[0],
    pickOne(rng, VOCAB)[0],
    pickOne(rng, VOCAB)[0],
  ]).map((w, i) => ({ id: String(i), label: w }));

  const correctIndex = choices.findIndex((c) => c.label === word[0]);

  return {
    prompt: `Huruf pertama dari kata "${word}" adalah…`,
    hint: "Lihat huruf paling depan.",
    choices,
    correctChoiceId: String(correctIndex),
  };
}
