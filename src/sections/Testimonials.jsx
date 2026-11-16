import { useEffect, useRef, useState, useCallback } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import SectionLabel from '../components/ui/SectionLabel';
import Icon from '../components/ui/Icon';
import './Testimonials.css';

const AUTO_ADVANCE_TIME = 7000;

export default function Testimonials() {
  const rootRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(0);

  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[currentIndex];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  // 7-second timer with smooth filling progress bar
  useEffect(() => {
    if (isPaused) return undefined;
    const interval = 50; // update progress every 50ms
    const step = (interval / AUTO_ADVANCE_TIME) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextTestimonial();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, nextTestimonial]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextTestimonial();
      else prevTestimonial();
    }
  };

  return (
    <section
      id="testimonials"
      ref={rootRef}
      className="testimonials section theme-sand"
      aria-labelledby="testimonials-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="container testimonials__container">
        <SectionLabel label="07 / TESTIMONIALS" className="testimonials__label" />

        <div className="testimonials__stage">
          {/* Big decorative quote mark in gold */}
          <div className="testimonials__decor-quote" aria-hidden="true">
            “
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            className="testimonials__arrow testimonials__arrow--prev"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <Icon name="arrowLeft" size={24} />
          </button>

          {/* Centered quote and client */}
          <div className="testimonials__content">
            <blockquote className="testimonials__quote">
              <p className="testimonials__quote-text t-accent">“{current.quote}”</p>
            </blockquote>

            <div className="testimonials__author">
              <span className="testimonials__name t-label">{current.author}</span>
              <span className="testimonials__context t-body">{current.context}</span>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="testimonials__arrow testimonials__arrow--next"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <Icon name="arrowRight" size={24} />
          </button>
        </div>

        {/* 7-second filling progress bar & dots */}
        <div className="testimonials__progress-wrap">
          <div className="testimonials__bar-track">
            <div className="testimonials__bar-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="testimonials__dots">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                className={`testimonials__dot ${idx === currentIndex ? 'is-active' : ''}`}
                onClick={() => {
                  setCurrentIndex(idx);
                  setProgress(0);
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
