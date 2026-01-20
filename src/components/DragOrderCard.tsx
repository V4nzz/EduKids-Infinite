"use client";

import { useEffect, useMemo, useState } from "react";
import type { DragOrderQuestion } from "@/engine/types";

type BankItem = { id: string; text: string };
type SlotItem = BankItem | null;

type DragSource =
  | { from: "bank"; item: BankItem }
  | { from: "slot"; idx: number; item: BankItem };

function makeId(prefix: string, i: number) {
  return `${prefix}-${Date.now()}-${i}-${Math.floor(Math.random() * 1e9)}`;
}

export default function DragOrderCard({
  question,
  locked,
  onSubmit,
  onResetLock,
}: {
  question: DragOrderQuestion;
  locked: boolean;
  onSubmit: (encoded: string) => void;
  onResetLock: () => void;
}) {
  const slotCount = question.answer.length;

  const [bank, setBank] = useState<BankItem[]>([]);
  const [slots, setSlots] = useState<SlotItem[]>([]);

  useEffect(() => {
    const initialBank: BankItem[] = question.bank.map((t, i) => ({
      id: makeId(question.id, i),
      text: t,
    }));

    setBank(initialBank);
    setSlots(Array.from({ length: slotCount }).map(() => null));
    onResetLock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, slotCount]);

  const filled = useMemo(() => slots.every((s) => s), [slots]);

  function encode(arr: SlotItem[]) {
    return arr.filter(Boolean).map((x) => x!.text).join("||");
  }

  function handleDrop(targetSlotIdx: number, src: DragSource) {
    if (locked) return;

    // 1) kalau sumber dari BANK: hapus item itu dari bank
    if (src.from === "bank") {
      setBank((prev) => prev.filter((x) => x.id !== src.item.id));
    }

    // 2) update slots
    setSlots((prevSlots) => {
      const nextSlots = [...prevSlots];

      // kalau sumber dari SLOT: kosongkan slot asal
      if (src.from === "slot") {
        nextSlots[src.idx] = null;
      }

      // kalau target sudah terisi: pindahkan yang lama ke bank
      const displaced = nextSlots[targetSlotIdx];
      if (displaced) {
        setBank((prevBank) => [displaced, ...prevBank]);
      }

      // taruh item ke target
      nextSlots[targetSlotIdx] = src.item;

      return nextSlots;
    });
  }

  function resetBoard() {
    if (locked) return;
    const initialBank: BankItem[] = question.bank.map((t, i) => ({
      id: makeId(question.id, i),
      text: t,
    }));
    setBank(initialBank);
    setSlots(Array.from({ length: slotCount }).map(() => null));
  }

  return (
    <div style={{ marginTop: 10 }}>
      {/* SLOTS */}
      <div className="dropRow">
        {slots.map((val, i) => (
          <div
            key={i}
            className={`dropSlot ${val ? "filled" : ""}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const raw = e.dataTransfer.getData("text/plain");
              if (!raw) return;
              const parsed = JSON.parse(raw) as DragSource;
              handleDrop(i, parsed);
            }}
          >
            {val ? (
              <div
                className="chip chipBig"
                draggable={!locked}
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    "text/plain",
                    JSON.stringify({ from: "slot", idx: i, item: val } as DragSource)
                  );
                }}
              >
                {val.text}
              </div>
            ) : (
              <div className="muted">Taruh di sini</div>
            )}
          </div>
        ))}
      </div>

      {/* BANK */}
      <div style={{ marginTop: 12 }}>
        <div className="muted" style={{ marginBottom: 8 }}>
          Pilihan:
        </div>
        <div className="chipWrap">
          {bank.map((t) => (
            <div
              key={t.id}
              className="chip"
              draggable={!locked}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  JSON.stringify({ from: "bank", item: t } as DragSource)
                );
              }}
            >
              {t.text}
            </div>
          ))}
        </div>
      </div>

      <div className="row" style={{ justifyContent: "space-between", marginTop: 14 }}>
        <button className="btn" onClick={resetBoard} disabled={locked}>
          🔄 Ulangi
        </button>

        <button
          className="btn btnGood"
          disabled={!filled || locked}
          onClick={() => onSubmit(encode(slots))}
        >
          ✅ Cek Jawaban
        </button>
      </div>
    </div>
  );
}
