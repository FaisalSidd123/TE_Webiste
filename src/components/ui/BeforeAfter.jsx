import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, useGSAP } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';
import Icon from './Icon';
import './BeforeAfter.css';

export default function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = 'EXTERIOR FACADE',
  afterLabel = 'CURATED INTERIOR',
  className = '',
}) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 - 100)
  const isDragging = useRef(false);

  // Auto-animate handle from 90% to 50% once on enter to teach the interaction
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const proxy = { val: 85 };
      gsap.to(proxy, {
        val: 50,
        duration: 1.6,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
        onUpdate: () => setSliderPos(proxy.val),
      });
    },
    { scope: containerRef },
  );

  const handlePointerMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging.current) return;
      handlePointerMove(e.clientX);
    };
    const handleUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [handlePointerMove]);

  const onPointerDown = (e) => {
    isDragging.current = true;
    handlePointerMove(e.clientX);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(5, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(95, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      className={`before-after ${className}`}
      onPointerDown={onPointerDown}
      role="region"
      aria-label="Dual-perspective property comparison"
    >
      {/* Primary view (full layer underneath) */}
      <div className="ba-layer ba-layer--after">
        <img
          src={afterImage.src}
          srcSet={afterImage.srcSet}
          alt={afterImage.alt}
          className="ba-img"
          loading="lazy"
        />
        <span className="ba-badge ba-badge--right">{afterLabel}</span>
      </div>

      {/* Secondary view (clipped layer on top) */}
      <div
        className="ba-layer ba-layer--before"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={beforeImage.src}
          srcSet={beforeImage.srcSet}
          alt={beforeImage.alt}
          className="ba-img"
          loading="lazy"
        />
        <span className="ba-badge ba-badge--left">{beforeLabel}</span>
      </div>

      {/* Divider line and handle */}
      <div
        className="ba-divider"
        style={{ left: `${sliderPos}%` }}
        tabIndex={0}
        role="slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Comparison slider position"
        onKeyDown={handleKeyDown}
      >
        <div className="ba-line" />
        <div className="ba-handle">
          <Icon name="chevronLeft" size={14} />
          <Icon name="chevronRight" size={14} />
        </div>
      </div>
    </div>
  );
}
