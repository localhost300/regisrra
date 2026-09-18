'use client';

import {FormEvent, useState} from 'react';
import {CheckCircle2, Send} from 'lucide-react';

export default function ContactForm({advisorName, advisorSlug}: {advisorName: string; advisorSlug: string}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...payload, advisorSlug}),
      });

      if (!response.ok) throw new Error();

      form.reset();
      setSent(true);
    } catch {
      setError('Unable to send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="contact-card contact-success">
        <CheckCircle2 />
        <h3>Message sent</h3>
        <button className="text-link" onClick={() => setSent(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-card broker-contact" onSubmit={handleSubmit}>
      <p className="kicker">Connect with this broker</p>
      <h3>Send {advisorName.split(' ')[0]} a message</h3>
      <p className="form-intro">Share a little about what you need help with.</p>
      <label>
        Full name
        <input name="fullName" required autoComplete="name" placeholder="Your full name" />
      </label>
      <label>
        Email address
        <input name="email" required type="email" autoComplete="email" placeholder="you@example.com" />
      </label>
      <label>
        Phone number
        <input name="phone" required type="tel" autoComplete="tel" placeholder="(555) 000-0000" />
      </label>
      <label>
        Location
        <input name="location" required autoComplete="address-level2" placeholder="City, state" />
      </label>
      <label>
        Subject
        <input name="subject" required placeholder="What would you like to discuss?" />
      </label>
      <label>
        Message
        <textarea name="message" required rows={5} minLength={20} />
      </label>
      {error && <p role="alert">{error}</p>}
      <button className="btn full" type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send inquiry'} {!submitting && <Send size={16} />}
      </button>
      <small>I&apos;ll get back to you within 24–48 business hours.</small>
    </form>
  );
}
