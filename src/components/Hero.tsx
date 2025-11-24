"use client";
import React from "react";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="hero-bg relative min-h-[560px]">
      <div className="absolute inset-0 hero-overlay"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <p className="uppercase text-sm tracking-wide opacity-90 animate-fade-in">
              Explore carefully picked stays
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mt-3 animate-slide-up">
              Find Your Next Adventure
            </h1>
            <p className="mt-4 text-base md:text-lg opacity-90 animate-fade-in">
              Handpicked hotels, activities and packages to make every trip
              memorable.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button className="btn-brand px-6 py-3 rounded-md font-semibold shadow-md hover:translate-y-[-2px] transition-transform animate-fade-in">
                Get Started
              </button>
              <button className="bg-white/20 text-white px-4 py-2 rounded-md opacity-90 hover:opacity-100 transition animate-fade-in">
                Learn More
              </button>
            </div>
          </div>

          <div className="md:pl-8">
            <div className="mt-6 md:mt-0">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
      {/* subtle bottom curve to separate hero from content */}
      <div className="relative -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-8"></div>
        </div>
      </div>
    </section>
  );
}
