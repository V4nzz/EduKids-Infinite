import { pickOne } from "../rng";
import { IPA_ITEMS } from "../bank";

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

export function makeIpaQuestion({ difficulty, rng }: MakeParams) {
  const item = pickOne(rng, IPA_ITEMS);
  const mode = pickOne(rng, ["type", "habitat"]);

  // MODE 1 — JENIS
  if (mode === "type") {
    const options = shuffle(rng, ["hewan", "tumbuhan", "benda"]);
    const correctIndex = options.indexOf(item.type);

    return {
      prompt: `Ini termasuk apa? ${item.emoji} (${item.name})`,
      hint: "Pikirkan: hidup atau tidak?",
      choices: options.map((o, i) => ({ id: String(i), label: o })),
      correctChoiceId: String(correctIndex),
    };
  }

  // MODE 2 — HABITAT
  const options = shuffle(rng, ["darat", "air", "udara", "air & darat"]);
  const correctIndex = options.indexOf(item.habitat);

  return {
    prompt: `Di mana ${item.name} hidup? ${item.emoji}`,
    hint: "Ingat tempat tinggalnya.",
    choices: options.map((o, i) => ({ id: String(i), label: o })),
    correctChoiceId: String(correctIndex),
  };
}
