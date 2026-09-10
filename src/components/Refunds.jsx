// RefundsPage.jsx
import { useEffect, useRef, useState } from 'react';
import styles from './RefundsPage.module.css';

const SECTIONS = [
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'how-to-request', label: 'How to request a refund' },
  { id: 'refund-method', label: 'Refund method & timing' },
  { id: 'exchanges', label: 'Exchanges' },
  { id: 'non-refundable', label: 'Non-refundable items' },
  { id: 'damaged-or-wrong', label: 'Damaged or incorrect items' },
  { id: 'contact', label: 'Contact us' },
];

const AT_A_GLANCE = [
  { value: '7 days', label: 'Return window from delivery' },
  { value: '5\u201310 days', label: 'Refund processed after we receive it' },
  { value: 'Free', label: 'Return shipping when the error is ours' },
];

const STEPS = [
  {
    title: 'Email us the order details',
    body: "Write to shop@omoteeluxeshop.com with your order number and the reason for return. Include photos if the item arrived damaged or isn't what you ordered.",
  },
  {
    title: "We'll confirm and send instructions",
    body: 'We reply within one business day with a return authorisation and the address to send the item back to.',
  },
  {
    title: 'Pack and send the item',
    body: 'Use the original packaging where possible, with all tags and protective wrapping intact, and share the courier tracking number with us.',
  },
  {
    title: 'We inspect and process your refund',
    body: 'Once the piece arrives and passes a quick condition check, we process your refund to the original payment method.',
  },
];

const LAST_UPDATED = 'September 10, 2026';

export default function RefundsPage() {
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
          <h1 className={styles.headline}>Returns & Refunds</h1>
          <p className={styles.updated}>Last updated {LAST_UPDATED}</p>
          <p className={styles.intro}>
            Every piece is handcrafted, so we want you to be genuinely happy
            with what arrives. Here's how returns and refunds work, and
            what to do if something isn't right.
          </p>
        </div>

        <dl className={styles.glance}>
          {AT_A_GLANCE.map(({ value, label }) => (
            <div className={styles.glanceItem} key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>

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
              id="eligibility"
              ref={(el) => (sectionRefs.current.eligibility = el)}
              className={styles.section}
            >
              <h2>Eligibility</h2>
              <p>
                To be eligible for a return, an item must be unworn,
                unwashed, and in its original packaging with tags attached,
                and the return must be requested within 7 days of delivery.
              </p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Item type</th>
                    <th>Returnable</th>
                    <th>Window</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ready-to-wear pieces</td>
                    <td>Yes, if unworn with tags</td>
                    <td>7 days from delivery</td>
                  </tr>
                  <tr>
                    <td>Accessories</td>
                    <td>Yes, if unused with packaging</td>
                    <td>7 days from delivery</td>
                  </tr>
                  <tr>
                    <td>Bespoke & made-to-order</td>
                    <td>No, unless faulty</td>
                    <td>&mdash;</td>
                  </tr>
                  <tr>
                    <td>Damaged or incorrect items</td>
                    <td>Yes, always</td>
                    <td>48 hours from delivery</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <section
              id="how-to-request"
              ref={(el) => (sectionRefs.current['how-to-request'] = el)}
              className={styles.section}
            >
              <h2>How to request a refund</h2>
              <ol className={styles.steps}>
                {STEPS.map((step, index) => (
                  <li className={styles.step} key={step.title}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section
              id="refund-method"
              ref={(el) => (sectionRefs.current['refund-method'] = el)}
              className={styles.section}
            >
              <h2>Refund method & timing</h2>
              <p>
                Refunds are issued to the original payment method through
                Paystack. Once we've inspected the returned item, we
                process the refund within 2 business days; it can then take
                5&ndash;10 business days to reflect on your card or account,
                depending on your bank.
              </p>
              <p>
                If you paid by bank transfer, let us know your account
                details when you request the return so we can send the
                refund directly.
              </p>
            </section>

            <section
              id="exchanges"
              ref={(el) => (sectionRefs.current.exchanges = el)}
              className={styles.section}
            >
              <h2>Exchanges</h2>
              <p>
                Prefer a different size or colour? Let us know when you
                request your return and we'll hold the replacement for you
                where stock allows. If there's a price difference, we'll
                either refund or invoice the difference before shipping the
                exchange.
              </p>
            </section>

            <section
              id="non-refundable"
              ref={(el) => (sectionRefs.current['non-refundable'] = el)}
              className={styles.section}
            >
              <h2>Non-refundable items</h2>
              <ul>
                <li>Bespoke or made-to-measure pieces, once production has started</li>
                <li>Items returned worn, washed, or without original tags</li>
                <li>Gift cards</li>
                <li>Items returned more than 7 days after delivery</li>
              </ul>
            </section>

            <section
              id="damaged-or-wrong"
              ref={(el) => (sectionRefs.current['damaged-or-wrong'] = el)}
              className={styles.section}
            >
              <h2>Damaged or incorrect items</h2>
              <p>
                If your order arrives damaged, faulty, or different from
                what you ordered, contact us within 48 hours with photos.
                We'll cover the full cost of return shipping and send a
                replacement or full refund, whichever you'd prefer &mdash;
                no exceptions, no back-and-forth.
              </p>
            </section>

            <section
              id="contact"
              ref={(el) => (sectionRefs.current.contact = el)}
              className={styles.section}
            >
              <h2>Contact us</h2>
              <p>
                Start a return or ask a question at{' '}
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