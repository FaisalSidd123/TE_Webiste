import { useEffect } from 'react';
import { scrollToTarget } from '../lib/smoothScroll';
import SectionLabel from '../components/ui/SectionLabel';
import Button from '../components/ui/Button';
import './Privacy.css';

export default function Privacy() {
  useEffect(() => {
    scrollToTarget(0, { offset: 0 });
  }, []);

  return (
    <main className="privacy-page theme-ivory">
      <div className="container privacy-page__container">
        <div className="privacy-page__header">
          <SectionLabel label="LEGAL NOTICE" className="privacy-page__label" />
          <h1 className="privacy-page__title t-h2">
            Privacy & <em className="t-accent text-gold">Governance</em>
          </h1>
          <p className="t-body privacy-page__date">Effective: January 2026 · Karachi, Pakistan</p>
        </div>

        <div className="privacy-page__content">
          <section className="privacy-section">
            <h2 className="t-h3">1. Foundational Commitment</h2>
            <p className="t-body">
              True to the principle of Taqwa (mindfulness, integrity, and accountability), Taqwa Enterprises treats all
              client records, property documentations, identity verifications, and financial communications with absolute
              discretion and security.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="t-h3">2. Information Collection & Usage</h2>
            <p className="t-body">
              We collect information strictly necessary to facilitate real estate agency advisory, title verification with civic
              authorities, property marketing, and leasehold administration. This includes client names, contact
              information, plot or property parameters, and transaction documentation.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="t-h3">3. Civic & Legal Disclosures</h2>
            <p className="t-body">
              We never sell, lease, or monetize client information to third parties. Information is only submitted to
              housing authorities (such as DHA, KDA, MDA, Bahria Town) and government sub-registrars with explicit client
              authorization for lawful title transfer, verification, and mutation registration.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="t-h3">4. Security of Property & Title Records</h2>
            <p className="t-body">
              Title audit dossiers, civic non-encumbrance records, valuation analyses, and transaction agreements are securely
              maintained and archived. Clients may request full digital copies of their property records at any time.
            </p>
          </section>

          <div className="privacy-page__back">
            <Button href="/" variant="gold">
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
