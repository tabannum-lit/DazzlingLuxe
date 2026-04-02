import { Link } from 'react-router-dom';
import HowItWorks from '../components/home/HowItWorks';

const artisanSteps = [
  {
    n: '01',
    title: 'Consult & receive',
    text: 'You share photos, timelines, and any inclusions—flowers, a ribbon of hair, or pet fur. We send secure packing steps.',
  },
  {
    n: '02',
    title: 'Dry & stabilize',
    text: 'Petals are pressed slowly to keep colour. Delicate inclusions are documented so nothing shifts before casting.',
  },
  {
    n: '03',
    title: 'Resin & metal',
    text: 'Layers of crystal-clear resin are poured and cured; findings are soldered or bonded for daily wear.',
  },
  {
    n: '04',
    title: 'Heirloom delivery',
    text: 'Polished, inspected, and boxed with care cards so your botanical jewelry arrives gallery-ready.',
  },
];

const OurProcessPage = () => {
  return (
    <>
      <header className="mb-12 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-warmGold">Transparency</p>
        <h1 className="font-heading mt-3 text-4xl text-charcoal md:text-5xl">Our artisan process</h1>
        <p className="mx-auto mt-4 max-w-2xl text-softBrown">
          Aethelgard Blooms exists to honour real dried flowers—never plastic substitutes. Every pour is timed by hand.
        </p>
      </header>

      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {artisanSteps.map((s) => (
          <article
            key={s.n}
            className="rounded-2xl border border-beige/70 bg-ivory/80 p-6 text-center transition hover:border-warmGold/40 hover:shadow-lg hover:shadow-warmGold/10"
          >
            <span className="text-xs font-bold text-warmGold">{s.n}</span>
            <h2 className="font-heading mt-2 text-xl text-charcoal">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-softBrown">{s.text}</p>
          </article>
        ))}
      </div>

      <HowItWorks />

      <div className="mt-16 rounded-2xl bg-warmGold/10 p-10 text-center">
        <h2 className="font-heading text-2xl text-charcoal">Ready to send materials?</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-softBrown">
          Bouquets, single stems, hair, or pet fur—we&apos;ll confirm what we can cast before you ship.
        </p>
        <Link
          to="/send-your-flowers"
          className="mt-6 inline-block rounded-full bg-warmGold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-deepGold"
        >
          Preserve your flowers
        </Link>
      </div>
    </>
  );
};

export default OurProcessPage;
