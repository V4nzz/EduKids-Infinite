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

// Bank kalimat sederhana (kelas 1–6) dengan variasi panjang berdasar difficulty
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
  const pool =
    difficulty <= 3 ? sentencesEasy : difficulty <= 7 ? sentencesMedium : sentencesHard;

  const answer = pickOne(rng, pool);

  // bank = urutan acak
  const bank = shuffle(rng, answer);

  const prompt =
    difficulty <= 3
      ? "Susun kata menjadi kalimat yang benar:"
      : difficulty <= 7
      ? "Tarik kata ke urutan yang tepat untuk membentuk kalimat:"
      : "Susun kalimat dengan urutan yang benar (perhatikan tanda baca):";

  const hint =
    "Seret kata dari bawah ke kotak urutan. Kamu bisa geser lagi kalau salah urutan.";

  return {
    prompt,
    hint,
    bank,
    answer,
  };
}