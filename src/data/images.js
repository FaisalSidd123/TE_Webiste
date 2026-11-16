// TODO: replace with client data — swap these Unsplash photos for Taqwa's own project photography.
// Every photo in the site is referenced from this one map, so swapping is a one-file change.

const UNSPLASH = 'https://images.unsplash.com/';
const WIDTHS = [480, 800, 1200, 1800];

const url = (id, w, ar) => `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=72${ar ? `&ar=${ar}` : ''}`;

/**
 * Builds a responsive image record (auto=format serves WebP/AVIF where supported).
 * `ar` (e.g. '4:5') asks the CDN for that crop so portrait frames don't download a landscape file.
 */
const photo = (id, alt, width = 1200, height = 800, ar) => ({
  src: url(id, 1200, ar),
  srcSet: WIDTHS.map((w) => `${url(id, w, ar)} ${w}w`).join(', '),
  alt,
  width,
  height,
});

export const IMAGES = {
  heroHome: photo(
    'photo-1600585154340-be6161a56a0c',
    'Modern two-storey home with timber cladding and warm interior lights at dusk',
    1000,
    1250,
    '4:5',
  ),
  homeDusk: photo(
    'photo-1600585154340-be6161a56a0c',
    'Modern two-storey home with timber cladding and warm interior lights at dusk',
    1200,
    800,
  ),
  villaPool: photo(
    'photo-1613490493576-7fde63acd811',
    'White contemporary villa with timber soffits overlooking a long swimming pool',
    1200,
    800,
  ),
  villaWhite: photo(
    'photo-1600596542815-ffad4c1539a9',
    'Bright white modern villa with glass balconies beside a pool',
    1200,
    800,
  ),
  villaPalms: photo(
    'photo-1512917774080-9991f1c4c750',
    'Single-storey modern house with glass doors, palms and a pool',
    1200,
    800,
  ),
  livingRoom: photo(
    'photo-1600607687939-ce8a6c25118c',
    'Open-plan living room with timber feature wall and soft natural light',
    1200,
    800,
  ),
  facadeTimber: photo(
    'photo-1600566753190-17f0baa2a6c3',
    'Contemporary house facade in timber and dark metal with an angled roof',
    1200,
    800,
  ),
  siteTeam: photo(
    'photo-1541888946425-d81bb19240f5',
    'Construction team in hard hats overlooking a site with steel reinforcement',
    1200,
    800,
  ),
  drawings: photo(
    'photo-1503387762-592deb58ef4e',
    'Architect reviewing printed building plans at a desk',
    1200,
    800,
  ),
  concretePour: photo(
    'photo-1590381105924-c72589b9ef3f',
    'Reinforced concrete framework under construction against sky',
    1200,
    800,
  ),
  // Divisions
  consultApartment: photo(
    'photo-1600210492486-724fe5c67fb0',
    'Elegant warm luxury apartment interior with floor-to-ceiling windows',
    1200,
    900,
  ),
  commercialTower: photo(
    'photo-1486406146926-c627a92ad1ab',
    'Modern glass commercial tower against bright blue sky',
    1200,
    900,
  ),
  // Showcase Mandate Photography
  showcase1Before: photo(
    'photo-1600585154340-be6161a56a0c',
    'Residence 47 Exterior - Modern architectural villa at dusk',
    1200,
    800,
  ),
  showcase1After: photo(
    'photo-1600585154340-be6161a56a0c',
    'Residence 47 Finished - Modern completed architectural villa at dusk',
    1200,
    800,
  ),
  showcase2Before: photo(
    'photo-1600596542815-ffad4c1539a9',
    'The Courtyard House Grounds - White residence exterior with glass railing',
    1200,
    800,
  ),
  showcase2After: photo(
    'photo-1600596542815-ffad4c1539a9',
    'The Courtyard House Finished - White finished residence with glass railing',
    1200,
    800,
  ),
  showcase3Before: photo(
    'photo-1613490493576-7fde63acd811',
    'The Sea View Residence - Contemporary coastal architecture',
    1200,
    800,
  ),
  showcase3After: photo(
    'photo-1613490493576-7fde63acd811',
    'The Sea View Residence Finished - Completed luxury coastal home',
    1200,
    800,
  ),
  // Properties
  prop1: photo(
    'photo-1600596542815-ffad4c1539a9',
    '500 sq yd Contemporary Villa, DHA Phase 6',
    1000,
    1200,
  ),
  prop2: photo(
    'photo-1545324418-cc1a3fa10c00',
    '3 Bed Sea View Apartment, Clifton Block 2',
    1000,
    1200,
  ),
  prop3: photo(
    'photo-1600585154526-990dced4db0d',
    '250 sq yd Family Home, Bahria Town Precinct 10',
    1000,
    1200,
  ),
  prop4: photo(
    'photo-1502672260266-1c1ef2d93688',
    '2 Bed Furnished Apartment, Gulshan-e-Iqbal Block 13',
    1000,
    1200,
  ),
  prop5: photo(
    'photo-1500382017468-9049fed747ef',
    'Corner Commercial Plot 200 sq yd, Scheme 33',
    1000,
    1200,
  ),
  prop6: photo(
    'photo-1574362848149-11496d93a7c7',
    'The Nazimabad Executive Suites, North Nazimabad',
    1000,
    1200,
  ),
  // Services
  srvBuySell: photo('photo-1560518883-ce09059eeffa', 'Buy & Sell Advisory', 800, 600),
  srvRentals: photo('photo-1522708323590-d24dbb6b0267', 'Rentals & Leasing', 800, 600),
  srvInvest: photo('photo-1486406146926-c627a92ad1ab', 'Investment Consulting', 800, 600),
  srvLegal: photo('photo-1450133064473-71024230f91b', 'Legal & Documentation', 800, 600),
  srvCorporate: photo('photo-1541888946425-d81bb19240f5', 'Corporate Real Estate', 800, 600),
  srvCommercial: photo('photo-1590381105924-c72589b9ef3f', 'Commercial Advisory', 800, 600),
  srvPortfolio: photo('photo-1581858726788-75bc0f6a952d', 'Portfolio Management', 800, 600),
  srvManage: photo('photo-1582407947304-fd86f028f716', 'Property Management', 800, 600),
  // Areas
  areaDha: photo('photo-1600585154340-be6161a56a0c', 'DHA Karachi', 600, 450),
  areaClifton: photo('photo-1545324418-cc1a3fa10c00', 'Clifton Karachi', 600, 450),
  areaBahria: photo('photo-1600596542815-ffad4c1539a9', 'Bahria Town Karachi', 600, 450),
  areaGulshan: photo('photo-1512917774080-9991f1c4c750', 'Gulshan-e-Iqbal Karachi', 600, 450),
  areaPechs: photo('photo-1600607687939-ce8a6c25118c', 'PECHS Karachi', 600, 450),
  areaScheme33: photo('photo-1500382017468-9049fed747ef', 'Scheme 33 Karachi', 600, 450),
  areaNazimabad: photo('photo-1574362848149-11496d93a7c7', 'North Nazimabad Karachi', 600, 450),
};
