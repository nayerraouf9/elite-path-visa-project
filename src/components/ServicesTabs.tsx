'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const tabs = [
  'Activities',
  'Hotels',
  'Holidays',
  'Visa',
  'Cruise'
]

export default function ServicesTabs(){
  const [active, setActive] = useState(tabs[0])

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x services-tabs" role="tablist" aria-label="Services">
        {tabs.map((t)=> {
          const content = (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              aria-current={active === t ? 'true' : undefined}
              onClick={() => setActive(t)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium shadow-sm transition transform ${active === t ? 'bg-brand text-white scale-105' : 'bg-white/90 text-slate-700 hover:scale-105'}`}
            >
              {t}
              <span className={`block h-0.5 mt-2 rounded-full transition-all ${active === t ? 'bg-white w-6' : 'bg-transparent w-0'}`}></span>
            </button>
          )

          // Provide direct navigation for tabs that have routes
          if (t === 'Visa') {
            return (
              <Link key={t} href="/visas" className="no-underline">
                {content}
              </Link>
            )
          }

          if (t === 'Hotels') {
            return (
              <Link key={t} href="/hotels" className="no-underline">
                {content}
              </Link>
            )
          }

          return content
        })}
      </div>
    </div>
  )
}
