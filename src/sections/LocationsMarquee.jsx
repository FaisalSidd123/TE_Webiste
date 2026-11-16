import { AREAS } from '../data/areas';
import Marquee from '../components/motion/Marquee';
import './LocationsMarquee.css';

/** Tiny four-point star — echoes the four panes of the logo's window. */
function Star() {
  return (
    <svg className="loc-star" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 0 C10.9 6.6 13.4 9.1 20 10 C13.4 10.9 10.9 13.4 10 20 C9.1 13.4 6.6 10.9 0 10 C6.6 9.1 9.1 6.6 10 0 Z" />
    </svg>
  );
}

const renderArea = (area, key) => (
  <span key={key} className="loc-item">
    <span className="loc-name">{area.name}</span>
    <Star />
  </span>
);

export default function LocationsMarquee() {
  return (
    <section className="locations" aria-label="Premier locations across Karachi">
      <p className="sr-only">We advise across Karachi: {AREAS.map((a) => a.name).join(', ')}.</p>
      <div className="locations__band" data-marquee-group>
        <Marquee
          items={AREAS}
          renderItem={renderArea}
          copies={3}
          speed={24}
          direction={1}
          className="locations__row"
        />
      </div>
    </section>
  );
}
