import { FormEvent, useState } from 'react';
import { CustomerDetails } from './types';

export type DetailsStepProps = {
  details: CustomerDetails;
  onSubmit: (details: CustomerDetails) => void;
};

const DetailsStep = ({ details, onSubmit }: DetailsStepProps) => {
  const [form, setForm] = useState<CustomerDetails>(details);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof CustomerDetails, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!form.email.trim() && !form.phone.trim()) {
      setError('Please provide an email or phone number so we can reach you.');
      return;
    }
    setError(null);
    onSubmit(form);
  };

  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 1 of 5</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Your Details</h1>
        <p className="mt-4 text-softBrown max-w-lg mx-auto">
          Tell us a little about you and your flowers before you choose a keepsake.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2">Full Name *</label>
            <input id="name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2">Email</label>
            <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-charcoal mb-2">Phone</label>
            <input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="flowerType" className="block text-sm font-bold text-charcoal mb-2">Flower Type</label>
            <input id="flowerType" type="text" value={form.flowerType} onChange={(e) => update('flowerType', e.target.value)}
              placeholder="e.g. Roses, Lilies, Mixed Bouquet"
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-charcoal mb-2">Tell Us Your Story</label>
          <textarea id="message" rows={4} value={form.message} onChange={(e) => update('message', e.target.value)}
            placeholder="Share the story behind your flowers..."
            className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors resize-none" />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button type="submit"
          className="w-full py-4 rounded-full bg-warmGold text-charcoal font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg">
          Continue
        </button>
      </form>
    </section>
  );
};

export default DetailsStep;
