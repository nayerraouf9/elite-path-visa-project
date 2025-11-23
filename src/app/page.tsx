import React from 'react'
import Hero from '../components/Hero'
import ServicesTabs from '../components/ServicesTabs'

export default function Home(){
  return (
    <div className="min-h-screen bg-slate-50">
      <main>
        <Hero />
        <ServicesTabs />
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-4">Popular Picks</h2>
          <p className="text-slate-600">Explore curated activities, hotels and packages to inspire your next trip.</p>
        </section>
      </main>
    </div>
  )
}
