"use client";
import React, { useState, useRef, useEffect } from "react";
import { useCurrency } from "../context/CurrencyContext";
import { RATES } from "../lib/currency";

const CURRENCY_LIST = [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "AED",
  "SAR",
  "SGD",
  "MYR",
  "ZAR",
  "THB",
  "OMR",
  "AUD",
  "GEL",
  "AMD",
  "HKD",
  "MOP",
  "JPY",
  "KZT",
  "UZS",
  "AZN",
  "MUR",
  "TRY",
  "DKK",
  "VND",
  "IDR",
];

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const onSelect = (code: string) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-slate-800 text-sm font-medium focus-ring px-2 py-1 rounded-md border border-transparent hover:border-slate-200"
      >
        <span className="font-semibold">{currency}</span>
        <svg
          className="h-4 w-4 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-3 w-[680px] max-w-[95vw] bg-white border rounded-xl shadow-2xl p-4 z-50"
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {CURRENCY_LIST.map((code) => {
              const info = RATES[code] || { symbol: code, rate: 1 };
              const active = currency === code;
              return (
                <button
                  key={code}
                  onClick={() => onSelect(code)}
                  className={`flex flex-col items-start gap-1 p-3 rounded-lg text-left border ${active ? "border-amber-400 bg-amber-50" : "border-slate-100 hover:border-slate-200"} focus:outline-none`}
                >
                  <div className="text-sm font-semibold text-slate-800">
                    {code}
                  </div>
                  <div className="text-xs text-slate-500">{info.symbol}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
