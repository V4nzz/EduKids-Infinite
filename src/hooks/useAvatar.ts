"use client";

import { useEffect, useMemo, useState } from "react";

export type AvatarId = "bear" | "cat" | "fox" | "panda" | "rabbit" | "robot";

export type AvatarProfile = {
  name: string;
  avatarId: AvatarId;
};

const STORAGE_KEY = "edukids_avatar_v1";

const DEFAULT_PROFILE: AvatarProfile = {
  name: "Teman Kecil",
  avatarId: "bear",
};

export const AVATARS: { id: AvatarId; label: string; emoji: string; color: string }[] = [
  { id: "bear", label: "Kiko Beruang", emoji: "🧸", color: "rgba(255,122,69,0.18)" },
  { id: "cat", label: "Mimi Kucing", emoji: "🐱", color: "rgba(77,150,255,0.18)" },
  { id: "fox", label: "Foxy Rubah", emoji: "🦊", color: "rgba(255,200,80,0.18)" },
  { id: "panda", label: "Panda", emoji: "🐼", color: "rgba(0,0,0,0.06)" },
  { id: "rabbit", label: "Bunny", emoji: "🐰", color: "rgba(142,124,255,0.18)" },
  { id: "robot", label: "Robo", emoji: "🤖", color: "rgba(55,201,123,0.18)" },
];

export function useAvatar() {
  const [profile, setProfile] = useState<AvatarProfile>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AvatarProfile;
        if (parsed?.name && parsed?.avatarId) setProfile(parsed);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {}
  }, [profile, loaded]);

  const currentAvatar = useMemo(() => {
    return AVATARS.find((a) => a.id === profile.avatarId) ?? AVATARS[0];
  }, [profile.avatarId]);

  return { profile, setProfile, loaded, currentAvatar };
}
