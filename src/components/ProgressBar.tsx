export default function ProgressBar({ value, max }: { value: number; max: number }) {
    const pct = Math.max(0, Math.min(1, value / max)) * 100;
    return (
      <div style={{ width: "100%" }}>
        <div className="muted" style={{ fontSize: 13, marginBottom: 6 }}>
          Progress: {value}/{max}
        </div>
        <div style={{ height: 12, borderRadius: 999, border: "1px solid var(--border)", background: "rgba(255,255,255,0.06)" }}>
          <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: "rgba(122,167,255,0.55)" }} />
        </div>
      </div>
    );
  }
  