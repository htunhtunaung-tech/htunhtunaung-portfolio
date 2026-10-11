import { useRef, useState } from 'react';
import { contact, settings } from '../data/site.js';
import { Alert, ArrowRight, ArrowUpRight, Check } from './Icons.jsx';
import { ResumeLink } from './ResumeLink.jsx';
import { Headline, Reveal, SectionLabel } from './Reveal.jsx';

const EMPTY = { name: '', email: '', subject: '', message: '', website: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please add your name.';
  if (!values.email.trim()) errors.email = 'Please add your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Enter a complete email address, like name@company.com.';
  if (!values.subject.trim()) errors.subject = 'Please add a subject.';
  if (values.message.trim().length < 10) errors.message = 'Please write a short message (at least 10 characters).';
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          <Alert size={15} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // idle | sending | success | error | mailto
  const [status, setStatus] = useState('idle');
  const formRef = useRef(null);

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    if (status !== 'idle' && status !== 'sending') setStatus('idle');
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange,
    required: true,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      const el = formRef.current?.querySelector(`[name="${firstInvalid}"]`);
      if (el) el.focus();
      return;
    }
    if (values.website) return; // hidden field only bots fill in

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    // No mail service configured: never pretend. Hand the message to the
    // visitor's own email app instead.
    if (!settings.formEndpoint) {
      const body = `${payload.message}\n\n— ${payload.name} (${payload.email})`;
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(settings.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
      setStatus('success');
      setValues(EMPTY);
    } catch (error) {
      setStatus('error');
    }
  };

  const rows = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    settings.showPhone && contact.phone
      ? { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/[^+\d]/g, '')}` }
      : null,
    contact.linkedin ? { label: 'LinkedIn', value: 'View profile', href: contact.linkedin, external: true } : null,
    contact.github ? { label: 'GitHub', value: 'View profile', href: contact.github, external: true } : null,
  ].filter(Boolean);

  return (
    <section id="contact" className="section section--alt contact">
      <div className="contact__grid" aria-hidden="true" />
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__inner">
        <div className="contact__info">
          <SectionLabel number="06">Resume &amp; contact</SectionLabel>
          <Headline parts={contact.heading} className="contact__title" />

          <ul className="contact__rows">
            {rows.map((row, i) => (
              <Reveal as="li" key={row.label} delay={i * 80}>
                <a
                  href={row.href}
                  target={row.external ? '_blank' : undefined}
                  rel={row.external ? 'noreferrer' : undefined}
                >
                  <span className="mono-label">{row.label}</span>
                  <span className="contact__value">
                    {row.value}
                    {row.external && <ArrowUpRight size={14} />}
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <ResumeLink className="btn btn--ghost" />
          </Reveal>
        </div>

        <Reveal variant="scale" className="form-wrap">
          <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
          <h3 className="form__title">Send a message</h3>

          <div className="form__pair">
            <Field id="contact-name" label="Name" error={errors.name}>
              <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
            </Field>
            <Field id="contact-email" label="Email" error={errors.email}>
              <input type="email" autoComplete="email" placeholder="you@company.com" {...fieldProps('email')} />
            </Field>
          </div>
          <Field id="contact-subject" label="Subject" error={errors.subject}>
            <input type="text" placeholder="Internship, project, or just hello" {...fieldProps('subject')} />
          </Field>
          <Field id="contact-message" label="Message" error={errors.message}>
            <textarea rows={5} placeholder="Tell me about the problem you're working on" {...fieldProps('message')} />
          </Field>

          {/* Honeypot: hidden from people, tempting to bots. */}
          <div className="form__trap" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={onChange}
            />
          </div>

          <div className="form__foot">
            <span className="mono-label">All fields required</span>
            <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <ArrowRight />
                </>
              )}
            </button>
          </div>

          <div aria-live="polite">
            {status === 'success' && (
              <p className="notice notice--ok">
                <Check size={18} />
                <span>
                  <strong>Sent.</strong> Thank you — I'll reply by email.
                </span>
              </p>
            )}
            {status === 'error' && (
              <p className="notice notice--warn">
                <Alert size={18} />
                <span>
                  <strong>Not sent.</strong> Something went wrong on the way. Please email{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a> instead.
                </span>
              </p>
            )}
            {status === 'mailto' && (
              <p className="notice notice--warn">
                <Alert size={18} />
                <span>
                  <strong>Almost there.</strong> Your email app should have opened with the message filled in — press
                  send there. If nothing opened, write to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </span>
              </p>
            )}
          </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
