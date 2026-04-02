import { Link } from 'react-router-dom';

const inclusions = [
  {
    title: 'Locks of hair',
    text: 'A thin braid or scattered strands can be sealed beneath a clear window beside dried petals—ideal for parent, partner, or child remembrance.',
  },
  {
    title: 'Pet fur',
    text: 'Soft clippings from dogs and cats set into minimalist bezels pair beautifully with a favourite walk flower or vet bouquet tribute.',
  },
  {
    title: 'Your own flowers',
    text: 'Service arrangements, garden clippings, or wrapped stems shipped cool—preserved with the same archival method as bridal work.',
  },
];

const MemorialKeepsakesPage = () => {
  return (
    <section>
      <div className="rounded-3xl border border-beige/60 bg-gradient-to-b from-paleRose/50 to-cream px-6 py-14 text-center md:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-warmGold">Memorial & remembrance</p>
        <h1 className="font-heading mt-3 text-4xl text-charcoal md:text-[2.75rem]">Keepsakes beyond blooms</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-softBrown">
          When words aren&apos;t enough, we combine botanicals with the textures of a life loved—always handled with private notes and
          return tracking.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {inclusions.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-beige bg-white p-8 shadow-sm transition hover:shadow-md hover:shadow-warmGold/10"
          >
            <h2 className="font-heading text-2xl text-charcoal">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-softBrown">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-warmGold/30 bg-ivory/90 p-8 md:p-12">
        <h2 className="font-heading text-center text-3xl text-charcoal">What to expect</h2>
        <ul className="mx-auto mt-8 max-w-2xl space-y-4 text-sm text-softBrown">
          <li className="flex gap-3">
            <span className="text-warmGold">✦</span>
            Consent form and optional clergy / vet documentation for shared pieces
          </li>
          <li className="flex gap-3">
            <span className="text-warmGold">✦</span>
            Photo updates before final pour; one revision window on layout when possible
          </li>
          <li className="flex gap-3">
            <span className="text-warmGold">✦</span>
            8–12 week timeline depending on drying—rush quoted case by case
          </li>
        </ul>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/send-your-flowers"
            className="inline-flex justify-center rounded-full bg-warmGold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-deepGold"
          >
            Begin intake
          </Link>
          <Link
            to="/funeral-wake"
            className="inline-flex justify-center rounded-full border-2 border-warmGold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-warmGold hover:bg-warmGold/10"
          >
            Funeral & wake flowers
          </Link>
          <Link
            to="/contact"
            className="inline-flex justify-center rounded-full border border-beige px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-softBrown hover:border-warmGold hover:text-warmGold"
          >
            Ask a private question
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MemorialKeepsakesPage;
