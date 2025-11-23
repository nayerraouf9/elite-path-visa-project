'use client'
import React from 'react'
import Icon from './Icons'

export default function SearchBar(){
  return (
    <form className="w-full max-w-3xl mx-auto bg-white/95 rounded-2xl p-3 shadow-md animate-fade-in" role="search" aria-label="Search for trips">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <label className="flex items-center gap-3 bg-transparent rounded-lg px-3 py-2 border border-transparent hover:border-white/40 transition">
          <Icon.Location className="h-5 w-5 text-slate-500" aria-hidden />
          <input aria-label="location" name="location" placeholder="Where to?" className="search-input focus-ring" />
        </label>

        <label className="flex items-center gap-3 bg-transparent rounded-lg px-3 py-2 border border-transparent hover:border-white/40 transition">
          <Icon.Calendar className="h-5 w-5 text-slate-500" aria-hidden />
          <input aria-label="dates" name="dates" placeholder="Add dates" className="search-input focus-ring" />
        </label>

        <div className="flex items-center gap-3">
          <label className="flex-1 flex items-center gap-3 bg-transparent rounded-lg px-3 py-2 border border-transparent hover:border-white/40 transition">
            <Icon.Users className="h-5 w-5 text-slate-500" aria-hidden />
            <input aria-label="guests" name="guests" placeholder="1 guest" className="search-input focus-ring" />
          </label>

          <button type="submit" className="ml-2 btn-brand px-4 py-2 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform" aria-label="Search trips">Search</button>
        </div>
      </div>
    </form>
  )
}
