import TaqwaMark from './TaqwaMark';
import './LogoLockup.css';

/**
 * Compact horizontal lockup for the navbar, built in code so it stays crisp:
 * mark (~36px tall) + TAQWA (serif, gold gradient) over ENTERPRISES (condensed sans).
 * tone: 'light' for dark backgrounds, 'dark' for ivory/sand.
 */
export default function LogoLockup({ tone = 'light', href = '#top', onClick, className = '' }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`lockup lockup--${tone} ${className}`}
      aria-label="Taqwa Enterprises, back to top"
      data-cursor="link"
    >
      <TaqwaMark className="lockup__mark" strokeWidth={34} />
      <span className="lockup__text" aria-hidden="true">
        <span className="lockup__word">TAQWA</span>
        <span className="lockup__sub">ENTERPRISES</span>
      </span>
    </a>
  );
}
