"use client";
import React from "react";
import { CartItem } from "../context/CartContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function UndoToast({
  stack,
  onUndo,
  onDismiss,
}: {
  stack: { uid: string; item: CartItem; expiresAt?: number }[];
  onUndo: (uid?: string) => void;
  onDismiss: (uid: string) => void;
}) {
  if (!stack || stack.length === 0) return null;

  return (
    <div className="fixed right-6 bottom-6 z-60">
      <TransitionGroup className="toast-stack">
        {stack.map((entry) => (
          <CSSTransition key={entry.uid} timeout={260} classNames="toast">
            <div className="toast-item bg-white border-l-4 border-amber-400 rounded-lg shadow px-3 py-2 flex items-center gap-2 md:gap-4">
              <div className="text-sm md:text-base">
                <div className="flex items-center gap-2 md:gap-3">
                  <svg
                    className="h-5 w-5 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5v7l4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <div>
                      Removed{" "}
                      <span className="font-semibold">
                        {entry.item.visaType}
                      </span>
                    </div>
                    <div className="text-[10px] md:text-xs text-slate-500">
                      {entry.item.processingType} • {entry.item.travelDate} •{" "}
                      {entry.item.count} pax
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-2 md:ml-4 flex items-center gap-2">
                <button
                  className="text-xs md:text-sm text-amber-500 font-semibold px-2 py-1 rounded hover:underline"
                  onClick={() => onUndo(entry.uid)}
                >
                  Undo
                </button>
                <button
                  className="text-xs md:text-sm text-slate-500 px-2 py-1 rounded"
                  onClick={() => onDismiss(entry.uid)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
