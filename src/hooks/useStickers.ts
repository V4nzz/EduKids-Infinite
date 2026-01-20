"use client";

import { useEffect, useMemo, useState } from "react";

export type Rarity = "common" | "rare" | "epic";

export type Sticker = {
  id: string;
  name: string;
  emoji: string;
  rarity: Rarity;
};

type StickerState = {
  owned: Record<string, number>; // stickerId -> count
  totalUnlocked: number;
  correctSinceLast: number; // counter untuk reward
};

const STORAGE_KEY = "edukids_stickers_v1";

const DEFAULT_STATE: StickerState = {
  owned: {},
  totalUnlocked: 0,
  correctSinceLast: 0,
};

export const STICKERS: Sticker[] = [
  // Common
  { id: "c-star", name: "Bintang Ceria", emoji: "⭐", rarity: "common" },
  { id: "c-apple", name: "Apel Pintar", emoji: "🍎", rarity: "common" },
  { id: "c-book", name: "Buku Hebat", emoji: "📚", rarity: "common" },
  { id: "c-pencil", name: "Pensil Juara", emoji: "✏️", rarity: "common" },
  { id: "c-flower", name: "Bunga Manis", emoji: "🌸", rarity: "common" },
  { id: "c-kite", name: "Layang Seru", emoji: "🪁", rarity: "common" },

  // Rare
  { id: "r-rocket", name: "Roket Belajar", emoji: "🚀", rarity: "rare" },
  { id: "r-unicorn", name: "Unicorn Baik", emoji: "🦄", rarity: "rare" },
  { id: "r-dino", name: "Dino Keren", emoji: "🦖", rarity: "rare" },
  { id: "r-magic", name: "Sihir Fokus", emoji: "✨", rarity: "rare" },

  // Epic
  { id: "e-trophy", name: "Piala Legenda", emoji: "🏆", rarity: "epic" },
  { id: "e-crown", name: "Mahkota Jenius", emoji: "👑", rarity: "epic" },
];

function pickWeighted(rng: () => number, items: Sticker[]) {
  // weights: common 70%, rare 25%, epic 5%
  const roll = rng();
  let rarity: Rarity = "common";
  if (roll > 0.95) rarity = "epic";
  else if (roll > 0.70) rarity = "rare";

  const pool = items.filter((s) => s.rarity === rarity);
  return pool[Math.floor(rng() * pool.length)];
}

function makeRng(seed: number) {
  // simple deterministic RNG for repeatable-ish pick
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let x = t;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export function useStickers() {
  const [state, setState] = useState<StickerState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as StickerState);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, loaded]);

  const ownedList = useMemo(() => {
    return STICKERS
      .map((s) => ({ ...s, count: state.owned[s.id] ?? 0 }))
      .filter((s) => s.count > 0)
      .sort((a, b) => (b.rarity.localeCompare(a.rarity) || b.count - a.count));
  }, [state.owned]);

    const every = 5; // samakan dengan reward interval kamu
    const progressToNext = state.correctSinceLast ?? 0; // 0..(every-1)

  function addSticker(sticker: Sticker) {
    setState((prev) => ({
      ...prev,
      owned: { ...prev.owned, [sticker.id]: (prev.owned[sticker.id] ?? 0) + 1 },
      totalUnlocked: prev.totalUnlocked + 1,
    }));
  }

  /**
   * Panggil ini SETIAP jawaban benar.
   * Akan mengembalikan sticker jika sudah mencapai target.
   */
  function onCorrectAnswer({ every = 5 }: { every?: number }) {
    if (!loaded) return null;
  
    const nextCorrect = (state.correctSinceLast ?? 0) + 1;
  
    // belum waktunya reward
    if (nextCorrect < every) {
      setState((prev) => ({ ...prev, correctSinceLast: nextCorrect }));
      return null;
    }
  
    // waktunya reward
    const rng = makeRng(Date.now() + (state.totalUnlocked ?? 0) * 97);
    const picked = pickWeighted(rng, STICKERS);
  
    setState((prev) => ({
      ...prev,
      correctSinceLast: 0,
      owned: {
        ...prev.owned,
        [picked.id]: (prev.owned[picked.id] ?? 0) + 1,
      },
      totalUnlocked: (prev.totalUnlocked ?? 0) + 1,
    }));
  
    return picked;
  }    

  function resetStickers() {
    setState(DEFAULT_STATE);
  }

  return {
    state,
    loaded,
    ownedList,
    onCorrectAnswer,
    resetStickers,
    progressToNext,
    every,
  };
}
