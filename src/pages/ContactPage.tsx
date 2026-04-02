import { FormEvent, useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch { /* demo mode */ }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto">
        <div className="text-5xl mb-6">💌</div>
        <h1 className="font-heading text-4xl text-charcoal">Message Sent!</h1>
        <p className="mt-4 text-softBrown">Thank you for reaching out. We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Get In Touch</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Contact Us</h1>
        <p className="mt-4 text-softBrown">We'd love to hear from you</p>
      </div>

      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-beige/40 p-6">
            <h3 className="font-heading text-xl text-charcoal mb-4">Contact Information</h3>
            <div className="space-y-4 text-sm text-softBrown">
              <div className="flex items-start gap-3">
                <span className="text-warmGold">📧</span>
                <div>
                  <p className="font-bold text-charcoal">Email</p>
                  <p>hello@dazzlingluxe.ca</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-warmGold">📱</span>
                <div>
                  <p className="font-bold text-charcoal">Phone</p>
                  <p>+1 (709) 555-0199</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-warmGold">📍</span>
                <div>
                  <p className="font-bold text-charcoal">Location</p>
                  <p>St. John's, Newfoundland & Labrador, Canada</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-warmGold/5 rounded-2xl border border-warmGold/20 p-6">
            <h3 className="font-heading text-xl text-charcoal mb-3">Business Hours</h3>
            <div className="space-y-1.5 text-sm text-softBrown">
              <p>Monday – Friday: 9:00 AM – 5:00 PM NST</p>
              <p>Saturday: 10:00 AM – 3:00 PM NST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-beige/40 p-6 space-y-5" id="contact-form">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-bold text-charcoal mb-2">Full Name *</label>
            <input id="contact-name" type="text" required value={form.name} onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-xl border border-beige bg-cream/50 px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-bold text-charcoal mb-2">Email *</label>
            <input id="contact-email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-xl border border-beige bg-cream/50 px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-sm font-bold text-charcoal mb-2">Subject *</label>
            <input id="contact-subject" type="text" required value={form.subject} onChange={(e) => update('subject', e.target.value)}
              className="w-full rounded-xl border border-beige bg-cream/50 px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-bold text-charcoal mb-2">Message *</label>
            <textarea id="contact-message" rows={5} required value={form.message} onChange={(e) => update('message', e.target.value)}
              className="w-full rounded-xl border border-beige bg-cream/50 px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors resize-none" />
          </div>
          <button type="submit"
            className="w-full py-3.5 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider hover:bg-deepGold transition-colors"
            id="contact-submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
