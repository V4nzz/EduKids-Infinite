"use client";

export default function StickerProgress({
  value,
  total,
}: {
  value: number;
  total: number;
}) {
  const v = Math.max(0, Math.min(value, total));
  const pct = Math.round((v / total) * 100);

  return (
    <div className="stickerProg">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 900 }}>🎁 Menuju Stiker</div>
        <div className="badge">⭐ {v}/{total}</div>
      </div>

      <div className="stickerBar">
        <div className="stickerFill" style={{ width: `${pct}%` }} />
      </div>

      <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
        Jawab benar <b>{Math.max(0, total - v)}</b> lagi untuk dapat stiker!
      </div>
    </div>
  );
}
