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
// ✅ mode susun huruf (kelas 1–2)
const wordsEasy = [
  { emoji: "🍎", word: "APEL" },
  { emoji: "🍌", word: "PISANG" },
  { emoji: "🍊", word: "JERUK" },
  { emoji: "🍉", word: "SEMANGKA" },
  { emoji: "🍇", word: "ANGGUR" },
  { emoji: "🍓", word: "STROBERI" },
  { emoji: "🍍", word: "NANAS" },
  { emoji: "🥭", word: "MANGGA" },
  { emoji: "🍈", word: "MELON" },
  { emoji: "🍐", word: "PIR" },

  { emoji: "🐱", word: "KUCING" },
  { emoji: "🐶", word: "ANJING" },
  { emoji: "🐰", word: "KELINCI" },
  { emoji: "🐔", word: "AYAM" },
  { emoji: "🐟", word: "IKAN" },
  { emoji: "🐦", word: "BURUNG" },
  { emoji: "🐸", word: "KATAK" },
  { emoji: "🐮", word: "SAPI" },
  { emoji: "🐴", word: "KUDA" },
  { emoji: "🐢", word: "KURA" },

  { emoji: "🏫", word: "SEKOLAH" },
  { emoji: "🏠", word: "RUMAH" },
  { emoji: "🏪", word: "TOKO" },
  { emoji: "🏥", word: "DOKTER" },
  { emoji: "📚", word: "BUKU" },
  { emoji: "✏️", word: "PENSIL" },
  { emoji: "🎒", word: "TAS" },
  { emoji: "🪑", word: "KURSI" },
  { emoji: "🧻", word: "TISU" },
  { emoji: "🧸", word: "BONEKA" },

  { emoji: "🚗", word: "MOBIL" },
  { emoji: "🏍️", word: "MOTOR" },
  { emoji: "🚲", word: "SEPEDA" },
  { emoji: "🚌", word: "BUS" },
  { emoji: "🚆", word: "KERETA" },
  { emoji: "✈️", word: "PESAWAT" },
  { emoji: "🚢", word: "KAPAL" },
  { emoji: "🛵", word: "SKUTER" },
  { emoji: "🚕", word: "TAKSI" },
  { emoji: "🚚", word: "TRUK" },

  { emoji: "🌞", word: "MATAHARI" },
  { emoji: "🌙", word: "BULAN" },
  { emoji: "⭐", word: "BINTANG" },
  { emoji: "☁️", word: "AWAN" },
  { emoji: "🌧️", word: "HUJAN" },
  { emoji: "🌈", word: "PELANGI" },
  { emoji: "💨", word: "ANGIN" },
  { emoji: "🔥", word: "API" },
  { emoji: "💧", word: "AIR" },
  { emoji: "⛰️", word: "GUNUNG" },

  { emoji: "🍚", word: "NASI" },
  { emoji: "🍞", word: "ROTI" },
  { emoji: "🍜", word: "MIE" },
  { emoji: "🥛", word: "SUSU" },
  { emoji: "🍳", word: "TELUR" },
  { emoji: "🍪", word: "KUE" },
  { emoji: "🍫", word: "COKELAT" },
  { emoji: "🍯", word: "MADU" },
  { emoji: "🧃", word: "JUS" },
  { emoji: "🍵", word: "TEH" },

  { emoji: "👕", word: "BAJU" },
  { emoji: "👖", word: "CELANA" },
  { emoji: "👟", word: "SEPATU" },
  { emoji: "🧢", word: "TOPI" },
  { emoji: "🧦", word: "KAOS" },
  { emoji: "🧥", word: "JAKET" },
];

const sentencesEasy = [
  ["Aku", "suka", "apel"],
  ["Ibu", "pergi", "ke", "pasar"],
  ["Adik", "minum", "air"],
  ["Kami", "belajar", "di", "sekolah"],
  ["Kucing", "lari", "cepat"],
  ["Ayah", "bekerja", "di", "kantor"],
  ["Kakak", "membaca", "buku"],
  ["Saya", "makan", "nasi"],
  ["Anak", "itu", "tertawa"],
  ["Burung", "terbang", "tinggi"],
  ["Teman", "datang", "ke", "rumah"],
  ["Ibu", "memasak", "di", "dapur"],
  ["Ayah", "mencuci", "mobil"],
  ["Kami", "bermain", "bola"],
  ["Adik", "membawa", "tas"],
  ["Guru", "mengajar", "di", "kelas"],
  ["Kucing", "tidur", "siang"],
  ["Saya", "minum", "susu"],
  ["Anjing", "berlari", "kecil"],
  ["Pohon", "tumbuh", "tinggi"],
  ["Bunga", "terlihat", "indah"],
  ["Matahari", "bersinar", "terang"],
  ["Kami", "pergi", "ke", "taman"],
  ["Ayah", "membaca", "koran"],
  ["Ibu", "membeli", "buah"],
  ["Anak", "bermain", "layang-layang"],
  ["Adik", "belajar", "menulis"],
  ["Kami", "makan", "bersama"],
  ["Burung", "hinggap", "di", "pohon"],
  ["Saya", "memakai", "sepatu"],
  ["Kakak", "membantu", "ibu"],
  ["Ayah", "mengantar", "kami"],
  ["Ibu", "menyiram", "bunga"],
  ["Kami", "membersihkan", "kelas"],
  ["Anak", "mendengarkan", "guru"],
  ["Saya", "melipat", "baju"],
  ["Adik", "menyusun", "mainan"],
  ["Ayah", "memperbaiki", "sepeda"],
  ["Kami", "menanam", "pohon"],
  ["Ibu", "memasak", "sup"],
  ["Saya", "menonton", "kartun"],
  ["Kakak", "menggambar", "rumah"],
  ["Anak", "bernyanyi", "ceria"],
  ["Kami", "berjalan", "pagi"],
  ["Burung", "berkicau", "indah"],
  ["Saya", "membuka", "jendela"],
  ["Ibu", "menyiapkan", "sarapan"],
  ["Ayah", "berangkat", "kerja"],
  ["Kami", "pulang", "sekolah"],
];

const sentencesMedium = [
  ["Aku", "bermain", "bola", "di", "lapangan"],
  ["Ibu", "memasak", "makan", "siang", "di", "dapur"],
  ["Kami", "belajar", "bersama", "di", "kelas"],
  ["Ayah", "mengantar", "adik", "ke", "sekolah"],
  ["Kucing", "tidur", "nyaman", "di", "sofa"],
  ["Burung", "terbang", "tinggi", "di", "langit"],
  ["Saya", "membaca", "buku", "cerita", "anak"],
  ["Anak", "bermain", "pasir", "di", "pantai"],
  ["Kami", "menanam", "bunga", "di", "taman"],
  ["Ibu", "membeli", "buah", "di", "pasar"],
  ["Ayah", "memperbaiki", "sepeda", "di", "garasi"],
  ["Adik", "menyusun", "puzzle", "di", "lantai"],
  ["Kami", "berjalan", "pagi", "di", "taman"],
  ["Guru", "mengajar", "murid", "di", "kelas"],
  ["Saya", "menonton", "kartun", "di", "rumah"],
  ["Kakak", "menggambar", "pemandangan", "di", "buku"],
  ["Anjing", "berlari", "cepat", "di", "halaman"],
  ["Kami", "membersihkan", "ruang", "kelas", "bersama"],
  ["Ayah", "membaca", "koran", "pagi", "hari"],
  ["Ibu", "menyiapkan", "sarapan", "untuk", "keluarga"],
  ["Anak", "mendengarkan", "cerita", "sebelum", "tidur"],
  ["Kami", "bermain", "layang-layang", "di", "lapangan"],
  ["Burung", "hinggap", "di", "ranting", "pohon"],
  ["Saya", "memakai", "jaket", "saat", "dingin"],
  ["Kakak", "membantu", "adik", "mengerjakan", "tugas"],
  ["Ibu", "menyiram", "tanaman", "setiap", "pagi"],
  ["Ayah", "mengantar", "kami", "pergi", "berlibur"],
  ["Kami", "menonton", "film", "bersama", "keluarga"],
  ["Anak", "bernyanyi", "lagu", "dengan", "ceria"],
  ["Saya", "menyusun", "buku", "di", "rak"],
];

const sentencesHard = [
  ["Aku", "dan", "teman-teman", "bermain", "bola", "di", "lapangan", "setiap", "sore"],
  ["Ibu", "memasak", "makan", "malam", "lezat", "untuk", "seluruh", "keluarga"],
  ["Kami", "belajar", "bersama", "di", "perpustakaan", "sebelum", "pulang", "ke", "rumah"],
  ["Ayah", "mengantar", "adik", "ke", "sekolah", "dengan", "sepeda", "pagi", "ini"],
  ["Kucing", "tidur", "nyaman", "di", "atas", "sofa", "dekat", "jendela", "besar"],
  ["Burung", "terbang", "tinggi", "di", "langit", "biru", "pada", "pagi", "hari"],
  ["Saya", "membaca", "buku", "cerita", "menarik", "sebelum", "waktu", "tidur"],
  ["Anak-anak", "bermain", "pasir", "dan", "air", "di", "tepi", "pantai", "sore"],
  ["Kami", "menanam", "pohon", "kecil", "di", "halaman", "sekolah", "hari", "ini"],
  ["Ibu", "membeli", "sayur", "dan", "buah", "segar", "di", "pasar", "pagi"],
  ["Ayah", "memperbaiki", "sepeda", "lama", "di", "garasi", "belakang", "rumah"],
  ["Adik", "menyusun", "puzzle", "besar", "dengan", "sangat", "teliti", "dan", "sabar"],
  ["Kami", "berjalan", "bersama", "di", "taman", "kota", "sambil", "menikmati", "udara"],
  ["Guru", "menjelaskan", "pelajaran", "baru", "kepada", "murid-murid", "di", "kelas"],
  ["Saya", "menonton", "film", "kartun", "lucu", "bersama", "adik", "di", "rumah"],
  ["Kakak", "menggambar", "pemandangan", "indah", "di", "buku", "gambar", "barunya"],
  ["Anjing", "berlari", "cepat", "mengejar", "bola", "di", "halaman", "rumah"],
  ["Kami", "membersihkan", "ruang", "kelas", "bersama-sama", "setelah", "pelajaran", "selesai"],
  ["Ayah", "membaca", "koran", "pagi", "sambil", "minum", "kopi", "hangat"],
  ["Ibu", "menyiapkan", "sarapan", "sehat", "untuk", "kami", "sebelum", "berangkat", "sekolah"],
  ["Anak-anak", "mendengarkan", "cerita", "dongeng", "menarik", "sebelum", "tidur", "malam"],
  ["Kami", "bermain", "layang-layang", "warna-warni", "di", "lapangan", "pada", "sore"],
  ["Burung", "hinggap", "di", "ranting", "pohon", "besar", "dekat", "rumah", "kami"],
  ["Saya", "memakai", "jaket", "tebal", "karena", "udara", "pagi", "sangat", "dingin"],
  ["Kakak", "membantu", "adik", "mengerjakan", "tugas", "sekolah", "dengan", "sabar"],
  ["Ibu", "menyiram", "tanaman", "bunga", "setiap", "pagi", "di", "halaman", "rumah"],
  ["Ayah", "mengantar", "kami", "pergi", "berlibur", "ke", "pantai", "akhir", "pekan"],
  ["Kami", "menonton", "pertunjukan", "musik", "di", "taman", "kota", "malam", "hari"],
  ["Anak-anak", "bernyanyi", "lagu", "ceria", "bersama", "guru", "di", "kelas"],
  ["Saya", "menyusun", "buku", "pelajaran", "rapi", "di", "rak", "sebelum", "tidur"],
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
