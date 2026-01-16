"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";

export default function ParentPage() {
  const { progress, resetAll } = useProgress();

  return (
    <div className="container">
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>Progres (Perangkat Ini)</h1>
            <p className="muted" style={{ marginTop: 8 }}>
              Tanpa akun: data tersimpan di browser (localStorage).
            </p>
          </div>
          <Link className="btn" href="/">⬅️ Home</Link>
        </div>

        <div className="hr" />

        <div className="row">
          <span className="badge">Koin: {progress.coins}</span>
          <span className="badge">Math skill: {progress.skill.math}</span>
          <span className="badge">Benar berturut: {progress.streak.correctInRow}</span>
          <span className="badge">Salah berturut: {progress.streak.wrongInRow}</span>
          <span className="badge">Daily done: {progress.daily.doneCount}</span>
          <span className="badge">Last day: {progress.daily.lastDayKey}</span>
        </div>

        <div className="hr" />

        <button className="btn btnBad" onClick={resetAll}>
          Reset semua progres (local)
        </button>
      </div>
    </div>
  );
}
