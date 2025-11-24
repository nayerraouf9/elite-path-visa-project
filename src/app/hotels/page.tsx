import React from "react";
import Price from "../../components/Price";

export default function HotelsPage() {
  const hotels = [
    { id: 1, name: "Sea View Resort", priceUSD: 120 },
    { id: 2, name: "City Center Inn", priceUSD: 85 },
    { id: 3, name: "Budget Lodge", priceUSD: 45 },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-2xl font-semibold mb-6">Hotels</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {hotels.map((h) => (
            <div key={h.id} className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-lg font-semibold">{h.name}</div>
              <div className="text-sm text-slate-500">Starting from</div>
              <div className="mt-2 text-xl font-bold">
                <Price amountUSD={h.priceUSD} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
