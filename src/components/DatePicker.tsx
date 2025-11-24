"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  value: string | null; // yyyy-mm-dd or null
  onChange: (v: string | null) => void;
};

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDisplay(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

function toDate(value: string | null) {
  if (!value) return new Date();
  const parts = value.split("-").map(Number);
  if (parts.length !== 3) return new Date();
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

export default function DatePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(() =>
    value ? toDate(value) : null,
  );
  const [viewDate, setViewDate] = useState<Date>(() =>
    selected
      ? new Date(selected.getFullYear(), selected.getMonth(), 1)
      : new Date(),
  );
  const [transitionDirection, setTransitionDirection] = useState<
    "left" | "right" | "none"
  >("none");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelected(value ? toDate(value) : null);
  }, [value]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function handlePrev() {
    setTransitionDirection("left");
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function handleNext() {
    setTransitionDirection("right");
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function selectDay(day: Date) {
    setSelected(day);
    // Only update input, don't close picker
    onChange(
      `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`,
    );
  }

  // build calendar grid for viewDate
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay(); // 0..6 (Sun..Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: (Date | null)[] = [];
  // start from Sunday
  let current = 1 - firstDay;
  while (current <= daysInMonth) {
    for (let i = 0; i < 7; i++) {
      const d = new Date(year, month, current);
      if (current < 1 || current > daysInMonth) {
        weeks.push(null);
      } else {
        weeks.push(d);
      }
      current++;
    }
  }

  // keyboard support
  function onKey(e: React.KeyboardEvent) {
    if (!open) return;
    e.stopPropagation();
    if (e.key === "Escape") setOpen(false);
  }

  return (
    <div
      className="relative"
      ref={rootRef}
      onKeyDown={onKey}
      style={{ overflow: "visible" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-sm text-left flex items-center justify-between"
      >
        <span className="text-sm text-slate-700">
          {selected ? formatDisplay(selected) : "DD/MM/YYYY"}
        </span>
        <svg
          className="w-5 h-5 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7l4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-[9999] mt-2 bg-white rounded-xl shadow-2xl p-4 w-80 text-sm"
          role="dialog"
          aria-label="Calendar"
          style={{ overflow: "visible" }}
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-md hover:bg-slate-100"
              aria-label="Previous month"
            >
              ‹
            </button>
            <div className="text-center">
              <div className="font-semibold">
                {viewDate.toLocaleString(undefined, { month: "long" })}{" "}
                {viewDate.getFullYear()}
              </div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-md hover:bg-slate-100"
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          <div className={`overflow-hidden`}>
            <div
              className={`grid grid-cols-7 gap-1 transition-transform duration-200`}
            >
              {weeks.map((d, idx) => (
                <div key={idx} className="h-9">
                  {d ? (
                    <button
                      type="button"
                      onClick={() => selectDay(d)}
                      className={`w-full h-9 rounded-md transition-colors ${selected && d.toDateString() === selected.toDateString() ? "bg-amber-500 text-white" : "text-slate-700 hover:bg-slate-100"}`}
                      aria-pressed={
                        selected && d.toDateString() === selected.toDateString()
                      }
                    >
                      {d.getDate()}
                    </button>
                  ) : (
                    <div className="w-full h-9" />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Confirm button for date picker */}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-amber-500 text-white font-semibold shadow hover:bg-amber-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
