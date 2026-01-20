"use client";

import type { Sticker } from "@/hooks/useStickers";

export default function StickerRewardModal({
  sticker,
  onClose,
}: {
  sticker: Sticker;
  onClose: () => void;
}) {
  const rarityLabel =
    sticker.rarity === "epic" ? "EPIC 🌈" : sticker.rarity === "rare" ? "RARE 💎" : "COMMON 🎈";

  const glow =
    sticker.rarity === "epic"
      ? "rgba(255,122,69,0.25)"
      : sticker.rarity === "rare"
      ? "rgba(77,150,255,0.25)"
      : "rgba(55,201,123,0.20)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: "min(520px, 92vw)",
          textAlign: "center",
          position: "relative",
          boxShadow: `0 18px 60px ${glow}`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="badge" style={{ display: "inline-block" }}>
          🎁 Kamu dapat STIKER!
        </div>

        <div style={{ marginTop: 14, fontSize: 84, lineHeight: 1 }}>
          {sticker.emoji}
        </div>

        <div style={{ fontWeight: 900, fontSize: 24, marginTop: 10 }}>
          {sticker.name}
        </div>

        <div className="muted" style={{ marginTop: 6 }}>
          Kelangkaan: <b>{rarityLabel}</b>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, justifyContent: "center" }}>
          <button className="btn btnGood" onClick={onClose}>
            Oke! ✅
          </button>
          <a className="btn btnPrimary" href="/stickers">
            Lihat Koleksi ➜
          </a>
        </div>
      </div>
    </div>
  );
}
