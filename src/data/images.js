// TODO: replace with client data — swap these Unsplash photos for Taqwa's own project photography.
// Every photo in the site is referenced from this one map, so swapping is a one-file change.
// Local files can be used too: import villa from '../assets/images/villa.webp' and pass { src: villa }.

const UNSPLASH = 'https://images.unsplash.com/';
const WIDTHS = [480, 800, 1200, 1800];

const url = (id, w) => `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=72`;

/** Builds a responsive image record (auto=format serves WebP/AVIF where supported). */
const photo = (id, alt, width, height) => ({
  src: url(id, 1200),
  srcSet: WIDTHS.map((w) => `${url(id, w)} ${w}w`).join(', '),
  alt,
  width,
  height,
});

export const IMAGES = {
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
};
