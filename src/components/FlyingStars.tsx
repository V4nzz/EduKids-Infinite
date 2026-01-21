"use client";

import { useCallback, useState } from "react";

type Star = {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  delay: number;
  dur: number;
  rot: number;
  size: number;
};

export default function FlyingStars({
  getTargetRect,
}: {
  getTargetRect: () => DOMRect | null;
}) {
  const [stars, setStars] = useState<Star[]>([]);

  const launch = useCallback(
    (fromRect: DOMRect, count = 7) => {
      const toRect = getTargetRect();
      if (!toRect) return;

      const fromX = fromRect.left + fromRect.width / 2;
      const fromY = fromRect.top + fromRect.height / 2;

      const toX = toRect.left + toRect.width / 2;
      const toY = toRect.top + toRect.height / 2;

      const dxBase = toX - fromX;
      const dyBase = toY - fromY;

      const now = Date.now();
      const batch: Star[] = Array.from({ length: count }).map((_, i) => {
        const spread = 26; // sebaran acak
        const jitterX = (Math.random() - 0.5) * spread;
        const jitterY = (Math.random() - 0.5) * spread;

        return {
          id: `${now}-${i}-${Math.floor(Math.random() * 1e9)}`,
          x: fromX,
          y: fromY,
          dx: dxBase + jitterX,
          dy: dyBase + jitterY,
          delay: Math.random() * 0.06, // 0-60ms
          dur: 0.55 + Math.random() * 0.25, // 0.55 - 0.8s
          rot: (Math.random() * 2 - 1) * 35,
          size: 14 + Math.floor(Math.random() * 10),
        };
      });

      setStars((prev) => [...prev, ...batch]);

      // bersihin setelah anim selesai
      const maxDur = Math.max(...batch.map((s) => s.dur + s.delay));
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => !batch.some((b) => b.id === s.id)));
      }, Math.ceil(maxDur * 1000) + 120);
    },
    [getTargetRect]
  );

  return (
    <>
      {/* Expose launch via window (biar gampang dipanggil dari parent) */}
      <script
        dangerouslySetInnerHTML={{
          __html: "",
        }}
      />
      <div className="flyLayer" aria-hidden="true">
        {stars.map((s) => (
          <span
            key={s.id}
            className="flyStar"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              ["--dx" as any]: `${s.dx}px`,
              ["--dy" as any]: `${s.dy}px`,
              ["--dur" as any]: `${s.dur}s`,
              ["--delay" as any]: `${s.delay}s`,
              ["--rot" as any]: `${s.rot}deg`,
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* helper function dipakai parent */}
      {/* @ts-ignore */}
      <StarLauncher expose={launch} />
    </>
  );
}

// Komponen kecil buat “expose” fungsi launch ke parent via props callback
function StarLauncher({ expose }: { expose: (fromRect: DOMRect, count?: number) => void }) {
  // @ts-ignore
  if (typeof window !== "undefined") window.__launchStars = expose;
  return null;
}
