// d:\Elite Path\visas\australia\page.tsx

import React from 'react';

// This is the main component for the Australia Visa page
export default function AustraliaVisaPage() {
    return (
        <div className="container mx-auto p-4 md:p-8">
            {/* Top Section: Title, Price, and Booking Button */}
            <header className="bg-white p-6 shadow-md rounded-lg mb-8 border-t-4 border-blue-600">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Australia Visa</h1>
                <p className="text-xl text-gray-600 mb-4">Tourist Visa and Visit Visa from Dubai and UAE.</p>
                
                {/* Price and Booking Section - simulates the original sidebar */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="text-left">
                        <span className="text-sm text-gray-500 block">Starts from</span>
                        <span className="text-3xl font-bold text-red-600">1000.00 AED</span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-md">
                        Book Now
                    </button>
                </div>
            </header>

            {/* Two-Column Structure: Main Content (8/12) and Sidebar (4/12) */}
            <main className="flex flex-col lg:flex-row gap-8">
                
                {/* Right Column (Main Content) */}
                <section className="lg:w-8/12 space-y-10">
                    
                    {/* 1. Overview Section (Visa Detail) */}
                    <div id="visa-detail" className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Australia Visa Overview</h2>
                        <p className="text-gray-700 leading-relaxed">
                            With its amazing blend of vibrant cities, coastal experiences, untouched wilderness, wildlife wonders, and natural diversity, Australia is easily one of the most desired holiday destinations. If you're planning a trip to this fascinating country, we can assist you with all travel arrangements, including professional visa assistance.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-3">
                            As specialists in international visa services, Elite Path Tours offer immediate visa services for those wishing to travel to Australia from the UAE. Whether the purpose is tourism or business, our experienced and knowledgeable team will provide assistance through the precise procedures, starting from expert advice on choosing the appropriate visa and eligibility criteria, through to submitting your application in accordance with the rules and regulations.
                        </p>
                    </div>

                    {/* 2. Documents Section (australia Visa Documents) */}
                    <div id="visa-documents" className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">australia Visa Documents</h2>
                        
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">Client Documents</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>**Valid UAE Residence Visa** (90 days validity).</li>
                            <li>**Original Passport required** (6 months validity with at least two blank pages).</li>
                            <li>**Original NOC (No Objection Certificate)** stating salary, position, joining date, and purpose of travel (for employees).</li>
                            <li>**3 recent personal photos** with a white background (3.5 * 4.5 cm).</li>
                            <li>**Invitation letter** from a friend or relative can be an added advantage.</li>
                            <li>**Invitation letter required** for a business visa.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-blue-600 mt-6 mb-3">Rayna Tours Assistance</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                            <li>Assistance with filling out the application form.</li>
                            <li>Document verification.</li>
                            <li>Assistance with flight and hotel bookings.</li>
                            <li>Online visa application submission.</li>
                        </ul>
                    </div>
                    
                    {/* 3. FAQs Section */}
                    <div id="visa-faqs" className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">FAQs about australia Visa</h2>
                        
                        <FAQItem 
                            question="Is a visa mandatory to enter or visit australia?" 
                            answer="All travelers, except citizens of australia and New Zealand, must have a visa or approved entry permit."
                        />
                        <FAQItem 
                            question="How many days does australia visa processing take?" 
                            answer="Depending on the visa option, processing an australia visa application takes between 25 and 30 days."
                        />
                        <FAQItem 
                            question="Can I reapply if my australia visa is rejected?" 
                            answer="Yes, you can reapply after a rejection, but you must carefully address the reasons for rejection. Our visa specialists will assist you in preparing a stronger re-application."
                        />
                    </div>

                    {/* 4. Terms & Conditions Section */}
                    <div id="visa-terms" className="bg-white p-6 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Terms and Conditions for australia Visa</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            These terms and conditions form the legal basis for our australia visa services. By submitting your australia visa application, you agree to abide by the following terms...
                        </p>
                        <h3 className="text-xl font-semibold text-blue-600 mb-3">1. Scope and Procedures</h3>
                        <p className="text-gray-700 leading-relaxed">
                            We provide professional australia visa services for all individuals (mainly UAE residents)... (Terms content here)
                        </p>
                        <h3 className="text-xl font-semibold text-blue-600 mt-4 mb-3">6. Cancellation and Refund Policies</h3>
                        <p className="text-gray-700 leading-relaxed">
                            After the visa file is opened and your application is submitted, all payments are non-refundable, regardless of approval or rejection... (Terms content here)
                        </p>
                    </div>
                </section>

                {/* Left Column (Sidebar) */}
                <aside className="lg:w-4/12 space-y-8">
                    
                    {/* Quick Enquiry Section */}
                    <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-red-500">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Enquiry</h3>
                        <p className="text-gray-600 mb-4">A travel expert will assist you!</p>
                        <p className="text-lg font-semibold text-blue-600 mb-2">+971 42087445</p>
                        <p className="text-lg font-semibold text-blue-600 mb-4">+971 561794005</p>
                        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition duration-300">
                            Send Enquiry
                        </button>
                    </div>

                    {/* Public Holidays Section */}
                    <div className="bg-white p-6 shadow-md rounded-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Expected Public Holidays for 2025</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Holiday</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                                <tr><td className="px-3 py-2 whitespace-nowrap">01-Jan-2025</td><td className="px-3 py-2 whitespace-nowrap">New Year's Day</td></tr>
                                <tr><td className="px-3 py-2 whitespace-nowrap">10-Mar-2025</td><td className="px-3 py-2 whitespace-nowrap">Canberra Day</td></tr>
                                <tr><td className="px-3 py-2 whitespace-nowrap">18-Apr-2025</td><td className="px-3 py-2 whitespace-nowrap">Good Friday</td></tr>
                                <tr><td className="px-3 py-2 whitespace-nowrap">25-Apr-2025</td><td className="px-3 py-2 whitespace-nowrap">Anzac Day</td></tr>
                            </tbody>
                        </table>
                    </div>
                </aside>
            </main>
            
            {/* Reviews Section */}
            <section id="reviews" className="mt-8 bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">australia Visa Reviews</h2>
                <p className="text-gray-600">Customer reviews will be displayed here (5.0/5.0).</p>
            </section>
        </div>
    );
}

// Simple sub-component to represent an FAQ item
interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    // You can use an Accordion or details/summary component here to make it collapsible
    return (
        <details className="py-3 border-b cursor-pointer">
            <summary className="font-semibold text-gray-800 hover:text-blue-600 transition duration-150">
                {question}
            </summary>
            <p className="mt-2 pl-4 text-gray-600">{answer}</p>
        </details>
    );
};
