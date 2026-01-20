export type Subject = "math" | "bahasa" | "ipa";

export type Choice = {
  id: string;
  label: string;
};

/* =====================
   BASE
===================== */
export type BaseQuestion = {
  id: string;
  subject: Subject;
  subjectLabel: string;
  difficulty: number;
  difficultyLabel: string;
  prompt: string;
  hint?: string;
};

/* =====================
   MCQ (Math / lama)
===================== */
export type MCQQuestion = BaseQuestion & {
  type: "mcq";
  choices: Choice[];
  correctChoiceId: string;
};

/* =====================
   DRAG & DROP (Bahasa / IPA)
===================== */
export type DragOrderQuestion = BaseQuestion & {
  type: "drag_order";
  // pilihan acak yang bisa di-drag
  bank: string[];
  // urutan benar
  answer: string[];
};

/* =====================
   UNION
===================== */
export type Question = MCQQuestion | DragOrderQuestion;

/* =====================
   LABEL MAP
===================== */
export const SUBJECT_LABEL: Record<Subject, string> = {
  math: "Matematika",
  bahasa: "Bahasa",
  ipa: "IPA",
};
