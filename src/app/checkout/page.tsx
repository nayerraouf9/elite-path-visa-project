"use client";
import React, { useState } from "react";
import Image from "next/image";
import Price from "../../components/Price";
import { useCart } from "../../context/CartContext";
import CheckoutModal from "../../components/CheckoutModal";

// Step 1: Cart Summary & Lead Passenger Details
function Step1({ cartItems, onNext, removeFromCart }: any) {
  const [lead, setLead] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    nationality: "",
    isd: "",
    phone: "",
  });
  // Get countryData for extra info
  const countryData = require("../../data/countryData").default;
  const lastForItem = (item: any) => {
    let cd =
      countryData[item.visaType?.toLowerCase()?.replace(/ visa.*$/i, "")] ||
      countryData[item.visaType?.toLowerCase()?.replace(/\s/g, "-")] ||
      null;
    if (!cd) cd = countryData["usa"];
    return {
      lastDateToCancel: cd?.lastDateToCancel || "Non Refundable",
      availability: cd?.availability || "Available",
    };
  };
  return (
    <div className="bg-white rounded-xl shadow p-0 mt-8 flex max-w-6xl mx-auto">
      {/* Left: Lead Passenger Details */}
      <div className="flex-1 p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl text-amber-500">
            <i className="fa fa-user-group" />
          </span>
          <span className="font-bold text-xl">Lead Passenger Details</span>
        </div>
        <form className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <select
              className="w-full border rounded-md p-2"
              value={lead.title}
              onChange={(e) => setLead({ ...lead, title: e.target.value })}
            >
              <option>Mr.</option>
              <option>Ms.</option>
            </select>
          </div>
          <input
            className="w-full border rounded-md p-2"
            placeholder="First Name *"
            value={lead.firstName}
            onChange={(e) => setLead({ ...lead, firstName: e.target.value })}
          />
          <input
            className="w-full border rounded-md p-2"
            placeholder="Last Name *"
            value={lead.lastName}
            onChange={(e) => setLead({ ...lead, lastName: e.target.value })}
          />
          <input
            className="w-full border rounded-md p-2"
            placeholder="Email Address *"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
          />
          <input
            className="w-full border rounded-md p-2"
            placeholder="Nationality"
            value={lead.nationality}
            onChange={(e) => setLead({ ...lead, nationality: e.target.value })}
          />
          <input
            className="w-full border rounded-md p-2"
            placeholder="ISD Code"
            value={lead.isd}
            onChange={(e) => setLead({ ...lead, isd: e.target.value })}
          />
          <input
            className="w-full border rounded-md p-2"
            placeholder="Phone Number *"
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: e.target.value })}
          />
        </form>
        <textarea
          className="w-full border rounded-md p-2 mb-2"
          rows={2}
          placeholder="Special Request"
        />
        <div className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" />
          <span className="text-sm">
            Update booking information in your account
          </span>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="px-6 py-2 rounded-md bg-amber-500 text-white font-semibold"
            onClick={() => onNext(lead)}
          >
            Next
          </button>
        </div>
      </div>
      {/* Right: Cart Summary */}
      <div className="w-96 border-l bg-slate-50 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-500">
              <i className="fa fa-file-invoice" />
            </span>
            <span className="font-bold text-lg">Visa Cart Summary</span>
          </div>
          {(!cartItems || cartItems.length === 0) && (
            <div className="text-sm text-slate-500">Your cart is empty.</div>
          )}
          {cartItems &&
            cartItems.map((item: any) => {
              const info = lastForItem(item);
              return (
                <div
                  key={item.id}
                  className="mb-3 p-2 bg-white rounded flex justify-between items-start"
                >
                  <div className="text-sm">
                    <div className="font-semibold">{item.visaType}</div>
                    <div className="text-xs">
                      Travel Date: <span className="font-medium">{item.travelDate || "—"}</span>
                    </div>
                    <div className="text-xs">
                      Processing:{" "}
                      <span className="font-medium">{item.processingType}</span>
                    </div>
                    <div className="text-xs">
                      Count: <span className="font-medium">{item.count}</span>
                    </div>
                    <div className="text-xs">
                      Cancel:{" "}
                      <span className="text-red-500 font-semibold">
                        {info.lastDateToCancel}
                      </span>
                    </div>
                  </div>
                  <div className="ml-2 text-right">
                    <div className="text-sm font-bold text-amber-500">
                      AED <Price amountUSD={item.totalPrice} />
                    </div>
                    <button
                      className="text-xs text-red-600 mt-2"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-4 text-right">
          <div className="text-xs text-slate-500">Total</div>
          <div className="text-xl font-bold text-amber-500">
            AED{" "}
            <Price
              amountUSD={
                cartItems?.reduce((s: any, i: any) => s + i.totalPrice, 0) || 0
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Step 2: Passenger Details & Extras
function Step2({ cart, passengers, setPassengers, onNext }: any) {
  return (
    <div className="bg-white rounded-xl shadow p-0 mt-8 flex max-w-6xl mx-auto">
      {/* Left: Extra Details */}
      <div className="flex-1 p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl text-amber-500">
            <i className="fa fa-file-lines" />
          </span>
          <span className="font-bold text-xl">Extra Details</span>
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer bg-orange-50 rounded p-3">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm">Upload Bulk Details</span>
          </label>
        </div>
        <div className="font-bold text-lg mb-2 flex items-center gap-2">
          <span className="text-amber-500">
            <i className="fa fa-passport" />
          </span>{" "}
          {cart.visaType}
        </div>
        {passengers.map((p: any, idx: number) => (
          <div key={idx} className="mb-6 border-b pb-6">
            <div className="font-semibold mb-2">Passenger {idx + 1}</div>
            <form className="grid grid-cols-3 gap-4 mb-2">
              <select
                className="w-full border rounded-md p-2"
                value={p.title}
                onChange={(e) =>
                  setPassengers((arr: any) =>
                    arr.map((x: any, i: number) =>
                      i === idx ? { ...x, title: e.target.value } : x,
                    ),
                  )
                }
              >
                <option>Mr.</option>
                <option>Ms.</option>
              </select>
              <input
                className="w-full border rounded-md p-2"
                placeholder="First Name *"
                value={p.firstName}
                onChange={(e) =>
                  setPassengers((arr: any) =>
                    arr.map((x: any, i: number) =>
                      i === idx ? { ...x, firstName: e.target.value } : x,
                    ),
                  )
                }
              />
              <input
                className="w-full border rounded-md p-2"
                placeholder="Last Name *"
                value={p.lastName}
                onChange={(e) =>
                  setPassengers((arr: any) =>
                    arr.map((x: any, i: number) =>
                      i === idx ? { ...x, lastName: e.target.value } : x,
                    ),
                  )
                }
              />
              <select
                className="w-full border rounded-md p-2"
                value={p.gender}
                onChange={(e) =>
                  setPassengers((arr: any) =>
                    arr.map((x: any, i: number) =>
                      i === idx ? { ...x, gender: e.target.value } : x,
                    ),
                  )
                }
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                className="w-full border rounded-md p-2"
                placeholder="Passport No *"
                value={p.passportNo}
                onChange={(e) =>
                  setPassengers((arr: any) =>
                    arr.map((x: any, i: number) =>
                      i === idx ? { ...x, passportNo: e.target.value } : x,
                    ),
                  )
                }
              />
              <input
                className="w-full border rounded-md p-2"
                placeholder="Nationality"
                value={p.nationality}
                onChange={(e) =>
                  setPassengers((arr: any) =>
                    arr.map((x: any, i: number) =>
                      i === idx ? { ...x, nationality: e.target.value } : x,
                    ),
                  )
                }
              />
              <input
                type="date"
                className="w-full border rounded-md p-2"
                placeholder="Birth Date *"
                value={p.birthDate}
                onChange={(e) =>
                  setPassengers((arr: any) =>
                    arr.map((x: any, i: number) =>
                      i === idx ? { ...x, birthDate: e.target.value } : x,
                    ),
                  )
                }
              />
            </form>
            <div className="mt-2 text-xs">
              <span className="text-red-500 font-semibold">
                Special Attention:
              </span>{" "}
              <span className="font-normal text-slate-700">
                For any assistance in online visa processing please send an
                email to{" "}
                <a href="mailto:visa@raynab2b.com" className="text-amber-500">
                  visa@raynab2b.com
                </a>
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Right: Final Payment */}
      <div className="w-96 border-l bg-slate-50 p-6 flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-2">Final Payment</div>
          <div className="mb-2 text-sm">
            Total Amount{" "}
            <span className="float-right">
              AED <Price amountUSD={cart.totalPrice} />
            </span>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 text-center mt-4">
            <span className="font-bold text-xl">Final Amount</span>
            <span className="font-bold text-xl ml-4 text-amber-500">
              AED <Price amountUSD={cart.totalPrice} />
            </span>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button
            type="button"
            className="px-6 py-2 rounded-md bg-amber-500 text-white font-semibold"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// Step 3: Payment Method
function Step3({ cart }: any) {
  const [agree, setAgree] = useState(false);
  const [method, setMethod] = useState("card");
  return (
    <div className="bg-white rounded-xl shadow p-0 mt-8 max-w-3xl mx-auto">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl text-amber-500">
            <i className="fa fa-credit-card" />
          </span>
          <span className="font-bold text-xl">Choose a Payment Method</span>
        </div>
        <div className="mb-6">
          <div
            className="border rounded-lg p-4 mb-4"
            style={{
              borderColor: method === "card" ? "#ff9800" : "#e5e7eb",
              borderWidth: "2px",
            }}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="pay"
                checked={method === "card"}
                onChange={() => setMethod("card")}
                className="mr-2"
              />
              <span className="font-semibold">Credit Card / Debit Card</span>
            </label>
            <div className="text-xs text-orange-600 mt-2">
              Note : In the next step you will be redirected to your banks
              website to verify yourself.
            </div>
          </div>
          <div
            className="border rounded-lg p-4 bg-slate-50"
            style={{
              borderColor: method === "pointspay" ? "#ff9800" : "#e5e7eb",
              borderWidth: "2px",
            }}
          >
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="pay"
                checked={method === "pointspay"}
                onChange={() => setMethod("pointspay")}
                className="mr-2"
              />
              <span className="font-semibold">Pointspay</span>
              <Image
                src="/etihad-logo.png"
                alt="Etihad Guestpay"
                width={24}
                height={24}
                className="ml-2"
              />
            </label>
            <div className="text-xs text-orange-600 mt-2">
              Note : Use your miles/points instead of cash when you shop with
              Pointspay.
            </div>
          </div>
        </div>
        <div className="flex items-center mb-6 mt-6">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mr-2"
          />
          <span className="text-xs">
            By Clicking Pay Now You agree that you have read and understood our{" "}
            <span className="text-orange-600">Terms and Conditions</span>.
          </span>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="px-6 py-2 rounded-md bg-orange-500 text-white font-semibold"
            disabled={!agree}
          >
            pay now
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Checkout Page
export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { cartItems, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(true);
  const router = require("next/navigation").useRouter();
  // Parse cart data from query params
  const params =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  // Always use the short form for visaType to avoid hydration errors
  let visaTypeParam = params.get("visaType") || "USA VISA B1/B2";
  if (visaTypeParam.includes("United States")) visaTypeParam = "USA VISA B1/B2";
  const cart = {
    visaType: visaTypeParam,
    travelDate: params.get("travelDate") || null,
    processingType: params.get("processingType") || "Normal",
    count: Number(params.get("count")) || 1,
    totalPrice: Number(params.get("totalPrice")) || 1200,
  };
  const [passengers, setPassengers] = useState(
    Array(cart.count).fill({
      title: "Mr.",
      gender: "Male",
      birthDate: "",
      firstName: "",
      lastName: "",
      passportNo: "",
      nationality: "",
    }),
  );
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <h1 className="text-3xl font-bold text-red-600 text-center mb-8">
        CHECKOUT ROUTE
      </h1>
      <CheckoutModal />
    </div>
  );
}
