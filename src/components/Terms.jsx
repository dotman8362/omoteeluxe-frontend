// TermsOfServicePage.jsx
import { useEffect, useRef, useState } from 'react';
import styles from './TermsOfServicePage.module.css';

const SECTIONS = [
  { id: 'acceptance', label: 'Acceptance of terms' },
  { id: 'products', label: 'Products & availability' },
  { id: 'orders-payment', label: 'Orders & payment' },
  { id: 'pricing', label: 'Pricing & errors' },
  { id: 'shipping', label: 'Shipping & delivery' },
  { id: 'returns', label: 'Returns & exchanges' },
  { id: 'bespoke', label: 'Bespoke & custom orders' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'conduct', label: 'Acceptable use' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'governing-law', label: 'Governing law' },
  { id: 'changes', label: 'Changes to these terms' },
  { id: 'contact', label: 'Contact us' },
];

const LAST_UPDATED = 'September 10, 2026';

export default function TermsOfServicePage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const node = sectionRefs.current[id];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    sectionRefs.current[id]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.mark}>
          <span className={styles.markWord}>Omoteeluxe</span>
          <span className={styles.markRule} aria-hidden="true" />
        </header>

        <div className={styles.titleBlock}>
          <h1 className={styles.headline}>Terms of Service</h1>
          <p className={styles.updated}>Last updated {LAST_UPDATED}</p>
          <p className={styles.intro}>
            These terms govern your use of omoteeluxeshop.com and any
            purchase you make from Omoteeluxe. By placing an order or
            browsing the site, you agree to them. Please read them
            alongside our <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>

        <div className={styles.layout}>
          <nav className={styles.toc} aria-label="Sections">
            <ul>
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={handleNavClick(id)}
                    className={
                      activeId === id ? styles.tocLinkActive : styles.tocLink
                    }
                    aria-current={activeId === id ? 'true' : undefined}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className={styles.content}>
            <section
              id="acceptance"
              ref={(el) => (sectionRefs.current.acceptance = el)}
              className={styles.section}
            >
              <h2>Acceptance of terms</h2>
              <p>
                Omoteeluxe ("we", "us", "our") sells handcrafted luxury
                goods through omoteeluxeshop.com. By accessing the site or
                placing an order, you agree to be bound by these Terms of
                Service. If you don't agree with any part of them, please
                don't use the site.
              </p>
            </section>

            <section
              id="products"
              ref={(el) => (sectionRefs.current.products = el)}
              className={styles.section}
            >
              <h2>Products & availability</h2>
              <p>
                Every piece is handcrafted, so small variations in colour,
                texture, and finish are part of the work rather than a
                defect. We describe and photograph items as accurately as
                we can, but exact shades may differ slightly on screen.
              </p>
              <p>
                Stock is limited and not reserved until payment is
                confirmed. If an item sells out or is discontinued after
                you order it, we'll contact you to offer a substitute, a
                wait for restock, or a full refund.
              </p>
            </section>

            <section
              id="orders-payment"
              ref={(el) => (sectionRefs.current['orders-payment'] = el)}
              className={styles.section}
            >
              <h2>Orders & payment</h2>
              <p>
                Placing an order is an offer to buy, which we accept when
                we confirm your order by email. We may decline or cancel an
                order at our discretion &mdash; for example, if we suspect
                fraud or can't fulfil it &mdash; in which case you'll be
                refunded in full.
              </p>
              <p>
                Payments are processed securely by Paystack. We accept
                major cards and bank transfer; full instructions are shown
                at checkout. Your order is only confirmed once payment has
                cleared.
              </p>
            </section>

            <section
              id="pricing"
              ref={(el) => (sectionRefs.current.pricing = el)}
              className={styles.section}
            >
              <h2>Pricing & errors</h2>
              <p>
                All prices are shown in Naira and include applicable taxes
                unless stated otherwise. Delivery fees are calculated at
                checkout. We take care to price items correctly, but if a
                pricing error slips through, we'll contact you before
                processing the order to confirm whether you'd like to
                proceed at the correct price or cancel for a full refund.
              </p>
            </section>

            <section
              id="shipping"
              ref={(el) => (sectionRefs.current.shipping = el)}
              className={styles.section}
            >
              <h2>Shipping & delivery</h2>
              <p>
                We ship across Nigeria and to select international
                destinations. Estimated delivery times are shown at
                checkout and are our best estimate, not a guarantee.
                Ownership and risk of loss pass to you once an order is
                handed to our delivery partner.
              </p>
              <p>
                Please make sure your delivery address and phone number are
                correct at checkout &mdash; we're not responsible for
                delays or non-delivery caused by incorrect details.
              </p>
            </section>

            <section
              id="returns"
              ref={(el) => (sectionRefs.current.returns = el)}
              className={styles.section}
            >
              <h2>Returns & exchanges</h2>
              <p>
                If a piece arrives damaged or isn't what you ordered,
                contact us within 48 hours of delivery with photos, and
                we'll arrange a replacement, exchange, or refund at no cost
                to you.
              </p>
              <p>
                For change-of-mind returns, items must be unworn, unwashed,
                and in their original packaging, and requested within 7
                days of delivery. Bespoke and made-to-order pieces are
                final sale, as described below.
              </p>
            </section>

            <section
              id="bespoke"
              ref={(el) => (sectionRefs.current.bespoke = el)}
              className={styles.section}
            >
              <h2>Bespoke & custom orders</h2>
              <p>
                Commissioned or made-to-measure pieces are produced
                specifically for you and are non-refundable once
                production has started, except where the piece is faulty
                or doesn't match the agreed specification. We'll confirm
                measurements, materials, and timeline with you in writing
                before beginning work.
              </p>
            </section>

            <section
              id="intellectual-property"
              ref={(el) => (sectionRefs.current['intellectual-property'] = el)}
              className={styles.section}
            >
              <h2>Intellectual property</h2>
              <p>
                All designs, photography, text, and branding on this site
                belong to Omoteeluxe or our licensors. You may browse and
                share our content for personal, non-commercial use, but you
                may not reproduce, resell, or use our designs or imagery
                commercially without written permission.
              </p>
            </section>

            <section
              id="conduct"
              ref={(el) => (sectionRefs.current.conduct = el)}
              className={styles.section}
            >
              <h2>Acceptable use</h2>
              <p>When using the site, you agree not to:</p>
              <ul>
                <li>Provide false information when placing an order</li>
                <li>Attempt to interfere with or disrupt the site's operation</li>
                <li>Use the site for any unlawful purpose</li>
                <li>
                  Copy, scrape, or republish our content without permission
                </li>
              </ul>
            </section>

            <section
              id="liability"
              ref={(el) => (sectionRefs.current.liability = el)}
              className={styles.section}
            >
              <h2>Limitation of liability</h2>
              <p>
                We work hard to describe our products accurately and
                deliver them reliably, but to the fullest extent permitted
                by law, Omoteeluxe isn't liable for indirect or
                consequential losses arising from your use of the site or
                purchase of our products. Nothing in these terms limits any
                right you have under the Federal Competition and Consumer
                Protection Act or other applicable consumer protection law
                that can't lawfully be excluded.
              </p>
            </section>

            <section
              id="governing-law"
              ref={(el) => (sectionRefs.current['governing-law'] = el)}
              className={styles.section}
            >
              <h2>Governing law</h2>
              <p>
                These terms are governed by the laws of the Federal
                Republic of Nigeria, and any dispute arising from them will
                be subject to the exclusive jurisdiction of the Nigerian
                courts.
              </p>
            </section>

            <section
              id="changes"
              ref={(el) => (sectionRefs.current.changes = el)}
              className={styles.section}
            >
              <h2>Changes to these terms</h2>
              <p>
                We may update these terms from time to time to reflect
                changes to our business or the law. We'll update the date
                at the top of this page when we do; continuing to use the
                site after changes take effect means you accept the
                updated terms.
              </p>
            </section>

            <section
              id="contact"
              ref={(el) => (sectionRefs.current.contact = el)}
              className={styles.section}
            >
              <h2>Contact us</h2>
              <p>
                Questions about these terms can be sent to{' '}
                <a href="mailto:shop@omoteeluxeshop.com">
                  shop@omoteeluxeshop.com
                </a>{' '}
                or through our <a href="/contact">Contact page</a>.
              </p>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}