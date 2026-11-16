import { useEffect, useState } from 'react';
import { ScrollTrigger } from '../../lib/gsap';
import { CONTACT } from '../../data/contact';
import Icon from '../ui/Icon';
import './WhatsAppFloat.css';

export default function WhatsAppFloat({ hidden = false }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 'top -400px',
      end: 'max',
      onUpdate: (self) => {
        setVisible(self.scroll() > 500);
      },
    });
    return () => st.kill();
  }, []);

  if (hidden || !visible) return null;

  return (
    <aside className="wa-float" aria-label="WhatsApp quick chat">
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float__btn"
        aria-label="Chat with Taqwa Enterprises on WhatsApp"
      >
        <span className="wa-float__tooltip">Chat with us</span>
        <div className="wa-float__circle">
          <Icon name="whatsapp" size={26} strokeWidth={1.5} className="wa-float__icon" />
          <span className="wa-float__pulse" aria-hidden="true" />
        </div>
      </a>
    </aside>
  );
}
