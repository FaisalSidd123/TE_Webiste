import { useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { prefersReducedMotion } from '../../lib/motion';
import './Accordion.css';

export default function AccordionItem({ question, answer, isOpen, onToggle, id }) {
  const contentRef = useRef(null);

  const toggle = () => {
    if (prefersReducedMotion()) {
      onToggle();
      return;
    }

    const el = contentRef.current;
    if (!isOpen) {
      // Opening
      onToggle();
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    } else {
      // Closing
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: onToggle,
      });
    }
  };

  return (
    <div className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="accordion-trigger"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        id={`faq-question-${id}`}
      >
        <span className="accordion-question t-h3">{question}</span>
        <span className="accordion-icon" aria-hidden="true">
          <span className="icon-bar icon-bar--h" />
          <span className="icon-bar icon-bar--v" />
        </span>
      </button>

      <div
        id={`faq-answer-${id}`}
        ref={contentRef}
        role="region"
        aria-labelledby={`faq-question-${id}`}
        className="accordion-content"
        style={{ display: isOpen ? 'block' : 'none', height: isOpen ? 'auto' : 0 }}
      >
        <div className="accordion-body t-body">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}
