import { useState } from 'react';
import { CONTACT } from '../data/contact';
import { AREAS } from '../data/areas';
import SectionLabel from '../components/ui/SectionLabel';
import FormField from '../components/ui/FormField';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import './Contact.css';

const INTEREST_OPTIONS = [
  { value: 'buying', label: 'Buying Residential Property' },
  { value: 'selling', label: 'Selling Residential Property' },
  { value: 'renting', label: 'Renting / Leasing' },
  { value: 'commercial', label: 'Commercial Land & Offices' },
  { value: 'investment', label: 'Real Estate Investment Advisory' },
  { value: 'property-management', label: 'Property Asset Management' },
  { value: 'overseas', label: 'Overseas Client Advisory' },
  { value: 'other', label: 'Other Inquiry' },
];

const BUDGET_OPTIONS = [
  { value: 'under-2cr', label: 'Under PKR 2 Crore' },
  { value: '2cr-5cr', label: 'PKR 2 Crore – 5 Crore' },
  { value: '5cr-10cr', label: 'PKR 5 Crore – 10 Crore' },
  { value: '10cr-plus', label: 'PKR 10 Crore+' },
  { value: 'flexible', label: 'Flexible / To Be Evaluated' },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'buying',
    area: 'DHA',
    budget: '2cr-5cr',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = 'Please provide your full name';
    if (!formState.phone.trim()) errs.phone = 'Please provide your phone number';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Build formatted message for WhatsApp
    const interestLabel =
      INTEREST_OPTIONS.find((o) => o.value === formState.interest)?.label || formState.interest;
    const budgetLabel = BUDGET_OPTIONS.find((o) => o.value === formState.budget)?.label || formState.budget;

    const messageText = `*New Website Inquiry — Taqwa Enterprises*
*Client:* ${formState.name}
*Phone:* ${formState.phone}
*Email:* ${formState.email || 'N/A'}
*Interest:* ${interestLabel}
*Area:* ${formState.area}
*Budget Range:* ${budgetLabel}
*Message:* ${formState.message || 'No additional note'}`;

    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/923000000000?text=${encoded}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact section theme-ivory" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__layout">
          {/* Left Column: Details & Embedded Map */}
          <div className="contact__left">
            <SectionLabel label="10 / CONTACT" className="contact__label" />

            <h2 id="contact-title" className="contact__title t-h2">
              Visit, call, or <em className="t-accent text-gold">write</em>.
            </h2>

            <p className="contact__intro t-body">
              Our partners are based at our DHA Karachi headquarters. We welcome consultations in person or remotely.
            </p>

            <div className="contact__details">
              <div className="contact__item">
                <Icon name="pin" size={20} className="contact__icon" />
                <div>
                  <span className="contact__item-label t-label">Head Office</span>
                  <p className="contact__item-text">{CONTACT.address}</p>
                </div>
              </div>

              <div className="contact__item">
                <Icon name="phone" size={20} className="contact__icon" />
                <div>
                  <span className="contact__item-label t-label">Telephone</span>
                  <p className="contact__item-text">
                    <a href={CONTACT.phoneHref} className="contact__link">
                      {CONTACT.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact__item">
                <Icon name="whatsapp" size={20} className="contact__icon" />
                <div>
                  <span className="contact__item-label t-label">Direct WhatsApp</span>
                  <p className="contact__item-text">
                    <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="contact__link">
                      {CONTACT.phoneDisplay}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact__item">
                <Icon name="mail" size={20} className="contact__icon" />
                <div>
                  <span className="contact__item-label t-label">Electronic Mail</span>
                  <p className="contact__item-text">
                    <a href={`mailto:${CONTACT.email}`} className="contact__link">
                      {CONTACT.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact__item">
                <Icon name="clock" size={20} className="contact__icon" />
                <div>
                  <span className="contact__item-label t-label">Consultation Hours</span>
                  <p className="contact__item-text">{CONTACT.hours}</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map with grayscale + warm filter */}
            <div className="contact__map-frame">
              <iframe
                title="Taqwa Enterprises Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14488.585295982855!2d67.0543666!3d24.812285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c570b21a8a3%3A0x6b8bc2eb8e2a3c7!2sKhayaban-e-Ittehad%2C%20DHA%20Phase%206%2C%20Karachi!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="contact__iframe"
              />
            </div>
          </div>

          {/* Right Column: Sand Panel Form */}
          <div className="contact__right">
            <div className="contact__form-panel theme-sand">
              {submitted ? (
                <div className="contact__success">
                  <div className="contact__success-check">
                    <Icon name="check" size={36} />
                  </div>
                  <h3 className="t-h3 contact__success-title">Enquiry Dispatched</h3>
                  <p className="t-body contact__success-desc">
                    Thank you, <strong>{formState.name}</strong>. Your inquiry has been forwarded directly to our senior
                    advisors on WhatsApp. We will connect with you shortly.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact__form" noValidate>
                  <h3 className="contact__form-title t-h3">Consultation Request</h3>
                  <p className="contact__form-sub t-body">
                    Complete this brief dossier and we will formulate preliminary insights prior to connecting.
                  </p>

                  <FormField
                    id="contact-name"
                    name="name"
                    label="Full Name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    error={errors.name}
                  />

                  <div className="contact__form-row">
                    <FormField
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      label="Phone / Mobile"
                      value={formState.phone}
                      onChange={handleChange}
                      required
                      error={errors.phone}
                    />

                    <FormField
                      id="contact-email"
                      name="email"
                      type="email"
                      label="Email Address (Optional)"
                      value={formState.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact__form-row">
                    <FormField
                      id="contact-interest"
                      name="interest"
                      as="select"
                      label="I am interested in"
                      value={formState.interest}
                      onChange={handleChange}
                      options={INTEREST_OPTIONS}
                    />

                    <FormField
                      id="contact-area"
                      name="area"
                      as="select"
                      label="Preferred Location"
                      value={formState.area}
                      onChange={handleChange}
                      options={AREAS.map((a) => ({ value: a.name, label: a.name }))}
                    />
                  </div>

                  <FormField
                    id="contact-budget"
                    name="budget"
                    as="select"
                    label="Anticipated Budget Range"
                    value={formState.budget}
                    onChange={handleChange}
                    options={BUDGET_OPTIONS}
                  />

                  <FormField
                    id="contact-message"
                    name="message"
                    as="textarea"
                    label="Particular Requirements or Plot Details"
                    value={formState.message}
                    onChange={handleChange}
                    rows={3}
                  />

                  <Button type="submit" variant="gold" className="contact__submit-btn">
                    Transmit Consultation Dossier
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
