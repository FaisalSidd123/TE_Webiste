import TaqwaMark from './TaqwaMark';
import './LogoLockup.css';

/**
 * Compact horizontal lockup for the navbar, built in code so it stays crisp:
 * mark (~36px tall) + TAQWA (serif, gold gradient) over ENTERPRISES (condensed sans).
 * tone: the background it sits on — 'dark' (ivory text) | 'light' (near-black text, bronze gold).
 */
export default function LogoLockup({ tone = 'dark', href = '#top', onClick, className = '' }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`lockup lockup--on-${tone} ${className}`}
      aria-label="Taqwa Enterprises, back to top"
    >
      <TaqwaMark className="lockup__mark" strokeWidth={34} tone={tone} />
      <span className="lockup__text" aria-hidden="true">
        <span className="lockup__word">TAQWA</span>
        <span className="lockup__sub">ENTERPRISES</span>
      </span>
    </a>
  );
}
