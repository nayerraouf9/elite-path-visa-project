"use client"
import React, { useState } from 'react'
import DatePicker from '../src/components/DatePicker'

export default function AustraliaVisaPage(){
  const [processing, setProcessing] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [count, setCount] = useState('')

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(e.target.value);
  };

  const isSearchEnabled = Boolean(processing && travelDate && count && Number(count) > 0)

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold">Australia Visa</h1>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-md">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  <div>Normal 25-30 Working Days</div>
                </div>

                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-md">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 11h16M4 15h16"/></svg>
                  <div>Easy Documentation</div>
                </div>

                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-md">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2v4a2 2 0 002 2h2a2 2 0 002-2v-4c0-1.105-1.343-2-3-2z"/></svg>
                  <div>Online Payment Option</div>
                </div>

                <div className="flex items-center gap-3 bg-white/50 p-3 rounded-md">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12h18M12 3v18"/></svg>
                  <div>Express Working Days</div>
                </div>
              </div>
            </div>

            <div className="hidden md:block" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-0" style={{overflow: 'visible'}}>
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Australia Visa Prices & Options</h2>
          </div>

          <div className="p-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="flex items-center gap-3 mb-4">
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md" />
                <div className="font-medium">Australia Visa - subclass 600</div>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col text-sm">
                  <span className="text-slate-500 text-xs mb-1">Processing Type</span>
                  <select value={processing} onChange={(e)=>setProcessing(e.target.value)} className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none">
                    <option value="">Select</option>
                    <option>Normal</option>
                    <option>Express</option>
                  </select>
                </label>

                <label className="flex flex-col text-sm">
                  <span className="text-slate-500 text-xs mb-1">Travel Date</span>
                  <div className="relative">
                    <DatePicker value={travelDate} onChange={(v)=>setTravelDate(v)} />
                  </div>
                </label>

                <label className="flex flex-col text-sm">
                  <span className="text-slate-500 text-xs mb-1">No. Of Visa</span>
                  <select value={count} onChange={handleCountChange} className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none">
                    <option value="">Select</option>
                    {[...Array(10)].map((_, i) => (
                      <option key={i+1} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 border-t pt-4 flex items-center justify-end gap-4">
                <button className="px-4 py-2 rounded-md border border-amber-300 text-amber-600">Quick Enquiry</button>
                <button disabled={!isSearchEnabled} className={`px-4 py-2 rounded-md ${isSearchEnabled ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>Add to Cart</button>
              </div>
            </div>

            <div className="w-full lg:w-72">
              <div className="bg-slate-50 p-5 rounded-lg shadow-inner text-right">
                <div className="text-sm text-slate-500">Price</div>
                <div className="text-xl font-bold text-amber-500 mt-2">AED 1,000.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
