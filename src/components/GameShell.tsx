"use client";

import React from "react";
import Link from "next/link";
import { useAvatar } from "@/hooks/useAvatar";

export default function GameShell({
  title,
  subtitle,
  right,
  badges,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  badges?: string[];
  children: React.ReactNode;
}) {
  const { profile, currentAvatar, loaded } = useAvatar();

  return (
    <div className="container">
      <div className="card">
        <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0 }}>{title}</h1>
            {subtitle && (
              <p className="muted" style={{ marginTop: 8, lineHeight: 1.5 }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* RIGHT AREA: avatar + custom right */}
          <div className="row" style={{ alignItems: "center" }}>
          <Link className="badge" href="/avatar" style={{ textDecoration: "none" }}>
              {loaded ? `${currentAvatar.emoji} ${profile.name}` : "🎭 Karakter"}
            </Link>
            {right}
          </div>
        </div>

        {badges && badges.length > 0 && (
          <>
            <div className="hr" />
            <div className="row">
              {badges.map((b) => (
                <span className="badge" key={b}>
                  {b}
                </span>
              ))}
            </div>
          </>
        )}

        <div className="hr" />
        {children}
      </div>
    </div>
  );
}