type RateMap = { [code: string]: { symbol: string; rate: number } };

// Rates are relative to USD for demonstration purposes (fixed multipliers)
export const RATES: RateMap = {
  USD: { symbol: "$", rate: 1 },
  AED: { symbol: "AED", rate: 3.67 },
  INR: { symbol: "₹", rate: 83.0 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  SAR: { symbol: "﷼", rate: 3.75 },
  SGD: { symbol: "S$", rate: 1.36 },
  MYR: { symbol: "RM", rate: 4.53 },
  ZAR: { symbol: "R", rate: 18.5 },
  THB: { symbol: "฿", rate: 35.0 },
  OMR: { symbol: "﷼", rate: 0.39 },
  AUD: { symbol: "A$", rate: 1.55 },
  JPY: { symbol: "¥", rate: 157.0 },
  KZT: { symbol: "₸", rate: 464.0 },
  VND: { symbol: "₫", rate: 23440 },
  TRY: { symbol: "TRY", rate: 36.0 },
};

export function formatCurrency(amountUSD: number, currencyCode: string) {
  const upper = currencyCode?.toUpperCase() || "USD";
  const rateInfo = RATES[upper] || RATES["USD"];
  const converted = amountUSD * rateInfo.rate;
  // For very large/small numbers use Intl if available
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(converted.toFixed(2)));
  return `${rateInfo.symbol} ${formattedNumber}`;
}
