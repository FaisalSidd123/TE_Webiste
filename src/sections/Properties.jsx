import { useState, useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/motion';
import { PROPERTIES, PROPERTY_TABS } from '../data/properties';
import SectionLabel from '../components/ui/SectionLabel';
import Tabs from '../components/ui/Tabs';
import Drawer from '../components/ui/Drawer';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import './Properties.css';

export default function Properties() {
  const rootRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = PROPERTIES.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const root = rootRef.current;
      const cards = root.querySelectorAll('.prop-card');

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.querySelector('.prop-grid'),
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: rootRef, dependencies: [activeTab] }
  );

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  const openWhatsAppEnquiry = (property) => {
    const text = encodeURIComponent(
      `Hello Taqwa Enterprises, I am inquiring regarding the property: "${property.title}" in ${property.location} (Price: ${property.price}). Please provide more details.`
    );
    window.open(`https://wa.me/923000000000?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const openScheduleVisit = (property) => {
    const text = encodeURIComponent(
      `Hello Taqwa Enterprises, I would like to schedule a site inspection visit for: "${property.title}" in ${property.location}.`
    );
    window.open(`https://wa.me/923000000000?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="properties" ref={rootRef} className="properties section theme-ivory" aria-labelledby="properties-title">
      <div className="container">
        {/* Header row */}
        <div className="properties__header">
          <div>
            <SectionLabel label="04 / PORTFOLIO" className="properties__label" />
            <h2 id="properties-title" className="properties__title t-h2">
              Handpicked for <em className="t-accent text-gold">you</em>.
            </h2>
          </div>

          <Tabs tabs={PROPERTY_TABS} activeId={activeTab} onChange={handleTabChange} className="properties__tabs" />
        </div>

        {/* Staggered Masonry Grid */}
        <div className="prop-grid">
          {filteredProperties.map((prop, index) => {
            // Column 2 starts lower (staggered editorial layout)
            const isCol2 = index % 3 === 1;
            return (
              <article
                key={prop.id}
                className={`prop-card ${prop.isArched ? 'prop-card--arched' : ''} ${
                  isCol2 ? 'prop-card--offset' : ''
                }`}
                onClick={() => setSelectedProperty(prop)}
              >
                <div className="prop-card__media">
                  <img
                    src={prop.image.src}
                    srcSet={prop.image.srcSet}
                    alt={prop.title}
                    className="prop-card__img"
                    loading="lazy"
                  />
                  <span className="prop-card__tag t-label">{prop.tag}</span>

                  <div className="prop-card__overlay">
                    <span className="prop-card__view t-label">
                      View Details <span className="arrow">→</span>
                    </span>
                  </div>
                </div>

                <div className="prop-card__details">
                  <div className="prop-card__meta">
                    <span className="prop-card__loc">
                      <Icon name="pin" size={14} /> {prop.location}
                    </span>
                    <span className="prop-card__price t-label">{prop.price}</span>
                  </div>

                  <h3 className="prop-card__title t-h3">{prop.title}</h3>

                  <div className="prop-card__specs">
                    {prop.beds && (
                      <span className="prop-spec">
                        <Icon name="bed" size={14} /> {prop.beds} Beds
                      </span>
                    )}
                    {prop.baths && (
                      <span className="prop-spec">
                        <Icon name="bath" size={14} /> {prop.baths} Baths
                      </span>
                    )}
                    <span className="prop-spec">
                      <Icon name="area" size={14} /> {prop.area}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Property Details Side Drawer */}
      <Drawer
        open={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
        title={selectedProperty?.title || 'Property Details'}
      >
        {selectedProperty && (
          <div className="drawer-prop">
            <div className="drawer-prop__gallery">
              {selectedProperty.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={`${selectedProperty.title} view ${i + 1}`}
                  className="drawer-prop__gallery-img"
                  loading="lazy"
                />
              ))}
            </div>

            <div className="drawer-prop__info">
              <div className="drawer-prop__price-row">
                <span className="drawer-prop__price t-h3">{selectedProperty.price}</span>
                <span className="drawer-prop__tag t-label">{selectedProperty.tag}</span>
              </div>

              <p className="drawer-prop__location">
                <Icon name="pin" size={16} /> {selectedProperty.location}
              </p>

              <div className="drawer-prop__specs-grid">
                {selectedProperty.beds && (
                  <div className="drawer-spec-item">
                    <span className="t-label">Bedrooms</span>
                    <span className="drawer-spec-val">{selectedProperty.beds}</span>
                  </div>
                )}
                {selectedProperty.baths && (
                  <div className="drawer-spec-item">
                    <span className="t-label">Bathrooms</span>
                    <span className="drawer-spec-val">{selectedProperty.baths}</span>
                  </div>
                )}
                <div className="drawer-spec-item">
                  <span className="t-label">Covered Area</span>
                  <span className="drawer-spec-val">{selectedProperty.area}</span>
                </div>
              </div>

              <div className="drawer-prop__desc">
                <h4 className="t-label">Overview</h4>
                <p className="t-body">{selectedProperty.description}</p>
              </div>

              <div className="drawer-prop__features">
                <h4 className="t-label">Key Features</h4>
                <ul>
                  {selectedProperty.features.map((feat, idx) => (
                    <li key={idx}>
                      <Icon name="check" size={16} /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="drawer-prop__actions">
                <Button variant="gold" onClick={() => openWhatsAppEnquiry(selectedProperty)}>
                  <Icon name="whatsapp" size={18} /> Enquire on WhatsApp
                </Button>
                <Button variant="outline" onClick={() => openScheduleVisit(selectedProperty)}>
                  Schedule a Visit
                </Button>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </section>
  );
}
