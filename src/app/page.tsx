import Link from "next/link";

const worlds = [
  {
    title: "Hutan Ceria",
    desc: "Latihan cepat dengan soal acak dan reward kecil.",
    href: "/play",
    emoji: "🌳",
    tag: "Free Play",
    cls: "worldMath",
    btn: "btnPrimary",
  },
  {
    title: "Misi Harian",
    desc: "Target 7 bintang/hari. Besok ganti otomatis.",
    href: "/daily",
    emoji: "🗓️",
    tag: "Daily",
    cls: "worldDaily",
    btn: "btnGood",
  },
  {
    title: "Pojok Orang Tua",
    desc: "Lihat progres belajar di perangkat ini.",
    href: "/parent",
    emoji: "👪",
    tag: "Info",
    cls: "worldParent",
    btn: "",
  },
];

export default function HomePage() {
  return (
    <div className="container">
      <div className="card kidScene">
        {/* dekor */}
        <div className="cloud" style={{ left: 20 }} />
        <div className="cloud" style={{ left: 220, top: 44, opacity: 0.8, animationDuration: "18s" }} />
        <div className="balloon" />

        {/* header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div className="kidTitle">EduKids Infinite</div>
            <div className="kidSub muted" style={{ marginTop: 10 }}>
              Petualangan belajar tanpa tamat ✨ — main sebentar tapi balik lagi besok.
            </div>
          </div>
          <div className="badge">💾 Tanpa akun • LocalStorage</div>
        </div>

        <div className="hr" />

        {/* mascot bubble */}
        <div className="card" style={{ background: "rgba(255,255,255,0.72)" }}>
          <div className="row" style={{ alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18 }}>🧸 Halo! Aku Kiko.</div>
              <div className="muted" style={{ marginTop: 6, lineHeight: 1.5 }}>
                Pilih dunia belajar dulu ya—habis itu kita kumpulin bintang ⭐
              </div>
            </div>
            <div className="badge">⭐ Target: 7 bintang/hari</div>
          </div>
        </div>

        <div className="hr" />

        {/* worlds */}
        <div className="worldGrid">
          {worlds.map((w) => (
            <div key={w.title} className={`worldCute ${w.cls}`}>
              <div className="shine" />
              <div className="tag">{w.tag}</div>

              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div className="icon">{w.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: 18 }}>{w.title}</div>
                  <div className="muted" style={{ marginTop: 6, lineHeight: 1.45 }}>
                    {w.desc}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                <Link className={`btn ${w.btn}`} href={w.href}>
                  Masuk ➜
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="hr" />

        {/* footer badges */}
        <div className="row">
          <span className="badge">🎮 Fun UI</span>
          <span className="badge">🧠 Adaptive</span>
          <span className="badge">🔁 Soal beda</span>
          <span className="badge">🎁 Reward</span>
        </div>
      </div>
    </div>
  );
}
