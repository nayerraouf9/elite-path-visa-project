"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import UndoToast from "./UndoToast";
import Price from "./Price";

type Passenger = {
  title: string;
  gender: string;
  birthDate: string;
  firstName: string;
  lastName: string;
  passportNo: string;
  nationality: string;
};

export default function CheckoutModal() {
  const {
    cartItems,
    removeFromCart,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    lastRemovedStack,
    undoRemove,
    dismissUndo,
    lastAddedItemId,
    setLastAddedItemId,
  } = useCart();
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lead, setLead] = useState({
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    nationality: "",
    isd: "",
    phone: "",
  });
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [agree, setAgree] = useState(false);
  const [method, setMethod] = useState("card");

  useEffect(() => {
    if (isCheckoutModalOpen) {
      setStep(1);
      setAgree(false);
      setMethod("card");
      if (cartItems.length === 0) setSelectedIndex(0);
      else if (selectedIndex >= cartItems.length)
        setSelectedIndex(cartItems.length - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckoutModalOpen, cartItems.length]);

  // If a new item was added immediately prior to opening the modal, select it
  useEffect(() => {
    if (!isCheckoutModalOpen) return;
    if (!lastAddedItemId) return;
    const idx = cartItems.findIndex((i) => i.id === lastAddedItemId);
    if (idx >= 0) {
      setSelectedIndex(idx);
    }
    // clear the marker so subsequent opens don't auto-select
    setLastAddedItemId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckoutModalOpen]);

  useEffect(() => {
    const sel = cartItems[selectedIndex];
    if (sel) {
      setPassengers(
        Array.from({ length: sel.count }, () => ({
          title: "Mr.",
          gender: "Male",
          birthDate: "",
          firstName: "",
          lastName: "",
          passportNo: "",
          nationality: "",
        })),
      );
    } else {
      setPassengers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, cartItems]);

  const modalRef = React.useRef<HTMLDivElement | null>(null);

  // Focus trap: keep focus inside the modal when open and restore on close
  React.useEffect(() => {
    if (!isCheckoutModalOpen) return;
    const root = modalRef.current;
    if (!root) return;
    const prevActive = document.activeElement as HTMLElement | null;

    const focusableSelector =
      'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function getFocusables() {
      return Array.from(
        root.querySelectorAll(focusableSelector),
      ) as HTMLElement[];
    }

    // focus first focusable element if nothing is focused inside modal
    const focusables = getFocusables();
    if (focusables.length > 0) {
      const activeInside = root.contains(document.activeElement);
      if (!activeInside) focusables[0].focus();
    } else {
      // fallback focus on root
      try {
        root.focus();
      } catch (e) {}
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const nodes = getFocusables();
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (!active || active === first || !root.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (!active || active === last || !root.contains(active)) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // restore previous focus
      try {
        if (prevActive && typeof prevActive.focus === "function")
          prevActive.focus();
      } catch (e) {}
    };
  }, [isCheckoutModalOpen]);

  // Early return after all hooks
  if (!isCheckoutModalOpen) {
    return null;
  }

  const selected = cartItems[selectedIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsCheckoutModalOpen(false)}
      />
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
        className="relative w-full max-w-full p-4"
      >
        <h2 id="checkout-modal-title" className="sr-only">
          Checkout
        </h2>
        <div className="flex justify-end mb-2">
          <button
            className="px-3 py-1 bg-white rounded"
            onClick={() => setIsCheckoutModalOpen(false)}
          >
            Close
          </button>
        </div>
        {step === 1 && (
          <Step1
            lead={lead}
            setLead={setLead}
            cartItems={cartItems}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            removeFromCart={removeFromCart}
            selected={selected}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <Step2
            selected={selected}
            setStep={setStep}
            passengers={passengers}
            setPassengers={setPassengers}
            agree={agree}
            setAgree={setAgree}
            method={method}
            setMethod={setMethod}
          />
        )}
        {step === 3 && (
          <Step3
            method={method}
            setMethod={setMethod}
            agree={agree}
            setAgree={setAgree}
            setStep={setStep}
            setIsCheckoutModalOpen={setIsCheckoutModalOpen}
          />
        )}
        {/* Undo toast for removals */}
        <UndoToast
          stack={lastRemovedStack}
          onUndo={undoRemove}
          onDismiss={dismissUndo}
        />
      </div>
    </div>
  );
}

function Step1({
  lead,
  setLead,
  cartItems,
  selectedIndex,
  setSelectedIndex,
  removeFromCart,
  selected,
  setStep,
}: any) {
  const listRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Scroll the selected item into view when selection changes
    if (!listRef.current) return;
    const el = listRef.current.querySelector(
      `[data-index=\"${selectedIndex}\"]`,
    ) as HTMLElement | null;
    if (el) {
      try {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (e) {
        el.scrollIntoView();
      }
      // After scrolling, focus the radio control (or nearest focusable element) for accessibility
      try {
        const radio = el.querySelector(
          'input[type="radio"]',
        ) as HTMLElement | null;
        if (radio && typeof radio.focus === "function") {
          // prevent additional scrolling when focusing
          radio.focus({ preventScroll: true } as FocusOptions);
        } else {
          const focusable = el.querySelector(
            "button, [tabindex], a, input, select, textarea",
          ) as HTMLElement | null;
          if (focusable && typeof focusable.focus === "function") {
            focusable.focus({ preventScroll: true } as FocusOptions);
          }
        }
      } catch (err) {
        // ignore focus errors
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, cartItems.length]);

  return (
    <div className="bg-white rounded-xl shadow p-0 mt-2 flex flex-col md:flex-row w-full">
      <div ref={listRef} className="flex-1 p-4 md:p-6 w-full">
        <div className="flex items-center gap-2 md:gap-4 mb-4">
          <span className="text-2xl text-amber-500">
            <i className="fa fa-user-group" />
          </span>
          <span className="font-bold text-xl">Lead Passenger Details</span>
        </div>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mb-4 text-sm md:text-base"
          autoComplete="off"
        >
          <div>
            <select
              className="w-full border rounded-md p-2"
              value={lead.title}
              onChange={(e) =>
                setLead((prev: any) => ({ ...prev, title: e.target.value }))
              }
              autoComplete="off"
            >
              <option>Mr.</option>
              <option>Ms.</option>
            </select>
          </div>
          <input
            className="w-full border rounded-md p-2 text-sm md:text-base"
            placeholder="First Name *"
            value={lead.firstName}
            onChange={(e) =>
              setLead((prev: any) => ({ ...prev, firstName: e.target.value }))
            }
            autoComplete="off"
          />
          <input
            className="w-full border rounded-md p-2 text-sm md:text-base"
            placeholder="Last Name *"
            value={lead.lastName}
            onChange={(e) =>
              setLead((prev: any) => ({ ...prev, lastName: e.target.value }))
            }
            autoComplete="off"
          />
          <input
            className="w-full border rounded-md p-2 text-sm md:text-base"
            placeholder="Email Address *"
            value={lead.email}
            onChange={(e) =>
              setLead((prev: any) => ({ ...prev, email: e.target.value }))
            }
            autoComplete="off"
          />
          <input
            className="w-full border rounded-md p-2 text-sm md:text-base"
            placeholder="Nationality"
            value={lead.nationality}
            onChange={(e) =>
              setLead((prev: any) => ({ ...prev, nationality: e.target.value }))
            }
            autoComplete="off"
          />
          <input
            className="w-full border rounded-md p-2 text-sm md:text-base"
            placeholder="ISD Code"
            value={lead.isd}
            onChange={(e) =>
              setLead((prev: any) => ({ ...prev, isd: e.target.value }))
            }
            autoComplete="off"
          />
          <input
            className="w-full border rounded-md p-2 text-sm md:text-base"
            placeholder="Phone Number *"
            value={lead.phone}
            onChange={(e) =>
              setLead((prev: any) => ({ ...prev, phone: e.target.value }))
            }
            autoComplete="off"
          />
        </form>
      </div>
      <div className="w-full md:w-96 border-t md:border-l md:border-t-0 bg-slate-50 p-4 md:p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-500">
              <i className="fa fa-file-invoice" />
            </span>
            <span className="font-bold text-lg">Visa Cart Summary</span>
          </div>
          {cartItems.length === 0 && (
            <div className="text-sm text-slate-500">Your cart is empty.</div>
          )}
          {cartItems.map((item: any, idx: number) => (
            <label
              data-index={idx}
              data-item-id={item.id}
              key={item.id || idx}
              className={`block mb-3 p-2 bg-white rounded border focus-within:ring-2 focus-within:ring-blue-500 ${selectedIndex === idx ? "border-amber-300 ring-2 ring-blue-500" : "border-transparent"}`}
            >
              <div className="flex justify-between items-start">
                <div className="text-sm">
                  <div className="font-semibold flex items-center gap-2">
                    {item.visaType}
                    <button
                      type="button"
                      aria-label="Remove"
                      className="ml-1 text-slate-400 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item?.id) removeFromCart(item.id);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 4L12 12M12 4L4 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
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
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-amber-500">
                    AED <Price amountUSD={item.totalPrice} />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="radio"
                      className="mr-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      name="selectedItem"
                      checked={selectedIndex === idx}
                      onChange={() => setSelectedIndex(idx)}
                    />
                  </div>
                </div>
              </div>
            </label>
          ))}
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
          <div className="mt-4">
            <button
              className="px-6 py-2 rounded-md bg-amber-500 text-white font-semibold"
              onClick={() => {
                if (!selected) return;
                setStep(2);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step2({
  selected,
  setStep,
  passengers,
  setPassengers,
  agree,
  setAgree,
  method,
  setMethod,
}: {
  selected: any;
  setStep: any;
  passengers: Passenger[];
  setPassengers: React.Dispatch<React.SetStateAction<Passenger[]>>;
  agree: boolean;
  setAgree: React.Dispatch<React.SetStateAction<boolean>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-0 mt-2 flex max-w-4xl mx-auto">
      <div className="flex-1 p-4 md:p-6 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl text-amber-500">
            <i className="fa fa-file-lines" />
          </span>
          <span className="font-bold text-xl">Extra Details</span>
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer bg-orange-50 rounded p-3">
            <input type="checkbox" defaultChecked className="mr-2" />
            <span className="text-sm">Upload Bulk Details</span>
          </label>
        </div>
        <div className="font-bold text-lg mb-2 flex items-center gap-2">
          <span className="text-amber-500">
            <i className="fa fa-passport" />
          </span>{" "}
          {selected?.visaType}
        </div>
        {passengers.map((p, idx: number) => (
          <div key={idx} className="mb-6 border-b pb-6">
            <div className="font-semibold mb-2">Passenger {idx + 1}</div>
            <form className="grid grid-cols-3 gap-4 mb-2">
              <select
                className="w-full border rounded-md p-2"
                value={p.title}
                onChange={(e) =>
                  setPassengers((arr) =>
                    arr.map((x, i: number) =>
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
                  setPassengers((arr) =>
                    arr.map((x, i: number) =>
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
                  setPassengers((arr) =>
                    arr.map((x, i: number) =>
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
                  setPassengers((arr) =>
                    arr.map((x, i: number) =>
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
                  setPassengers((arr) =>
                    arr.map((x, i: number) =>
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
                  setPassengers((arr) =>
                    arr.map((x, i: number) =>
                      i === idx ? { ...x, birthDate: e.target.value } : x,
                    ),
                  )
                }
              />
            </form>
          </div>
        ))}
      </div>
      <div className="w-96 border-l bg-slate-50 p-6 flex flex-col justify-between">
        <div>
          <div className="font-bold text-lg mb-2">Final Payment</div>
          <div className="mb-2 text-sm">
            Total Amount{" "}
            <span className="float-right">
              AED <Price amountUSD={selected?.totalPrice || 0} />
            </span>
          </div>
          <div className="bg-orange-100 rounded-lg p-4 text-center mt-4">
            <span className="font-bold text-xl">Final Amount</span>
            <span className="font-bold text-xl ml-4 text-amber-500">
              AED <Price amountUSD={selected?.totalPrice || 0} />
            </span>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button
            type="button"
            className="px-6 py-2 rounded-md bg-amber-500 text-white font-semibold"
            onClick={() => setStep(3)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function Step3({
  method,
  setMethod,
  agree,
  setAgree,
  setStep,
  setIsCheckoutModalOpen,
}: any) {
  return (
    <div className="bg-white rounded-xl shadow p-0 mt-2 max-w-3xl mx-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
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
              <img
                src="/etihad-logo.png"
                alt="Etihad Guestpay"
                className="h-6 ml-2"
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
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md border"
            onClick={() => setStep(2)}
          >
            Back
          </button>
          <button
            type="button"
            className="px-6 py-2 rounded-md bg-orange-500 text-white font-semibold"
            disabled={!agree}
            onClick={() => {
              /* placeholder - implement payment flow */ setIsCheckoutModalOpen(
                false,
              );
            }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
