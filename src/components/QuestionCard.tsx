"use client";

import { useEffect, useMemo, useState } from "react";
import type { Question } from "@/engine/types";
import DragOrderCard from "@/components/DragOrderCard";

type FX = "idle" | "correct" | "wrong";

export default function QuestionCard({
  question,
  onAnswer,
  onNext,
}: {
  question: Question;
  onAnswer: (choiceId: string) => boolean; // ✅ return correct
  onNext: () => void;
}) {
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [fx, setFx] = useState<FX>("idle");

  useEffect(() => {
    setLocked(false);
    setPicked(null);
    setFx("idle");
  }, [question.id]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter" && locked) onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [locked, onNext]);

  function lockAndAnswer(id: string) {
    if (locked) return;
    setPicked(id);
    setLocked(true);

    const correct = onAnswer(id);
    setFx(correct ? "correct" : "wrong");
  }

  const fxClass =
    fx === "correct" ? "fxCorrect" : fx === "wrong" ? "fxWrong" : "";

  // ======================
  // DRAG MODE
  // ======================
  if (question.type === "drag_order") {
    return (
      <div className={`card fxWrap ${fxClass}`}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <span className="badge">🎒 {question.subjectLabel}</span>
          <span className="badge">⚡ Mode: {question.difficultyLabel}</span>
        </div>

        <h2 style={{ marginTop: 14, marginBottom: 8, fontSize: 26 }}>
          {question.prompt}
        </h2>
        {question.hint && (
          <p className="muted" style={{ marginTop: 0, lineHeight: 1.5 }}>
            Hint: {question.hint}
          </p>
        )}

        <DragOrderCard
          question={question}
          locked={locked}
          onResetLock={() => {
            setLocked(false);
            setFx("idle");
            setPicked(null);
          }}
          onSubmit={(encoded) => lockAndAnswer(encoded)}
        />

        {locked && <div className="hr" />}

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

  // ======================
  // MCQ MODE
  // ======================
  const choices = useMemo(() => question.choices, [question.choices]);

  return (
    <div className={`card fxWrap ${fxClass}`}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <span className="badge">🎒 {question.subjectLabel}</span>
        <span className="badge">⚡ Mode: {question.difficultyLabel}</span>
      </div>

      <h2 style={{ marginTop: 14, marginBottom: 8, fontSize: 26 }}>
        {question.prompt}
      </h2>
      {question.hint && (
        <p className="muted" style={{ marginTop: 0, lineHeight: 1.5 }}>
          Hint: {question.hint}
        </p>
      )}

      <div className="choiceGrid" style={{ marginTop: 10 }}>
        {choices.map((c) => {
          const isPicked = picked === c.id;

          // tombol yang dipilih ikut fx benar/salah
          const cls = isPicked
            ? `btn ${fx === "correct" ? "fxCorrect" : fx === "wrong" ? "fxWrong" : "btnPrimary"}`
            : "btn";

          return (
            <button key={c.id} className={cls} onClick={() => lockAndAnswer(c.id)}>
              {c.label}
            </button>
          );
        })}
      </div>

      {locked && <div className="hr" />}

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
