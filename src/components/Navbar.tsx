"use client";
import React, { useState } from 'react';
import Icon from './Icons';
import LoginModal from './LoginModal';
import Link from "next/link";
import ServicesTabs from './ServicesTabs';
import CurrencySelector from './CurrencySelector';
import { useCart } from '../context/CartContext';

export default function Navbar(){
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { cartItems, setIsCheckoutModalOpen } = useCart();
  const cartCount = cartItems.length;

  return (
    <header className="w-full bg-white/90 backdrop-blur-sm sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold text-slate-800 animate-fade-in">Elite<span className="text-brand">Path</span></div>
        </div>
        {/* Removed top navigation bar */}
        {/* New right-side header controls */}
        <div className="flex items-center gap-6">
          {/* Helpline dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-800 text-sm font-medium focus-ring">
              Helpline
              <svg className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown menu (hidden by default) */}
            <div className="absolute left-0 mt-2 min-w-[120px] bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-40">
              <div className="px-4 py-2 text-sm text-slate-700">+971 123 4567</div>
              <div className="px-4 py-2 text-sm text-slate-700">+971 987 6543</div>
            </div>
          </div>
          {/* Currency selector (new) */}
          <div className="relative">
            <CurrencySelector />
          </div>
          {/* User login icon and label */}
          <button className="flex items-center gap-2 text-slate-800 text-sm font-medium focus-ring" onClick={() => setShowLogin(true)}>
            <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
              <circle cx="12" cy="8" r="4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 20v-1a4 4 0 014-4h8a4 4 0 014 4v1" />
            </svg>
            Log In
          </button>
          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 mx-2" />
          {/* Cart icon with orange bubble */}
          <button
            className="relative flex items-center"
            aria-label="Cart"
            onClick={() => {
              if (cartItems.length > 0) {
                setIsCheckoutModalOpen(true);
              } else {
                window.location.href = '/visas';
              }
            }}
          >
            <svg className="h-7 w-7 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h15l-1.5 9h-13z" />
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="18" cy="21" r="1.5" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-brand text-white text-xs font-bold rounded-full px-1.5 py-0.5">{cartCount}</span>
          </button>
        </div>
        {/* Mobile menu toggle remains unchanged */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-md text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            {open ? (
              <Icon.Close className="h-6 w-6" aria-hidden />
            ) : (
              <Icon.Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>
      {/* Centered ServicesTabs bar below header */}
      <div className="w-full flex justify-center">
        <ServicesTabs />
      </div>
      {/* Mobile nav panel remains unchanged */}
      {open && (
        <div className="md:hidden bg-white/95 border-t animate-slide-up">
          <div className="px-4 py-3 flex flex-col gap-2">
            <button className="text-left px-3 py-2 rounded-md hover:bg-slate-100">Activities</button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-slate-100">Hotels</button>
            <button className="text-left px-3 py-2 rounded-md hover:bg-slate-100">Holidays</button>
            <Link href="/visas" className="text-left px-3 py-2 rounded-md hover:bg-slate-100">Visa</Link>
          </div>
        </div>
      )}
      {/* Login modal */}
      <LoginModal isOpen={showLogin} onClose={()=>setShowLogin(false)} />
    </header>
  );
}
