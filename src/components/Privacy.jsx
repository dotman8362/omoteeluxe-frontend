// PrivacyPolicyPage.jsx
import { useEffect, useRef, useState } from 'react';
import styles from './PrivacyPolicyPage.module.css';

const SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'information-we-collect', label: 'Information we collect' },
  { id: 'how-we-use-it', label: 'How we use it' },
  { id: 'payment-processing', label: 'Payment processing' },
  { id: 'sharing', label: 'Who we share it with' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'retention', label: 'How long we keep it' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'children', label: "Children's privacy" },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Contact us' },
];

const LAST_UPDATED = 'September 10, 2026';

export default function PrivacyPolicyPage() {
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
          <h1 className={styles.headline}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated {LAST_UPDATED}</p>
          <p className={styles.intro}>
            This policy explains what information Omoteeluxe collects when
            you shop with us, why we collect it, and the choices you have
            over it. It applies to omoteeluxeshop.com and any Omoteeluxe
            store you interact with online.
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
              id="introduction"
              ref={(el) => (sectionRefs.current.introduction = el)}
              className={styles.section}
            >
              <h2>Introduction</h2>
              <p>
                Omoteeluxe ("we", "us", "our") designs and sells handcrafted
                luxury goods to customers across Nigeria and beyond. We
                collect a limited amount of personal information to take
                your orders, deliver them, and keep you informed along the
                way. This policy sets out what that information is, how we
                use it, and the rights you have over it under the Nigeria
                Data Protection Act 2023 (NDPA) and other applicable law.
              </p>
            </section>

            <section
              id="information-we-collect"
              ref={(el) => (sectionRefs.current['information-we-collect'] = el)}
              className={styles.section}
            >
              <h2>Information we collect</h2>
              <p>We collect information you give us directly, including:</p>
              <ul>
                <li>Your name, email address, and phone number</li>
                <li>Shipping and, where different, billing address</li>
                <li>Order history and items you've saved or enquired about</li>
                <li>
                  Messages you send us, for example through the contact form
                  or customer support
                </li>
              </ul>
              <p>We also collect some information automatically:</p>
              <ul>
                <li>Device and browser type, and approximate location</li>
                <li>Pages viewed and how you navigate the site</li>
                <li>Cookie identifiers (see "Cookies" below)</li>
              </ul>
              <p>
                We do not collect or store your card details. Payments are
                handled by Paystack, described under "Payment processing"
                below.
              </p>
            </section>

            <section
              id="how-we-use-it"
              ref={(el) => (sectionRefs.current['how-we-use-it'] = el)}
              className={styles.section}
            >
              <h2>How we use it</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Process and fulfil your orders, including delivery</li>
                <li>
                  Send order confirmations, shipping updates, and respond to
                  enquiries
                </li>
                <li>
                  Send offers or updates about new pieces, only if you've
                  opted in
                </li>
                <li>Improve the site, our catalogue, and customer service</li>
                <li>Detect and prevent fraud or misuse of the site</li>
                <li>Meet our legal and tax obligations</li>
              </ul>
            </section>

            <section
              id="payment-processing"
              ref={(el) => (sectionRefs.current['payment-processing'] = el)}
              className={styles.section}
            >
              <h2>Payment processing</h2>
              <p>
                All card and bank transfer payments are processed by
                Paystack, a licensed payment service provider. When you pay,
                your card and banking details go directly to Paystack under
                its own privacy and security terms &mdash; we never see or
                store your full card number, expiry date, or CVV. We
                receive confirmation that a payment was made, along with a
                transaction reference, so we can fulfil your order.
              </p>
            </section>

            <section
              id="sharing"
              ref={(el) => (sectionRefs.current.sharing = el)}
              className={styles.section}
            >
              <h2>Who we share it with</h2>
              <p>We share information only where it's needed to serve you:</p>
              <ul>
                <li>
                  Delivery and logistics partners, to get orders to your
                  door
                </li>
                <li>Paystack, to process payments</li>
                <li>
                  Service providers who help us run the site (hosting,
                  email delivery, analytics), under agreements that limit
                  what they can do with your data
                </li>
                <li>
                  Regulators or authorities, where we're legally required to
                </li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section
              id="cookies"
              ref={(el) => (sectionRefs.current.cookies = el)}
              className={styles.section}
            >
              <h2>Cookies</h2>
              <p>
                We use cookies and similar technologies to keep you signed
                in, remember your cart, and understand how the site is
                used. You can control or disable cookies through your
                browser settings; doing so may affect features like your
                saved cart.
              </p>
            </section>

            <section
              id="retention"
              ref={(el) => (sectionRefs.current.retention = el)}
              className={styles.section}
            >
              <h2>How long we keep it</h2>
              <p>
                We keep order and transaction records for as long as needed
                to meet our tax and accounting obligations, and account
                information for as long as your account is active. If you
                ask us to delete your data, we will do so except where we're
                required to retain it by law.
              </p>
            </section>

            <section
              id="your-rights"
              ref={(el) => (sectionRefs.current['your-rights'] = el)}
              className={styles.section}
            >
              <h2>Your rights</h2>
              <p>Under the NDPA, you have the right to:</p>
              <ul>
                <li>Ask what personal data we hold about you</li>
                <li>Ask us to correct inaccurate or incomplete data</li>
                <li>Ask us to delete your data, subject to legal exceptions</li>
                <li>Object to or restrict certain uses of your data</li>
                <li>Withdraw marketing consent at any time</li>
                <li>
                  Lodge a complaint with the Nigeria Data Protection
                  Commission (NDPC) if you believe your rights have been
                  infringed
                </li>
              </ul>
              <p>
                To exercise any of these rights, write to us using the
                details in "Contact us" below.
              </p>
            </section>

            <section
              id="children"
              ref={(el) => (sectionRefs.current.children = el)}
              className={styles.section}
            >
              <h2>Children's privacy</h2>
              <p>
                Our site is intended for adults. We do not knowingly collect
                personal information from children. If you believe a child
                has provided us with personal data, contact us and we'll
                remove it.
              </p>
            </section>

            <section
              id="changes"
              ref={(el) => (sectionRefs.current.changes = el)}
              className={styles.section}
            >
              <h2>Changes to this policy</h2>
              <p>
                We may update this policy from time to time. If we make
                material changes, we'll update the date at the top of this
                page and, where appropriate, let you know directly.
              </p>
            </section>

            <section
              id="contact"
              ref={(el) => (sectionRefs.current.contact = el)}
              className={styles.section}
            >
              <h2>Contact us</h2>
              <p>
                For any question about this policy or your personal data,
                write to{' '}
                <a href="mailto:shop@omoteeluxeshop.com">
                  shop@omoteeluxeshop.com
                </a>{' '}
                or use the details on our{' '}
                <a href="/contact">Contact page</a>.
              </p>
            </section>
          </article>
        </div>
      </div>
    </main>
  );
}