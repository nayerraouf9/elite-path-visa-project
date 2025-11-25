"use client"
import React, { useState } from 'react'
import DatePicker from '../src/components/DatePicker'
import { useCart } from '../src/context/CartContext'
import CheckoutModal from '../src/components/CheckoutModal'

export default function AustraliaVisaPage(){
  const [processing, setProcessing] = useState('')
  const [travelDate, setTravelDate] = useState<string | null>(null)
  const [count, setCount] = useState('')

  const handleCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(e.target.value);
  };

  const { addToCart, setIsCheckoutModalOpen } = useCart();

  const isSearchEnabled = Boolean(processing && travelDate && count && Number(count) > 0)

  const handleAddToCart = () => {
    const cnt = Number(count) || 1;
    const newId = addToCart({
      visaType: 'Australia Visa - subclass 600',
      travelDate: travelDate,
      processingType: processing,
      count: cnt,
      totalPrice: 1000 * cnt
    });
    // open global checkout modal
    setIsCheckoutModalOpen(true);
  }

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
                    <option value="" disabled>Processing Type</option>
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
                <button onClick={handleAddToCart} disabled={!isSearchEnabled} className={`px-4 py-2 rounded-md ${isSearchEnabled ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>Add to Cart</button>
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

        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2>Australia Visa Online</h2>
            <p>
              With its awe-inspiring blend of lively cities, coastal experiences, untouched wilderness, wildlife wonders, and natural diversity accompanied by laidback feel, Australia is easily one of the most sought-after vacation spots. So if you plan for a trip to this wonderful country, we can help you with all your travel arrangements including professional visa assistance.
            </p>
            <p>
              As a specialist in international visa services, Elite Path Tours offers prompt visa services to people who wish to travel to Australia. Be it for holidaying or business purpose, our highly knowledgeable and experienced visa team will assist you through the meticulous procedures, from the expert advice on the selection of right visa as well as eligibility criteria to the submission of your application as per the rules and regulations to keep you updated till the approval and on time delivery of your Australian visa.
            </p>
            <p>
              Make a quick enquiry of our visa services by filling out all relevant details, such as number of visas, travel date, and processing type. The rest is assured that our panel of experts will review your queries and get back to you at the earliest possible convenience, ensuring seamlessly quick visa processing. Depending on the type of visa, you'll be required to meet certain requirements for the approval of your visa. Please refer to the 'Visa Documents' section for the entire list.
            </p>

            <h2>Australia Visa Documents</h2>

            <h3>Identity</h3>
            <ul>
              <li>Passport-Sized Photograph: One recent (no older than 6 months) photo (45mm x 35mm).</li>
              <li>Passport: Certified copies of the biographical pages of your current passport (and any travel pages with stamps/visas). Your passport should be valid for at least six months.</li>
              <li>National Identity Card (if applicable).</li>
              <li>Birth Certificate: Certified copy showing the names of both parents.</li>
            </ul>

            <h3>Financial Documents (Evidence of Sufficient Funds) </h3>
            <p>
              You need to show you have enough money to support yourself during your stay and to leave Australia. This evidence should be recent (e.g., for the last 3-6 months).
            </p>
            <ul>
              <li>Personal Bank Statements</li>
              <li>Pay Slips</li>
              <li>Tax Records or audited accounts.</li>
              <li>Credit Card Statements showing the available limit.</li>
              <li>Evidence of Assets: Such as property ownership or term deposits.</li>
            </ul>

            <h3>Proof of Genuine Temporary Stay (Ties to Home Country) </h3>
            <p>
              The Australian government needs assurance that you genuinely intend to visit temporarily and return home.
            </p>
            <ul>
              <li>
                Employment Details: A letter from your employer stating your position, salary, length of employment, and confirming your approved leave dates and your intention to return to your job.
              </li>
              <li>
                For Business Owners/Self-Employed: Certified copies of your business registration/license, company bank statements, and tax records.
              </li>
              <li>
                For Students: A letter from your school/university confirming your enrolment, course duration, and approved leave.
              </li>
              <li>
                Evidence of Significant Assets in your home country (e.g., house title deeds).
              </li>
              <li>
                Evidence of Immediate Family Members remaining in your home country (e.g., spouse or children).
              </li>
            </ul>

            <h3>Elite Path Assistance</h3>
            <ul>
              <li>Application Form Filling assistance</li>
              <li>Verification of Documents</li>
              <li>Flight & Hotel Booking assistance</li>
              <li>Online Visa Application</li>
            </ul>

            <h2>How to apply Australia Visa</h2>
            <p>
              Simply contact the Elite Path tours representatives and rest assured we will be there for your assistance for the entire Visa processing. Contact us at: <strong>intvisas@Elite Pathtours.com</strong> or call us on our toll free number: <strong>80072962</strong> or Call on <strong>+971 42 087 543</strong>
            </p>

            <h2>Australia Visa FAQs</h2>

            <h3>Is it mandatory to have a visa to enter or visit Australia?</h3>
            <p>
              All travelers, except those from Australia and New Zealand, must have an approved visa or entry permit.
            </p>

            <h3>Can I apply for an Australia visa online?</h3>
            <p>
              Yes, most Australia visa applications can be submitted online with the help of our visa specialists, who will guide you through every step of the process.
            </p>

            <h3>I am joined by my kids; do they need a Australia visa to enter Australia?</h3>
            <p>
              Yes, all members, including infants and kids joining you on the trip, will need a valid visa to enter Australia.
            </p>

            <h3>What are the procedures to apply for an Australia visa?</h3>
            <p>
              Simply speak to our visa specialists, who will help you choose the right visa suitable for your Australia trip. They will compile all documents, complete your visa application, and submit it on your behalf to the Australian Embassy. Apart from these, our team will keep you abreast of your application status until it is approved on time.
            </p>

            <h3>Who can apply for an Australia visa through Elite Path Tours?</h3>
            <p>
              Our Australia Visa service is open to UAE nationals and UAE residents only.
            </p>

            <h3>What are the documents and requirements for the application for an Australia visa?</h3>
            <p>
              To apply for an Australia visa, you will need the following documents: - Original passport with a validity of at least six months - UAE Residence Visa valid for at least 90 days - Three recent photographs taken against a white background - NOC letter from the employer and invitation letter from your acquaintance in Australia
            </p>

            <h3>Do I need to provide biometric data for an Australia visa?</h3>
            <p>
              Yes, depending on your nationality and application type, you may be required to visit the nearest Australia Visa Application Centre (AVAC) to provide biometrics (fingerprints and a photo).
            </p>

            <h3>Do I need travel insurance to apply for an Australia visa?</h3>
            <p>
              While not mandatory, having valid travel insurance is highly recommended as it may support your visa application and safeguard you during your trip.
            </p>

            <h3>Is it possible to extend my Australia visa?</h3>
            <p>
              This depends on your visa type. Contact our visa experts for more details or assistance.
            </p>

            <h3>How many days will it take for the Australia visa processing?</h3>
            <p>
              Depending on your visa choice, it takes between 25 days and 30 days for the processing of your Australia visa application.
            </p>

            <h3>Is the visa fee refundable if I cancel my trip after getting the Australia visa?</h3>
            <p>
              No, once your visa has been approved, the fee is non-refundable regardless of whether you travel or not.
            </p>

            <h3>Do you make a refund in case my Australia visa is rejected?</h3>
            <p>
              The visa fee cannot be refunded if your Australia application is rejected, as the issuing authority mostly does not reimburse the amount.
            </p>

            <h3>Can I reapply if my Australia visa is refused?</h3>
            <p>
              Yes, you can reapply after a refusal, but you must carefully address the reasons for rejection. Our visa specialists will assist you in preparing a stronger reapplication.
            </p>
          </div>
        </div>

      </div>
      <CheckoutModal />
    </main>
  )
}
