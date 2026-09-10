import { MessageCircle, Mail } from 'lucide-react';
import './FaqCta.css';

function FaqCta() {
  return (
    <section className="faq-cta">
      <h2 className="faq-cta__heading">Still have a question?</h2>
      <p className="faq-cta__subtext">
        Our team is happy to help with anything not covered above.
      </p>

      <div className="faq-cta__actions">
        <a href="https://wa.me/2347048304972" className="faq-cta__button faq-cta__button--primary">
          <MessageCircle size={17} strokeWidth={1.9} />
          Chat on WhatsApp
        </a>
        <a href="mailto:shopteeluxee@gmail.com" className="faq-cta__button faq-cta__button--secondary">
          <Mail size={16} strokeWidth={1.7} />
          Email Us
        </a>
      </div>
    </section>
  );
}

export default FaqCta;
