"use client"
import React from 'react'
import { CartItem } from '../context/CartContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

export default function UndoToast({
  stack,
  onUndo,
  onDismiss,
}: {
  stack: { uid: string; item: CartItem; expiresAt?: number }[];
  onUndo: (uid?: string) => void;
  onDismiss: (uid: string) => void;
}){
  if (!stack || stack.length === 0) return null;

  return (
    <div className="fixed right-6 bottom-6 z-60">
      <TransitionGroup className="toast-stack">
        {stack.map(entry => (
          <CSSTransition key={entry.uid} timeout={260} classNames="toast">
            <div className="toast-item bg-white border rounded-lg shadow px-4 py-3 flex items-center gap-4">
          <div className="text-sm">
            <div>Removed <span className="font-semibold">{entry.item.visaType}</span></div>
            <div className="text-xs text-slate-500">{entry.item.processingType} • {entry.item.travelDate} • {entry.item.count} pax</div>
          </div>
          <div className="ml-4 flex items-center gap-2">
            <button className="text-sm text-amber-500 font-semibold px-3 py-1 rounded hover:underline" onClick={()=>onUndo(entry.uid)}>Undo</button>
            <button className="text-sm text-slate-500 px-2 py-1 rounded" onClick={()=>onDismiss(entry.uid)}>Dismiss</button>
          </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}
