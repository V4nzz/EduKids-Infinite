"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import GameShell from "@/components/GameShell";
import QuestionCard from "@/components/QuestionCard";
import RewardToast from "@/components/RewardToast";
import { makeRng, seedFromTodayJakarta } from "@/engine/rng";
import { generateQuestion } from "@/engine/generateQuestion";
import { evaluateAnswer } from "@/engine/evaluate";
import { nextDifficulty } from "@/engine/difficulty";
import { useProgress } from "@/hooks/useProgress";
import ProgressBar from "@/components/ProgressBar";
import { useStickers } from "@/hooks/useStickers";
import StickerRewardModal from "@/components/StickerRewardModal";
import StickerProgress from "@/components/StickerProgress";

export default function DailyPage() {
  const { progress, bumpCoins, recordResult, ensureDailyReset } = useProgress();

  useEffect(() => {
    ensureDailyReset();
  }, [ensureDailyReset]);

  const seed = useMemo(() => seedFromTodayJakarta(), []);
  const rng = useMemo(() => makeRng(seed), [seed]);

  const [toast, setToast] = useState<{ kind: "good" | "bad"; text: string } | null>(null);

  // daily uses a stable seed, but difficulty follows stored skill
  const [difficulty, setDifficulty] = useState(progress.skill.math || 1);
  const [done, setDone] = useState(progress.daily.doneCount || 0);

  const dailyTarget = 7; // target misi harian

  const [question, setQuestion] = useState(() =>
    generateQuestion({ subject: "math", difficulty, rng })
  );

  const { onCorrectAnswer, progressToNext, every } = useStickers();
  const [rewardSticker, setRewardSticker] = useState<any | null>(null);

  function nextQ(nextDiff = difficulty) {
    setQuestion(generateQuestion({ subject: "math", difficulty: nextDiff, rng }));
  }

  function onAnswer(choiceId: string) {
    const result = evaluateAnswer(question, choiceId);
    recordResult("math", result.correct);

    const updated = nextDifficulty({
      current: difficulty,
      correct: result.correct,
      streak: progress.streak,
    });
    setDifficulty(updated.newDifficulty);

    if (result.correct) {
      bumpCoins(1);
      setToast({ kind: "good", text: result.feedback });

      // progress misi harian
      const newDone = Math.min(dailyTarget, done + 1);
      setDone(newDone);

      // 🎁 STIKER REWARD (tiap 5 benar)
      const reward = onCorrectAnswer({ every: 5 });
      if (reward) setRewardSticker(reward);
    } else {
      setToast({ kind: "bad", text: result.feedback });
    }
    return result.correct;
  }

  const finished = done >= dailyTarget;

  return (
    <GameShell
      title="Misi Harian"
      subtitle={`Target hari ini: ${dailyTarget} jawaban benar. Seed stabil: ${seed}`}
      right={<Link className="btn" href="/">⬅️ Home</Link>}
      badges={[
        `Progress: ${done}/${dailyTarget}`,
        `Difficulty: ${difficulty}`,
        `Koin: ${progress.coins}`,
      ]}
    >
      <div className="card" style={{ marginBottom: 14 }}>
        <ProgressBar value={done} max={dailyTarget} />
        <p className="muted" style={{ marginTop: 10 }}>
          Selesaikan target untuk dapat “hadiah harian”.
        </p>
      </div>

      {/* 🎁 Progress menuju stiker */}
      <StickerProgress value={progressToNext} total={every} />

      {finished ? (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🎉 Hebat! Misi harian selesai.</h2>
          <p className="muted" style={{ lineHeight: 1.5 }}>
            Kamu tetap bisa latihan di{" "}
            <Link className="btn btnPrimary" href="/play">
              Free Play
            </Link>
            . Besok misi harian akan berubah otomatis.
          </p>
        </div>
      ) : (
        <QuestionCard
          question={question}
          onAnswer={onAnswer}
          onNext={() => nextQ(difficulty)}
        />
      )}

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