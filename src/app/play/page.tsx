"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GameShell from "@/components/GameShell";
import QuestionCard from "@/components/QuestionCard";
import RewardToast from "@/components/RewardToast";
import { makeRng } from "@/engine/rng";
import { generateQuestion } from "@/engine/generateQuestion";
import { evaluateAnswer } from "@/engine/evaluate";
import { nextDifficulty } from "@/engine/difficulty";
import { useProgress } from "@/hooks/useProgress";
import type { Subject } from "@/engine/types";
import { useStickers } from "@/hooks/useStickers";
import StickerRewardModal from "@/components/StickerRewardModal";
import StickerProgress from "@/components/StickerProgress";

const subjectOptions: { id: Subject; label: string; emoji: string }[] = [
  { id: "math", label: "Matematika", emoji: "🧮" },
  { id: "bahasa", label: "Bahasa", emoji: "📖" },
  { id: "ipa", label: "IPA", emoji: "🌿" },
];

export default function PlayPage() {
  const { progress, bumpCoins, recordResult } = useProgress();
  const rng = useMemo(() => makeRng(Date.now()), []);

  const [subject, setSubject] = useState<Subject>("math");
  const [difficulty, setDifficulty] = useState(progress.skill.math || 1);

  const [toast, setToast] = useState<{ kind: "good" | "bad"; text: string } | null>(null);

  const [question, setQuestion] = useState(() =>
    generateQuestion({ subject, difficulty, rng })
  );

  const { onCorrectAnswer, progressToNext, every } = useStickers();
  const [rewardSticker, setRewardSticker] = useState<null | any>(null);

  function syncDifficultyFor(s: Subject) {
    const d = progress.skill[s] || 1;
    setDifficulty(d);
    setQuestion(generateQuestion({ subject: s, difficulty: d, rng }));
  }

  function nextQ(nextDiff = difficulty) {
    setQuestion(generateQuestion({ subject, difficulty: nextDiff, rng }));
  }

  function onAnswer(choiceId: string) {
    const result = evaluateAnswer(question, choiceId);
    recordResult(subject, result.correct);

    const updated = nextDifficulty({
      current: difficulty,
      correct: result.correct,
      streak: progress.streak,
    });
    setDifficulty(updated.newDifficulty);

    if (result.correct) {
      bumpCoins(1);
      setToast({ kind: "good", text: result.feedback });
    
      // 🎁 STIKER REWARD (tiap 5 benar)
      const reward = onCorrectAnswer({ every: 5 });
      console.log("reward:", reward);
      if (reward) setRewardSticker(reward);
    }    
  }

  return (
    <GameShell
      title="Free Play"
      subtitle="Pilih mapel, main tanpa batas. Soal selalu berbeda setiap sesi."
      right={<Link className="btn" href="/">⬅️ Home</Link>}
      badges={[
        `Mapel: ${subject}`,
        `Difficulty: ${difficulty}`,
        `Koin: ${progress.coins}`,
        `Streak: ${progress.streak.correctInRow}✓ / ${progress.streak.wrongInRow}✗`,
      ]}
    >
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 800, marginBottom: 10 }}>Pilih Mapel</div>
        <div className="row">
          {subjectOptions.map((s) => (
            <button
              key={s.id}
              className={`btn ${subject === s.id ? "btnPrimary" : ""}`}
              onClick={() => {
                setSubject(s.id);
                syncDifficultyFor(s.id);
              }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
        <p className="muted" style={{ marginTop: 10, lineHeight: 1.5 }}>
          Tips: mapel Bahasa & IPA ini versi awal. Nanti kita bikin lebih interaktif (drag-drop, susun kata).
        </p>
      </div>

      <StickerProgress value={progressToNext} total={every} />
      <QuestionCard
        question={question}
        onAnswer={onAnswer}
        onNext={() => nextQ(difficulty)}
      />

      {toast && (
        <RewardToast
          kind={toast.kind}
          text={toast.text}
          onDone={() => setToast(null)}
        />
      )}

      {rewardSticker && (
        <StickerRewardModal
          sticker={rewardSticker}
          onClose={() => setRewardSticker(null)}
        />
      )}

    </GameShell>
  );  
}