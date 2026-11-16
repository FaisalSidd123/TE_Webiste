import { IMAGES } from './images';

// TODO: replace with client data — real listings and photography.
export const PROPERTY_TABS = [
  { id: 'all', label: 'All' },
  { id: 'sale', label: 'For Sale' },
  { id: 'rent', label: 'For Rent' },
  { id: 'project', label: 'Our Projects' },
];

export const PROPERTIES = [
  {
    id: 'prop-1',
    category: 'sale',
    tag: 'FOR SALE',
    title: '500 sq yd Contemporary Villa',
    location: 'DHA Phase 6, Karachi',
    price: 'PKR 12 Crore',
    beds: 5,
    baths: 6,
    area: '500 sq yd',
    isArched: true, // Arched top to echo mark's window
    image: IMAGES.prop1,
    gallery: [IMAGES.prop1, IMAGES.livingRoom, IMAGES.villaPool],
    description:
      'Architecturally designed custom villa with double-height foyer, Italian porcelain flooring, imported kitchen fittings, private swimming pool, and dedicated staff quarters.',
    features: ['Double-Height Ceilings', 'Swimming Pool', 'Solar System 15kW', 'Smart Automation', 'Imported Fixtures'],
  },
  {
    id: 'prop-2',
    category: 'sale',
    tag: 'FOR SALE',
    title: '3 Bed Sea View Apartment',
    location: 'Clifton Block 2, Karachi',
    price: 'PKR 6.8 Crore',
    beds: 3,
    baths: 3,
    area: '2,200 sq ft',
    isArched: false,
    image: IMAGES.prop2,
    gallery: [IMAGES.prop2, IMAGES.livingRoom, IMAGES.facadeTimber],
    description:
      'High-floor luxury corner apartment with unobstructed Arabian Sea views, spacious private balconies, contemporary open-concept layout, standby generator and 24/7 guarded security.',
    features: ['Unobstructed Sea View', 'Covered Parking (2 Cars)', 'Standby Generator', 'High-Speed Elevators'],
  },
  {
    id: 'prop-3',
    category: 'sale',
    tag: 'FOR SALE',
    title: '250 sq yd Family Home',
    location: 'Bahria Town Precinct 10, Karachi',
    price: 'PKR 3.9 Crore',
    beds: 4,
    baths: 5,
    area: '250 sq yd',
    isArched: false,
    image: IMAGES.prop3,
    gallery: [IMAGES.prop3, IMAGES.villaWhite, IMAGES.livingRoom],
    description:
      'Newly completed custom residence positioned on a prime wide street. Features premium woodwork, energy-efficient insulation, rooftop terrace and clear verified documentation.',
    features: ['Rooftop Terrace', 'Solid Ash Woodwork', 'Park Facing', 'Ready for Possession'],
  },
  {
    id: 'prop-4',
    category: 'rent',
    tag: 'FOR RENT',
    title: '2 Bed Furnished Apartment',
    location: 'Gulshan-e-Iqbal Block 13, Karachi',
    price: 'PKR 120,000 / mo',
    beds: 2,
    baths: 2,
    area: '1,350 sq ft',
    isArched: true, // Second arched card
    image: IMAGES.prop4,
    gallery: [IMAGES.prop4, IMAGES.livingRoom, IMAGES.villaPalms],
    description:
      'Fully designer-furnished executive apartment with air conditioning, equipped modern kitchen, peaceful building with active management and verified tenancy agreements.',
    features: ['Fully Furnished', 'Gated Community', 'Elevator Access', 'Dedicated Reserved Parking'],
  },
  {
    id: 'prop-5',
    category: 'sale',
    tag: 'FOR SALE',
    title: 'Corner Commercial Plot 200 sq yd',
    location: 'Scheme 33, Karachi',
    price: 'PKR 2.4 Crore',
    beds: null,
    baths: null,
    area: '200 sq yd',
    isArched: false,
    image: IMAGES.prop5,
    gallery: [IMAGES.prop5, IMAGES.drawings, IMAGES.facadeTimber],
    description:
      'Prime 200 sq yd commercial corner plot on a 100-foot main boulevard. Fully cleared documentation, direct developer lease, optimal for mixed-use retail and residential development.',
    features: ['Main Boulevard Facing', 'Corner Plot', 'Leased & Clear Title', 'High Commercial Footfall'],
  },
  {
    id: 'prop-6',
    category: 'project',
    tag: 'EXCLUSIVE',
    title: 'The Nazimabad Executive Suites',
    location: 'North Nazimabad, Karachi',
    price: 'Starting PKR 1.8 Crore',
    beds: 3,
    baths: 3,
    area: '1,800 sq ft',
    isArched: false,
    image: IMAGES.prop6,
    gallery: [IMAGES.prop6, IMAGES.livingRoom, IMAGES.consultApartment],
    description:
      'Boutique residential enclave exclusively represented by Taqwa Enterprises. Features contemporary open layouts, underground reserved parking, and transparent developer paperwork.',
    features: ['Exclusive Agency Mandate', 'Flexible 2-Year Payment Plan', 'High Rental Demand', 'Rooftop Lounge'],
  },
];
