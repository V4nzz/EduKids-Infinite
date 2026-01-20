"use client";

import Link from "next/link";
import { STICKERS, useStickers } from "@/hooks/useStickers";

export default function StickersPage() {
  const { state, ownedList, loaded, resetStickers } = useStickers();

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Link className="btn" href="/">⬅️ Home</Link>
        <div className="badge">🎁 Koleksi Stiker</div>
      </div>

      <div className="card">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 22 }}>Album Stiker</div>
            <div className="muted" style={{ marginTop: 6 }}>
              Dapat stiker tiap <b>5</b> jawaban benar. (disimpan di perangkat ini)
            </div>
          </div>

          <div className="badge">
            Total: {loaded ? state.totalUnlocked : 0} • Unik: {loaded ? ownedList.length : 0}/{STICKERS.length}
          </div>
        </div>

        <div className="hr" />

        {/* Grid album */}
        <div className="stickerGrid">
          {STICKERS.map((s) => {
            const count = state.owned[s.id] ?? 0;
            const locked = count === 0;

            const border =
              s.rarity === "epic" ? "rgba(255,122,69,0.35)" :
              s.rarity === "rare" ? "rgba(77,150,255,0.35)" :
              "rgba(55,201,123,0.30)";

            return (
              <div
                key={s.id}
                className="stickerCard"
                style={{
                  borderColor: border,
                  opacity: locked ? 0.55 : 1,
                }}
              >
                <div style={{ fontSize: 44 }}>{locked ? "❓" : s.emoji}</div>
                <div style={{ fontWeight: 900, marginTop: 8 }}>
                  {locked ? "Terkunci" : s.name}
                </div>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                  {s.rarity.toUpperCase()} • x{count}
                </div>
              </div>
            );
          })}
        </div>

        <div className="hr" />

        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div className="muted">
            Tips: main “Misi Harian” biar cepat dapat stiker 😄
          </div>
          <button className="btn btnBad" onClick={resetStickers}>
            Reset Koleksi (dev) 🧹
          </button>
        </div>
      </div>
    </div>
  );
}
