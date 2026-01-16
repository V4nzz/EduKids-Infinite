import Link from "next/link";

const worlds = [
  { title: "Hutan Ceria", desc: "Latihan cepat dengan soal acak dan reward kecil.", href: "/play", emoji: "🌳", tone: "btnPrimary" },
  { title: "Misi Harian", desc: "Target 7 benar/hari. Besok ganti otomatis.", href: "/daily", emoji: "🗓️", tone: "btnGood" },
  { title: "Pojok Orang Tua", desc: "Lihat progres di perangkat ini.", href: "/parent", emoji: "👪", tone: "" },
];

export default function HomePage() {
  return (
    <>
      {/* BACKGROUND GAME */}
      <div className="bgKids" aria-hidden="true">
        <div className="stars" />
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      {/* KONTEN */}
      <div className="container">
        <div className="card" style={{ overflow: "hidden", position: "relative" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 34 }}>EduKids Infinite</h1>
              <p className="muted" style={{ marginTop: 8, lineHeight: 1.55 }}>
                Petualangan belajar tanpa tamat ✨ — main sebentar tapi balik lagi besok.
              </p>
            </div>
            <div className="badge">💾 Tanpa akun • LocalStorage</div>
          </div>

          {/* Mascot card (poin 4) */}
          <div className="card" style={{ marginTop: 14, background: "rgba(0,0,0,0.10)" }}>
            <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>🧸 Halo! Aku Kiko.</div>
                <div className="muted" style={{ marginTop: 6, lineHeight: 1.45 }}>
                  Pilih dunia belajar dulu ya—habis itu kita kumpulin bintang ⭐
                </div>
              </div>
              <div className="badge">⭐ Target: 7 bintang/hari</div>
            </div>
          </div>

          <div className="hr" />

          <div className="gridWorld">
            {worlds.map((w) => (
              <div key={w.title} className="worldCard">
                <div className="worldEmoji">{w.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{w.title}</div>
                  <div className="muted" style={{ marginTop: 6, lineHeight: 1.45 }}>{w.desc}</div>
                </div>
                <Link className={`btn ${w.tone}`} href={w.href}>
                  Masuk ➜
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
