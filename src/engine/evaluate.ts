import type { Question } from "./types";

export function evaluateAnswer(q: Question, chosenId: string) {
  // ✅ DRAG & DROP: chosenId berisi "a||b||c"
  if (q.type === "drag_order") {
    const picked = chosenId.split("||").filter(Boolean);

    const correct =
      picked.length === q.answer.length &&
      picked.every((t, i) => t === q.answer[i]);

    const feedback = correct
      ? "Mantap! Urutannya benar 🎉"
      : q.hint
      ? `Coba lagi ya. ${q.hint}`
      : "Hmm, urutannya belum pas. Coba lagi!";

    return { correct, feedback };
  }

  // ✅ MCQ (lama)
  const correct = chosenId === q.correctChoiceId;

  const feedback = correct
    ? "Mantap! Lanjut soal berikutnya ya."
    : q.hint
    ? `Coba lagi. ${q.hint}`
    : "Coba pelan-pelan ya, kamu pasti bisa!";

  return { correct, feedback };
}
