import { FormEvent, useState } from 'react';

const SendYourFlowersPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    flowerType: '',
    occasion: '',
    keepsakeType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/custom-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {
      // Silently handle — we show success either way for demo
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-20 max-w-lg mx-auto">
        <div className="text-5xl mb-6">🌸</div>
        <h1 className="font-heading text-4xl text-charcoal">Thank You!</h1>
        <p className="mt-4 text-softBrown leading-relaxed">
          We've received your flower submission request. Our team will reach out within 24 hours
          with instructions on how to send your flowers. We can't wait to create something beautiful for you!
        </p>
        <div className="mt-8 p-6 rounded-2xl bg-warmGold/5 border border-warmGold/20">
          <p className="text-sm text-softBrown">
            <span className="font-bold text-charcoal">What happens next?</span><br />
            1. We'll email you a shipping kit<br />
            2. Send your flowers using the provided packaging<br />
            3. We'll craft your keepsake in 4-6 weeks
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Custom Order</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Send Your Flowers</h1>
        <p className="mt-4 text-softBrown max-w-lg mx-auto">
          Have special flowers you'd like to preserve? Fill out this form and we'll guide you through
          the process of transforming them into a timeless keepsake.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" id="send-flowers-form">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-charcoal mb-2">Full Name *</label>
            <input id="name" type="text" required value={form.name} onChange={(e) => update('name', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-charcoal mb-2">Email *</label>
            <input id="email" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
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
            <label htmlFor="flowerType" className="block text-sm font-bold text-charcoal mb-2">Flower Type *</label>
            <input id="flowerType" type="text" required value={form.flowerType} onChange={(e) => update('flowerType', e.target.value)}
              placeholder="e.g. Roses, Lilies, Mixed Bouquet"
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="occasion" className="block text-sm font-bold text-charcoal mb-2">Occasion *</label>
            <select id="occasion" required value={form.occasion} onChange={(e) => update('occasion', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors cursor-pointer">
              <option value="">Select an occasion</option>
              <option>Wedding</option>
              <option>Anniversary</option>
              <option>Memorial / Funeral</option>
              <option>Birthday</option>
              <option>Baby Birth</option>
              <option>Graduation</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="keepsakeType" className="block text-sm font-bold text-charcoal mb-2">Desired Keepsake</label>
            <select id="keepsakeType" value={form.keepsakeType} onChange={(e) => update('keepsakeType', e.target.value)}
              className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors cursor-pointer">
              <option value="">Not sure yet</option>
              <option>Necklace / Pendant</option>
              <option>Ring</option>
              <option>Bracelet</option>
              <option>Earrings</option>
              <option>Coaster</option>
              <option>Suncatcher</option>
              <option>Frame / Shadow Box</option>
              <option>Keepsake Box</option>
              <option>Other Custom Piece</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-charcoal mb-2">Tell Us Your Story</label>
          <textarea id="message" rows={4} value={form.message} onChange={(e) => update('message', e.target.value)}
            placeholder="Share the story behind your flowers — we'd love to know what makes them special to you..."
            className="w-full rounded-xl border border-beige bg-white px-4 py-3 text-sm outline-none focus:border-warmGold transition-colors resize-none" />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg"
          id="submit-flowers-form"
        >
          Submit Your Request
        </button>
      </form>
    </section>
  );
};

export default SendYourFlowersPage;
