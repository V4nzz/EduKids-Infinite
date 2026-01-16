export function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }
  
  export function nextDifficulty({
    current,
    correct,
    streak,
  }: {
    current: number;
    correct: boolean;
    streak: { correctInRow: number; wrongInRow: number };
  }) {
    // aturan sederhana tapi efektif
    let next = current;
  
    // streak yang ada di progress akan di-update setelah recordResult,
    // tapi kita tetap bisa pakai aturan berbasis "jawaban sekarang".
    if (correct) {
      // bila sudah sering benar, naikkan sedikit
      if (streak.correctInRow + 1 >= 3) next = current + 1;
    } else {
      if (streak.wrongInRow + 1 >= 2) next = current - 1;
    }
  
    next = clamp(next, 1, 10);
    return { newDifficulty: next };
  }
  