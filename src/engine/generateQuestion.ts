import type { Question, Subject } from "./types";
import { SUBJECT_LABEL } from "./types";
import { makeMathQuestion } from "./templates/math";
import { makeBahasaQuestion } from "./templates/bahasa";
import { makeIpaQuestion } from "./templates/ipa";

export function generateQuestion({
  subject,
  difficulty,
  rng,
}: {
  subject: Subject;
  difficulty: number;
  rng: () => number;
}): Question {
  const base = {
    id: `${subject}-${Date.now()}-${Math.floor(rng() * 1e9)}`,
    subject,
    subjectLabel: SUBJECT_LABEL[subject],
    difficulty,
    difficultyLabel:
      difficulty <= 3 ? "Pemula" : difficulty <= 7 ? "Penjelajah" : "Pemikir",
  };

  // ✅ MATH = MCQ (tetap seperti sekarang)
  if (subject === "math") {
    const q = makeMathQuestion({ difficulty, rng });
    return {
      ...base,
      type: "mcq",
      ...q, // harus mengandung: prompt, choices, correctChoiceId, hint?
    };
  }

  // ✅ BAHASA = Drag & Drop (susun kata)
  if (subject === "bahasa") {
    const q = makeBahasaQuestion({ difficulty, rng });

    // makeBahasaQuestion HARUS mengembalikan:
    // { prompt, hint?, bank: string[], answer: string[] }
    return {
      ...base,
      type: "drag_order",
      ...q,
    };
  }

  // ✅ IPA = Drag & Drop (urutkan langkah)
  const q = makeIpaQuestion({ difficulty, rng });

  // makeIpaQuestion HARUS mengembalikan:
  // { prompt, hint?, bank: string[], answer: string[] }
  return {
    ...base,
    type: "drag_order",
    ...q,
  };
}