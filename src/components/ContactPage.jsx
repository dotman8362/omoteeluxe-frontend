// ContactPage.jsx
import { useState } from 'react';
import styles from './ContactPage.module.css';

const TOPICS = [
  'Bespoke enquiry',
  'Order support',
  'Press & partnerships',
  'Something else',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  topic: TOPICS[0],
  message: '',
};
const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Tell us your name.';
  if (!values.email.trim()) {
    errors.email = 'We need an email to reply to.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'That email doesn\u2019t look right.';
  }
  if (!values.message.trim()) errors.message = 'Let us know what you need.';
  return errors;
};

 function ContactPage() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!web3FormsAccessKey) {
      setStatus('error');
      return;
    }

   setStatus('submitting');
try {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: web3FormsAccessKey,
      subject: `New enquiry from ${values.name} — ${values.topic}`,
      from_name: 'Omoteeluxe Contact Form',
      name: values.name,
      email: values.email,
      phone: values.phone || 'Not provided',
      topic: values.topic,
      message: values.message,
    }),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Submission failed');
  }

  setStatus('success');
  setValues(initialForm);
} catch {
  setStatus('error');
}
  };

  return (
    <main className={styles.page}>
      <div className={styles.grain} aria-hidden="true" />

      <div className={styles.wrap}>
        <header className={styles.mark}>
          <span className={styles.markWord}>Omoteeluxe</span>
          <span className={styles.markRule} aria-hidden="true" />
        </header>

        <div className={styles.grid}>
          <section className={styles.intro}>
            <h1 className={styles.headline}>
              Every piece begins
              <br />
              with a conversation.
            </h1>
            <p className={styles.lede}>
              Whether you're commissioning a bespoke piece, following up on an
              order, or simply curious about the craft behind it, write to us.
              A member of our team replies personally within one working day.
            </p>

            <dl className={styles.details}>
              <div className={styles.detailRow}>
                <dt>Visit</dt>
                <dd>15 Olusanya street off AIT road kola, Lagos</dd>
              </div>
              <div className={styles.detailRow}>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:shopteeluxee@gmail.com">
                    shopteeluxee@gmail.com
                  </a>
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt>Call</dt>
                <dd>
                  <a href="tel:+2347048304972">+2347048304972</a>
                </dd>
              </div>
              <div className={styles.detailRow}>
                <dt>Hours</dt>
                <dd>Monday&ndash;Saturday, 9am&ndash;6pm WAT</dd>
              </div>
            </dl>

            <div className={styles.social}>
              <a href="https://www.instagram.com/shopteeluxe?igsh=YWo5NGE3dHhkejNm&utm_source=qr" className={styles.socialLink}>Instagram</a>
              <a href="https://wa.me/2347048304972" className={styles.socialLink}>WhatsApp</a>
             
            </div>
          </section>

          <section className={styles.formSection}>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  autoComplete="name"
                />
                {errors.name && (
                  <span id="name-error" className={styles.error}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange('email')}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span id="email-error" className={styles.error}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">Phone (optional)</label>
                  <input
                    id="phone"
                    type="tel"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="topic">What's this about</label>
                <select
                  id="topic"
                  value={values.topic}
                  onChange={handleChange('topic')}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span id="message-error" className={styles.error}>
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending' : 'Send enquiry'}
              </button>

              <p role="status" aria-live="polite" className={styles.statusLine}>
                {status === 'success' &&
                  'Message sent. We\u2019ll be in touch within one working day.'}
                {status === 'error' &&
                  'Something went wrong on our end. Please try again shortly.'}
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
export default ContactPage;
