// Client-side visa search form
"use client";
import React, { useState } from "react";
import DatePicker from "../../components/DatePicker";
import AlertModal from "../../components/AlertModal";
import Price from "../../components/Price";
import { useRouter } from "next/navigation";

export default function VisaPage() {
  // start fields empty so user must select
  const [visaFor, setVisaFor] = useState("");
  const [countryGoingTo, setCountryGoingTo] = useState("");
  const [selectNationality, setSelectNationality] = useState("");
  const [selectLiving, setSelectLiving] = useState("");
  // travelDate can be null when not set
  const [travelDate, setTravelDate] = useState<string | null>(null);

  const COUNTRIES = [
    "Afghanistan",
    "Åland Islands",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bonaire, Sint Eustatius and Saba",
    "Bosnia and Herzegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (Democratic Republic)",
    "Cook Islands",
    "Costa Rica",
    "Côte d'Ivoire",
    "Croatia",
    "Cuba",
    "Curaçao",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard Island and McDonald Islands",
    "Holy See (Vatican City)",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macao",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "North Korea",
    "North Macedonia",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn Islands",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Réunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Barthélemy",
    "Saint Helena",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Martin",
    "Saint Pierre and Miquelon",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Sint Maarten",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia and the South Sandwich Islands",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna",
    "Western Sahara",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const router = useRouter();

  function slugify(name: string) {
    return name
      .toString()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const [alert, setAlert] = useState<{
    open: boolean;
    title?: string;
    message?: string;
  }>({ open: false });

  function showMissing(fieldLabel: string) {
    setAlert({
      open: true,
      title: "Please Select",
      message: `Please Select ${fieldLabel}.`,
    });
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visaFor) {
      showMissing("Visa For");
      return;
    }
    if (!countryGoingTo) {
      showMissing("Country Going To");
      return;
    }
    if (!selectNationality) {
      showMissing("Nationality");
      return;
    }
    if (!selectLiving) {
      showMissing("Living In");
      return;
    }
    if (!travelDate) {
      showMissing("Travel Date");
      return;
    }

    // all good, navigate
    const slug = slugify(countryGoingTo);
    router.push(`/visas/${slug}`);
  };

  // Enable search only when all fields are provided
  const isSearchEnabled = Boolean(
    visaFor && countryGoingTo && selectNationality && selectLiving && travelDate,
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-50 via-white to-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-5 md:p-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            {/* Left fields */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 w-full">
              <label className="flex flex-col text-sm">
                <span className="text-slate-600 text-xs mb-1">Visa For</span>
                <select
                  data-testid="visa-for-select"
                  value={visaFor}
                  onChange={(e) => setVisaFor(e.target.value)}
                  className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none"
                >
                  <option value="" disabled>
                    Visa For
                  </option>
                  <option>Tourist</option>
                  <option>Business</option>
                  <option>Work</option>
                  <option>Student</option>
                </select>
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-600 text-xs mb-1">
                  Country Going To
                </span>
                <select
                  data-testid="country-to-select"
                  value={countryGoingTo}
                  onChange={(e) => setCountryGoingTo(e.target.value)}
                  className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none"
                >
                  <option value="" disabled>
                    Country Going To
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-600 text-xs mb-1">
                  Select Nationality
                </span>
                <select
                  data-testid="nationality-select"
                  value={selectNationality}
                  onChange={(e) => setSelectNationality(e.target.value)}
                  className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none"
                >
                  <option value="" disabled>
                    Select Nationality
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={`nat-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-600 text-xs mb-1">
                  Select Living
                </span>
                <select
                  data-testid="living-select"
                  value={selectLiving}
                  onChange={(e) => setSelectLiving(e.target.value)}
                  className="px-3 py-2 rounded-md border border-slate-200 bg-white text-sm focus:outline-none"
                >
                  <option value="" disabled>
                    Select Living
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={`live-${c}`} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col text-sm">
                <span className="text-slate-600 text-xs mb-1">Travel Date</span>
                <div className="relative flex items-center gap-2">
                  <DatePicker value={travelDate} onChange={(v) => setTravelDate(v)} />
                  <button
                    type="button"
                    aria-label="Clear date"
                    className="sr-only"
                    onClick={() => setTravelDate(null)}
                  >
                    Clear
                  </button>
                  {/* Hidden date input to allow e2e tests to set date directly */}
                  <input
                    data-testid="travel-date-input"
                    aria-label="Travel Date Input"
                    type="date"
                    value={travelDate || ""}
                    onChange={(e) => setTravelDate(e.target.value || null)}
                    className="sr-only"
                  />
                </div>
              </label>
            </div>

            {/* Search button on the right */}
            <div className="w-full md:w-auto md:pl-3">
              <button
                data-testid="search-button"
                type="submit"
                className={`w-full md:w-44 h-full text-lg rounded-xl font-bold text-white transition-opacity ${!isSearchEnabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"}`}
              >
                Search
              </button>
              {!isSearchEnabled && (
                <p className="text-red-500 text-xs mt-1 text-center font-medium">
                  Please fill all fields to search.
                </p>
              )}
            </div>
          </form>
          {alert.open && (
            <AlertModal
              title={alert.title}
              message={alert.message || ""}
              onClose={() => setAlert({ open: false })}
            />
          )}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Fields: Visa For, Nationality, Living country, and Travel date. Click
          Search to run the query.
        </p>

        {/* Demo price preview for selected currency */}
        <PriceDemo />
      </div>
    </main>
  );
}

function PriceDemo() {
  const basePriceUSD = 50; // example base price in USD
  return (
    <div className="max-w-5xl mx-auto px-6 mt-6">
      <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">Average Visa Fee</div>
          <div className="text-2xl font-semibold text-slate-900">
            <Price amountUSD={basePriceUSD} />
          </div>
        </div>
        <div className="text-sm text-slate-400">
          Converted from base USD {basePriceUSD}
        </div>
      </div>
    </div>
  );
}
