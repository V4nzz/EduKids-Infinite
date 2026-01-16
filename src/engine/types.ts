export type Subject = "math" | "bahasa" | "ipa";

export type Choice = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  subject: Subject;
  subjectLabel: string;
  difficulty: number;
  difficultyLabel: string;
  prompt: string;
  hint?: string;
  choices: Choice[];
  correctChoiceId: string;
};

export const SUBJECT_LABEL: Record<Subject, string> = {
  math: "Matematika",
  bahasa: "Bahasa",
  ipa: "IPA",
};
