// Simple seeded RNG (mulberry32)
export function makeRng(seed: number) {
    let t = seed >>> 0;
    return function rng() {
      t += 0x6d2b79f5;
      let x = t;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  }
  
  export function randInt(rng: () => number, min: number, max: number) {
    return Math.floor(rng() * (max - min + 1)) + min;
  }
  
  export function pickOne<T>(rng: () => number, arr: T[]): T {
    return arr[Math.floor(rng() * arr.length)];
  }
  
  // Seed harian berdasarkan Asia/Jakarta tanpa library
  export function seedFromTodayJakarta(): number {
    // Pakai locale time Asia/Jakarta via Intl
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
  
    const y = parts.find((p) => p.type === "year")?.value ?? "1970";
    const m = parts.find((p) => p.type === "month")?.value ?? "01";
    const d = parts.find((p) => p.type === "day")?.value ?? "01";
  
    // YYYYMMDD to number
    return Number(`${y}${m}${d}`);
  }
  