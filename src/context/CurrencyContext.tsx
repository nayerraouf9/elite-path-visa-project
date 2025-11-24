"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type CurrencyState = {
  currency: string;
  setCurrency: (c: string) => void;
};

const CurrencyContext = createContext<CurrencyState | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<string>("AED");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ep_currency");
      if (stored) setCurrencyState(stored);
    } catch (e) {
      /* ignore in SSR */
    }
  }, []);

  const setCurrency = (c: string) => {
    setCurrencyState(c);
    try {
      localStorage.setItem("ep_currency", c);
    } catch (e) {}
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
