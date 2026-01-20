"use client";

import { useMemo, useState } from "react";
import { AVATARS, AvatarId, useAvatar } from "@/hooks/useAvatar";

export default function AvatarPicker({
  onDone,
}: {
  onDone?: () => void;
}) {
  const { profile, setProfile, currentAvatar } = useAvatar();
  const [name, setName] = useState(profile.name);

  const selected = useMemo(() => currentAvatar, [currentAvatar]);

  function save() {
    const clean = name.trim().slice(0, 16) || "Teman Kecil";
    setProfile({ ...profile, name: clean });
    onDone?.();
  }

  return (
    <div className="card" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 20 }}>Pilih Karakter 🎭</div>
          <div className="muted" style={{ marginTop: 6, lineHeight: 1.5 }}>
            Nama dan avatar ini tersimpan di perangkat ini (tanpa akun).
          </div>
        </div>
        <div className="badge">
          {selected.emoji} {profile.name}
        </div>
      </div>

      <div className="hr" />

      <div className="row" style={{ alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <label style={{ fontWeight: 800 }}>Nama:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama kamu…"
          className="kidInput"
          maxLength={16}
        />
        <button className="btn btnGood" onClick={save}>Simpan ✅</button>
      </div>

      <div style={{ marginTop: 14 }} className="avatarGrid">
        {AVATARS.map((a) => {
          const active = a.id === profile.avatarId;
          return (
            <button
              key={a.id}
              className={`avatarCard ${active ? "avatarActive" : ""}`}
              onClick={() => setProfile({ ...profile, avatarId: a.id as AvatarId })}
              type="button"
            >
              <div className="avatarEmoji" style={{ background: a.color }}>{a.emoji}</div>
              <div style={{ fontWeight: 900 }}>{a.label}</div>
              <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                {active ? "Dipilih ✅" : "Pilih"}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
