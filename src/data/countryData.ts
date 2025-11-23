export type CountryData = {
  slug: string
  displayName: string
  basePriceUSD: number
  currency?: string
  description?: string
  reviews?: number
  processingOptions?: string[]
  requiredDocuments?: string[]
  visaTypeDocuments?: Record<string, string[]>
}

const data: Record<string, CountryData> = {
  'united-states': {
    slug: 'united-states',
    displayName: 'USA',
    basePriceUSD: 327,
    currency: 'USD',
    description: '',
    reviews: 77,
    processingOptions: ['Normal', 'Express', 'Priority'],
    requiredDocuments: [
      'Passport valid at least 6 months beyond your stay.',
      'Completed DS-160 form confirmation page.',
      'Visa fee payment receipt.',
      'A photo that meets U.S. visa standards, which are somehow stricter than physics.',
      'Interview appointment confirmation.',
      'Proof you actually intend to return home (evidence of employment, property, family ties, etc.).',
      'Bank statements or other proof you can fund your stay.',
      'Travel itinerary if you already planned one.'
    ],
    visaTypeDocuments: {
      'Work visa': ['Petition approval notices', 'Job offer documents'],
      'Student visa': ['I-20 form', 'School admission documents'],
      'Exchange visitor': ['DS-2019'],
      'Business': ['Invitation letter', 'Meeting details']
    }
  },
  'usa': {
    slug: 'usa',
    displayName: 'USA',
    basePriceUSD: 327,
    currency: 'USD',
    description: 'US B1/B2 visa processing for tourism and business.',
    reviews: 77,
    processingOptions: ['Normal', 'Express']
  },
  'united-arab-emirates': {
    slug: 'united-arab-emirates',
    displayName: 'United Arab Emirates',
    basePriceUSD: 50,
    currency: 'AED',
    description: 'Quick e-visa processing for UAE visitors.',
    reviews: 12,
    processingOptions: ['Normal', 'Express']
  },
  'india': {
    slug: 'india',
    displayName: 'India',
    basePriceUSD: 25,
    currency: 'INR',
    description: 'Tourist and business e-visa options for India.',
    reviews: 8,
    processingOptions: ['Normal', 'Express']
  },
  'united-kingdom': {
    slug: 'united-kingdom',
    displayName: 'United Kingdom',
    basePriceUSD: 150,
    currency: 'GBP',
    description: 'UK visitor visa options and guidance.',
    reviews: 21,
    processingOptions: ['Normal', 'Priority']
  },
  'germany': {
    slug: 'germany',
    displayName: 'Germany',
    basePriceUSD: 130,
    currency: 'EUR',
    description: 'Schengen visa info and processing options.',
    reviews: 9,
    processingOptions: ['Normal', 'Express']
  }
}

export default data
