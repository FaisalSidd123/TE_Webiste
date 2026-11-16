import { useState, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { FAQS } from '../data/faqs';
import { CONTACT } from '../data/contact';
import SectionLabel from '../components/ui/SectionLabel';
import AccordionItem from '../components/ui/Accordion';
import Icon from '../components/ui/Icon';
import './FAQ.css';

export default function FAQ() {
  const rootRef = useRef(null);
  const [openId, setOpenId] = useState('faq-1');

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const items = root.querySelectorAll('.accordion-item');

      gsap.fromTo(
        items,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.querySelector('.faq__right'),
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" ref={rootRef} className="faq section theme-ivory" aria-labelledby="faq-title">
      <div className="container">
        <div className="faq__layout">
          {/* Left Column: Heading and direct WhatsApp support prompt */}
          <div className="faq__left">
            <div className="faq__sticky">
              <SectionLabel label="09 / INQUIRIES" className="faq__label" />

              <h2 id="faq-title" className="faq__title t-h2">
                Questions, <em className="t-accent text-gold">answered</em>.
              </h2>

              <p className="faq__sub t-body">
                We believe in total transparency. If your question is not covered below, our partners are readily available
                to assist you.
              </p>

              <div className="faq__direct">
                <span className="faq__direct-prompt t-label">Still unsure? Talk to us directly.</span>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq__wa-link"
                >
                  <Icon name="whatsapp" size={18} /> Chat with a Senior Advisor
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 7 Accordion items */}
          <div className="faq__right">
            <div className="faq__list" role="region" aria-label="Frequently Asked Questions">
              {FAQS.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openId === faq.id}
                  onToggle={() => toggleItem(faq.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
