"use client";

import { useEffect, useMemo, useState } from "react";
import type { Question } from "@/engine/types";

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
}: {
  question: Question;
  onAnswer: (choiceId: string) => void;
  onNext: () => void;
}) {
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setLocked(false);
    setPicked(null);
  }, [question.id]);

  const choices = useMemo(() => question.choices, [question.choices]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter" && locked) onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [locked, onNext]);

  function pick(id: string) {
    if (locked) return;
    setPicked(id);
    setLocked(true);
    onAnswer(id);
  }

  return (
    <div className="card">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <span className="badge">🎒 {question.subjectLabel}</span>
            <span className="badge">⚡ Mode: {question.difficultyLabel}</span>
        </div>

      <h2 style={{ marginTop: 14, marginBottom: 8, fontSize: 26 }}>{question.prompt}</h2>
      {question.hint && (
        <p className="muted" style={{ marginTop: 0, lineHeight: 1.5 }}>
          Hint: {question.hint}
        </p>
      )}

    <div className="choiceGrid" style={{ marginTop: 10 }}>
    {choices.map((c) => {
        const isPicked = picked === c.id;
        const cls = isPicked ? "btn btnPrimary" : "btn";
        return (
        <button key={c.id} className={cls} onClick={() => pick(c.id)}>
            {c.label}
        </button>
        );
    })}
    </div>

      {locked && (
        <div className="hr" />
      )}

      {locked && (
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <span className="muted">
            Tekan <span className="kbd">Enter</span> atau klik lanjut.
          </span>
          <button className="btn btnGood" onClick={onNext}>
            Lanjut ➜
          </button>
        </div>
      )}
    </div>
  );
}
