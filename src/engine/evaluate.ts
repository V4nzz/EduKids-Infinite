import type { Question } from "./types";

export function evaluateAnswer(q: Question, chosenId: string) {
  const correct = chosenId === q.correctChoiceId;

  const feedback = correct
    ? "Mantap! Lanjut soal berikutnya ya."
    : q.hint
      ? `Coba lagi. ${q.hint}`
      : "Coba pelan-pelan ya, kamu pasti bisa!";

  return { correct, feedback };
}
