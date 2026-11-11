import { gsap } from './gsap';

const DRAWABLE = 'path, line, polyline, polygon, rect, circle, ellipse';

/**
 * Prepares SVG geometry for a stroke "draw on" by setting dasharray/offset to
 * each element's own length (getTotalLength — no paid plugin needed).
 * Elements without a stroke (e.g. filled window panes) are skipped.
 * Returns the prepared elements; tween them to `{ strokeDashoffset: 0 }`.
 */
export function prepareDraw(targets) {
  const els = gsap.utils.toArray(targets).filter((el) => {
    if (typeof el.getTotalLength !== 'function') return false;
    const stroke = getComputedStyle(el).stroke;
    return stroke && stroke !== 'none';
  });

  els.forEach((el) => {
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len} ${len + 2}`;
    el.style.strokeDashoffset = `${len}`;
  });

  return els;
}

/** All drawable geometry inside a root element. */
export const drawablesIn = (root, selector = DRAWABLE) =>
  root ? Array.from(root.querySelectorAll(selector)) : [];
