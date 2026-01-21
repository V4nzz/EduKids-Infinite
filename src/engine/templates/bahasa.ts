import { pickOne } from "../rng";

type MakeParams = { difficulty: number; rng: () => number };

function shuffle<T>(rng: () => number, arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ✅ mode susun huruf (kelas 1–2)
const wordsEasy = [
  { emoji: "🍎", word: "APEL" },
  { emoji: "🐱", word: "KUCING" },
  { emoji: "🏫", word: "SEKOLAH" },
  { emoji: "🚲", word: "SEPEDA" },
  { emoji: "🌧️", word: "HUJAN" },
  { emoji: "⭐", word: "BINTANG" },
];

const sentencesEasy = [
  ["Aku", "suka", "apel"],
  ["Ibu", "pergi", "ke", "pasar"],
  ["Adik", "minum", "air"],
  ["Kami", "belajar", "di", "sekolah"],
  ["Kucing", "lari", "cepat"],
];

const sentencesMedium = [
  ["Aku", "makan", "nasi", "di", "rumah"],
  ["Ayah", "naik", "sepeda", "ke", "toko"],
  ["Kami", "bermain", "bola", "di", "lapangan"],
  ["Bunga", "itu", "wangi", "sekali"],
  ["Hari", "ini", "cuaca", "cerah"],
];

const sentencesHard = [
  ["Setelah", "hujan", "reda,", "pelangi", "muncul", "di", "langit"],
  ["Sebelum", "tidur,", "aku", "membaca", "buku", "cerita"],
  ["Di", "sekolah,", "kami", "belajar", "dengan", "gembira"],
  ["Jika", "rajin", "berlatih,", "kamu", "akan", "semakin", "pintar"],
];

export function makeBahasaQuestion({ difficulty, rng }: MakeParams) {
  // ✅ difficulty rendah: SUSUN HURUF
  if (difficulty <= 3) {
    const pick = pickOne(rng, wordsEasy);
    const answer = pick.word.split(""); // urutan benar huruf
    const bank = shuffle(rng, answer);

    return {
      prompt: `Susun huruf menjadi kata yang benar: ${pick.emoji}`,
      hint: "Tarik huruf ke kotak urutan dari kiri ke kanan.",
      bank,
      answer,
    };
  }

  // ✅ difficulty menengah/tinggi: SUSUN KATA (kalimat)
  const pool =
    difficulty <= 7 ? sentencesMedium : sentencesHard;

  // biar tetap ada variasi mudah juga:
  const mixedPool =
    difficulty <= 5 ? [...sentencesEasy, ...pool] : pool;

  const answer = pickOne(rng, mixedPool);
  const bank = shuffle(rng, answer);

  const prompt =
    difficulty <= 7
      ? "Tarik kata ke urutan yang tepat untuk membentuk kalimat:"
      : "Susun kalimat dengan urutan yang benar (perhatikan tanda baca):";

  const hint =
    "Seret kata dari bawah ke kotak urutan. Kamu bisa pindahkan lagi kalau salah urutan.";

  return { prompt, hint, bank, answer };
}
