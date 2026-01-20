"use client";

import Link from "next/link";
import AvatarPicker from "@/components/AvatarPicker";

export default function AvatarPage() {
  return (
    <div className="container">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Link className="btn" href="/">⬅️ Home</Link>
        <div className="badge">🎭 Avatar</div>
      </div>

      <AvatarPicker />
    </div>
  );
}
