"use client";

import { useCallback } from "react";
import { useLocalStorageState } from "./useLocalStorage";
import { seedFromTodayJakarta } from "@/engine/rng";
import { clamp } from "@/engine/difficulty";

type Progress = {
  coins: number;
  skill: { math: number; bahasa: number; ipa: number };
  streak: { correctInRow: number; wrongInRow: number };
  daily: { lastDayKey: number; doneCount: number };
};

const KEY = "edukids_progress_v1";

const DEFAULT: Progress = {
  coins: 0,
  skill: { math: 1, bahasa: 1, ipa: 1 },
  streak: { correctInRow: 0, wrongInRow: 0 },
  daily: { lastDayKey: 0, doneCount: 0 },
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorageState<Progress>(KEY, DEFAULT);

  const bumpCoins = useCallback((amount: number) => {
    setProgress((p) => ({ ...p, coins: Math.max(0, p.coins + amount) }));
  }, [setProgress]);

  const recordResult = useCallback((subject: keyof Progress["skill"], correct: boolean) => {
    setProgress((p) => {
      const correctInRow = correct ? p.streak.correctInRow + 1 : 0;
      const wrongInRow = correct ? 0 : p.streak.wrongInRow + 1;

      // update skill slowly: every 3 correct -> +1, every 3 wrong -> -1 (optional)
      let nextSkill = p.skill[subject];
      if (correctInRow > 0 && correctInRow % 3 === 0) nextSkill += 1;
      if (wrongInRow > 0 && wrongInRow % 3 === 0) nextSkill -= 1;

      nextSkill = clamp(nextSkill, 1, 10);

      // daily count increments only when correct (handled elsewhere too),
      // but we keep it here simple: only track via ensureDailyReset + external set if you want.
      const today = seedFromTodayJakarta();
      const daily = p.daily.lastDayKey === today
        ? { ...p.daily }
        : { lastDayKey: today, doneCount: 0 };

      return {
        ...p,
        streak: { correctInRow, wrongInRow },
        skill: { ...p.skill, [subject]: nextSkill },
        daily,
      };
    });
  }, [setProgress]);

  const ensureDailyReset = useCallback(() => {
    const today = seedFromTodayJakarta();
    setProgress((p) => {
      if (p.daily.lastDayKey === today) return p;
      return { ...p, daily: { lastDayKey: today, doneCount: 0 }, streak: { correctInRow: 0, wrongInRow: 0 } };
    });
  }, [setProgress]);

  const resetAll = useCallback(() => setProgress(DEFAULT), [setProgress]);

  return {
    progress,
    bumpCoins,
    recordResult,
    ensureDailyReset,
    resetAll,
  };
}
