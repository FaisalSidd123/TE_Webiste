import { IMAGES } from './images';

// Landmark Real Estate Advisory & Signature Acquisitions
export const PROJECTS = [
  {
    id: 'mandate-1',
    name: 'The Waterfront Villa',
    location: 'DHA Phase 8',
    year: '2025',
    category: 'Private Residence Mandate',
    area: '500 sq yd',
    timeline: 'Verified Acquisition',
    beforeImage: IMAGES.showcase1After, // Exterior
    afterImage: IMAGES.livingRoom, // Curated Interior
    beforeLabel: 'EXTERIOR FACADE',
    afterLabel: 'CURATED INTERIOR',
    description:
      'Negotiated and acquired on behalf of an overseas client following exhaustive DHA legal verification and market valuation 8% below prevailing peak rates.',
  },
  {
    id: 'mandate-2',
    name: 'The Courtyard Estate',
    location: 'Bahria Town',
    year: '2024',
    category: 'Luxury Family Estate',
    area: '500 sq yd',
    timeline: 'Exclusive Agency Sale',
    beforeImage: IMAGES.showcase2After, // Exterior
    afterImage: IMAGES.villaPalms, // Interior / Grounds
    beforeLabel: 'GROUNDS & ELEVATION',
    afterLabel: 'RESIDENTIAL LIVING',
    description:
      'Represented a family in securing a private custom estate with immediate possession, clear leasehold transfer, and complete utility documentation.',
  },
  {
    id: 'mandate-3',
    name: 'The Sea View Penthouse',
    location: 'Clifton Block 2',
    year: '2024',
    category: 'High-Yield Asset Advisory',
    area: '3,200 sq ft',
    timeline: 'Investment Placement',
    beforeImage: IMAGES.prop2, // Building Exterior
    afterImage: IMAGES.consultApartment, // Luxury Interior
    beforeLabel: 'COASTAL RESIDENCE',
    afterLabel: 'EXECUTIVE INTERIOR',
    description:
      'Structured a strategic acquisition and subsequent corporate executive lease, generating an immediate 8.2% annual net rental return for the property owner.',
  },
];
