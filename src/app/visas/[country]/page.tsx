"use client";
import React, { useState } from "react";
import DatePicker from "../../../components/DatePicker";
import Price from "../../../components/Price";
import countryData, { CountryData } from "../../../data/countryData";
import { useCart } from "../../../context/CartContext";
import CheckoutModal from "../../../components/CheckoutModal";

function slugToName(slug: string) {
  // handle common shortcodes
  if (!slug) return "";
  const s = slug.replace(/^-+|-+$/g, "").replace(/-/g, " ");
  // Special case: usa -> USA
  if (s.toLowerCase() === "usa" || s.toLowerCase() === "us") return "USA";
  return s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function CountryVisaPage({
  params,
}: {
  params: { country: string };
}) {
  const countrySlug = params?.country || "";
  const countryName = slugToName(countrySlug);

  const [processing, setProcessing] = useState("");
  // start with no selected date
  const [travelDate, setTravelDate] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const router = require("next/navigation").useRouter();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialItemId, setInitialItemId] = useState<string | undefined>(
    undefined,
  );
  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(Number(e.target.value));
  };

  // Use the richer countryData map; fallback to 100 USD
  const cd: CountryData | undefined = (
    countryData as Record<string, CountryData>
  )[countrySlug];
  const basePriceUSD = cd?.basePriceUSD ?? 100;
  const description = cd?.description ?? "";
  const reviews = cd?.reviews ?? 0;
  const processingOptions = cd?.processingOptions ?? ["Normal", "Express"];
  // Ensure these are always defined for rendering
  let requiredDocuments: string[] = [];
  let visaTypeDocuments: Record<string, string[]> = {};
  if (cd) {
    requiredDocuments = cd.requiredDocuments ?? [];
    visaTypeDocuments = cd.visaTypeDocuments ?? {};
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold">
                {countryName} Visa <span className="text-amber-500">★★★★★</span>
              </h1>
              <div className="text-sm text-slate-500 mt-2">77 Reviews</div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-md">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>Normal 3-4 Working Days</div>
                </div>

                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-md">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 7h16M4 11h16M4 15h16"
                    />
                  </svg>
                  <div>Easy Documentation</div>
                </div>

                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-md">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2v4a2 2 0 002 2h2a2 2 0 002-2v-4c0-1.105-1.343-2-3-2z"
                    />
                  </svg>
                  <div>Online Payment Option</div>
                </div>
              </div>
              {/* Description removed as requested */}
            </div>

            <div className="hidden md:block">
              <button className="btn-brand px-4 py-2 rounded-md text-white">
                BOOK NOW
              </button>
            </div>
          </div>
        </div>

        {/* Pricing & options */}
        <div
          className="bg-white rounded-xl shadow-sm p-0"
          style={{ overflow: "visible" }}
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">
              {countryName} Visa Prices & Options
            </h2>
          </div>

          <div className="p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded-md"
                />
                <div className="font-medium">{countryName} VISA B1/B2</div>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col text-sm">
                  <span className="text-slate-500 text-xs mb-1">
                    Processing Type
                  </span>
                  <select
                    value={processing}
                    onChange={(e) => setProcessing(e.target.value)}
                    className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none"
                  >
                    <option value="" disabled>
                      Processing Type
                    </option>
                    {processingOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col text-sm">
                  <span className="text-slate-500 text-xs mb-1">
                    Travel Date
                  </span>
                  <div className="relative">
                    <DatePicker
                      value={travelDate}
                      onChange={(v) => setTravelDate(v)}
                    />
                  </div>
                </label>

                <label className="flex flex-col text-sm">
                  <span className="text-slate-500 text-xs mb-1">
                    No. Of Visa
                  </span>
                  <select
                    value={String(count)}
                    onChange={handleCountChange}
                    className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 border-t pt-4 flex items-center justify-end gap-4">
                <button className="px-4 py-2 rounded-md border border-amber-300 text-amber-600">
                  Quick Enquiry
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-amber-500 text-white"
                  onClick={() => {
                    const newId = addToCart({
                      visaType: countryName + " VISA B1/B2",
                      travelDate,
                      processingType: processing,
                      count,
                      totalPrice: basePriceUSD * count,
                    });
                    // Open checkout modal and tell it which item was just added
                    setInitialItemId(newId);
                    setIsModalOpen(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="w-full lg:w-72">
              <div className="bg-slate-50 p-5 rounded-lg shadow-inner text-right">
                <div className="text-sm text-slate-500">Price</div>
                <div className="text-xl font-bold text-amber-500 mt-2">
                  <Price amountUSD={basePriceUSD * count} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* USA Visa Details Section - Only for United States */}
        {countrySlug === "united-states" && (
          <section className="mt-10">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">
                USA Visa Online
              </h2>
              {description &&
                description.split(/\n+/).map((para, idx) => (
                  <p key={idx} className="text-slate-700 mb-4 leading-relaxed">
                    {para}
                  </p>
                ))}
              <h3 className="text-xl font-semibold mt-8 mb-3 text-blue-800">
                USA Visa Documents
              </h3>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                {requiredDocuments.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
              {visaTypeDocuments &&
                Object.keys(visaTypeDocuments).length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-blue-700 mb-2">
                      Depending on the visa type:
                    </h4>
                    <ul className="list-disc pl-6 text-slate-700 space-y-1">
                      {Object.entries(visaTypeDocuments).map(
                        ([type, docs], idx) => (
                          <li key={type} className="mb-2">
                            <span className="font-medium">{type}:</span>{" "}
                            {docs.join(", ")}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </section>
        )}
      </div>
      <CheckoutModal />
    </main>
  );
}
