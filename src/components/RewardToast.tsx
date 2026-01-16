"use client";

import { useEffect, useMemo } from "react";

export default function RewardToast({
  kind,
  text,
  onDone,
}: {
  kind: "good" | "bad";
  text: string;
  onDone: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  const border =
    kind === "good" ? "rgba(46,229,157,0.35)" : "rgba(255,92,124,0.35)";
  const title = kind === "good" ? "✅ Benar!" : "❌ Belum tepat";

  const pieces = useMemo(() => {
    if (kind !== "good") return [];
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 120,
      // warna random via hsl tanpa nentuin palette kaku
      bg: `hsl(${Math.floor(Math.random() * 360)}, 85%, 65%)`,
    }));
  }, [kind]);

  return (
    <>
      {kind === "good" && (
        <div className="confetti" aria-hidden="true">
          {pieces.map((p) => (
            <span
              key={p.id}
              style={{
                left: `${p.left}vw`,
                background: p.bg,
                animationDelay: `${p.delay}ms`,
              }}
            />
          ))}
        </div>
      )}

      <div className="toast" style={{ borderColor: border }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
        <div className="muted">{text}</div>
      </div>
    </>
  );
}
