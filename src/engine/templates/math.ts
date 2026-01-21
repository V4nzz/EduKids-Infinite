import { pickOne, randInt } from "../rng";
import { NAMES, OBJECTS, VERBS } from "../bank";

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

export function makeMathQuestion({ difficulty, rng }: MakeParams) {
  const name = pickOne(rng, NAMES);
  const obj = pickOne(rng, OBJECTS);
  const verb = pickOne(rng, VERBS);

  let a = randInt(rng, 1, difficulty * 4 + 3);
  let b = randInt(rng, 1, difficulty * 4 + 3);

  const mode = pickOne(rng, ["add", "sub", "compare"]);

  let prompt = "";
  let answer = 0;

  if (mode === "add") {
    prompt = `${name} punya ${a} ${obj.name} ${obj.emoji}. Lalu ${verb} ${b} lagi. Totalnya berapa?`;
    answer = a + b;
  }

  if (mode === "sub") {
    const total = a + b;
    prompt = `${name} punya ${total} ${obj.name} ${obj.emoji}. Ia memberikan ${b}. Sisa berapa?`;
    answer = a;
  }

  if (mode === "compare") {
    const bigger = Math.max(a, b);
    const smaller = Math.min(a, b);
    prompt = `${name} punya ${a} ${obj.name} dan ${b} ${obj.name}. Mana yang lebih banyak?`;
    answer = bigger;
  }

  const choices = shuffle(rng, [
    answer,
    answer + randInt(rng, 1, 3),
    answer - randInt(rng, 1, 3),
    answer + randInt(rng, 4, 6),
  ]).map((n, i) => ({ id: String(i), label: String(n) }));

  const correctIndex = choices.findIndex((c) => Number(c.label) === answer);

  return {
    prompt,
    hint: "Coba hitung pelan-pelan ya.",
    choices,
    correctChoiceId: String(correctIndex),
  };
}
