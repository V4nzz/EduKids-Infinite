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

  function placeToFirstEmpty(item: BankItem) {
    if (locked) return;
  
    setSlots((prevSlots) => {
      const idx = prevSlots.findIndex((s) => !s);
      if (idx === -1) return prevSlots; // penuh
  
      const nextSlots = [...prevSlots];
      nextSlots[idx] = item;
      return nextSlots;
    });
  
    // hapus dari bank (berdasarkan id)
    setBank((prev) => prev.filter((x) => x.id !== item.id));
  }
  
  function removeFromSlot(slotIdx: number) {
    if (locked) return;
  
    setSlots((prevSlots) => {
      const nextSlots = [...prevSlots];
      const item = nextSlots[slotIdx];
      if (!item) return prevSlots;
  
      nextSlots[slotIdx] = null;
  
      // balikin ke bank (tanpa duplikat)
      setBank((prevBank) => {
        if (prevBank.some((x) => x.id === item.id)) return prevBank;
        return [item, ...prevBank];
      });
  
      return nextSlots;
    });
  }  

  function handleDrop(targetSlotIdx: number, src: DragSource) {
    if (locked) return;
  
    // 1) kalau dari BANK: hapus item tsb dari bank (berdasarkan id)
    if (src.from === "bank") {
      setBank((prev) => prev.filter((x) => x.id !== src.item.id));
    }
  
    // 2) update slots
    setSlots((prevSlots) => {
      const nextSlots = [...prevSlots];
  
      // jika dari slot: kosongkan slot asal
      if (src.from === "slot") {
        nextSlots[src.idx] = null;
      }
  
      // kalau target sudah terisi, yang lama akan dipindah ke bank
      const displaced = nextSlots[targetSlotIdx];
      nextSlots[targetSlotIdx] = src.item;
  
      // 3) setelah slot berubah, rapikan BANK:
      // - bank tidak boleh contain item yang ada di slots
      // - bank tidak boleh duplikat id
      setBank((prevBank) => {
        // masukkan displaced dulu (kalau ada)
        const withDisplaced = displaced ? [displaced, ...prevBank] : [...prevBank];
  
        // kumpulkan id yang sedang ada di slots (setelah update)
        const slotIds = new Set(
          nextSlots.filter(Boolean).map((x) => (x as BankItem).id)
        );
  
        // filter: buang yang id-nya ada di slots
        const filtered = withDisplaced.filter((x) => !slotIds.has(x.id));
  
        // dedupe by id
        const seen = new Set<string>();
        const deduped: BankItem[] = [];
        for (const it of filtered) {
          if (seen.has(it.id)) continue;
          seen.add(it.id);
          deduped.push(it);
        }
  
        return deduped;
      });
  
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
    <div className="dropArea" style={{ marginTop: 10 }}>
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
              <button
                type="button"
                className="chip chipBig"
                disabled={locked}
                onClick={() => removeFromSlot(i)}
                draggable={!locked}
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    "text/plain",
                    JSON.stringify({ from: "slot", idx: i, item: val } as DragSource)
                  );
                }}
                title="Klik untuk mengembalikan ke pilihan"
              >
                {val.text}
              </button>
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
            <button
              key={t.id}
              type="button"
              className="chip"
              disabled={locked}
              onClick={() => placeToFirstEmpty(t)}
              draggable={!locked}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "text/plain",
                  JSON.stringify({ from: "bank", item: t } as DragSource)
                );
              }}
              title="Klik untuk memasukkan ke slot pertama yang kosong"
            >
              {t.text}
            </button>
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
