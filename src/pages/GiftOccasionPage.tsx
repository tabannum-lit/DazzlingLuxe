import { Link, useParams } from 'react-router-dom';

const GIFT_COPY: Record<
  string,
  { title: string; subtitle: string; body: string[]; accent: string }
> = {
  'for-him': {
    title: 'Gifts for Him',
    subtitle: 'Understated botanical pieces with real dried blooms—rings, cuff links, and pendants.',
    body: [
      'Warm metals and clear resin let every grain of petal read like a fingerprint—no mass-produced impressions.',
      'Personal engraving and custom inclusions available when you send meaningful flowers or keepsake materials.',
    ],
    accent: 'Designed for everyday wear and quiet sentiment.',
  },
  'for-her': {
    title: 'Gifts for Her',
    subtitle: 'Heirloom jewelry and display pieces pressed from real flowers she already loves.',
    body: [
      'Necklaces, bracelets, and earrings cast around petals that once meant something—anniversaries, graduations, new chapters.',
      'Pair with preserved bouquet work from your wedding or milestone arrangement.',
    ],
    accent: 'Each setting is mixed and poured by hand in small batches.',
  },
  birthday: {
    title: 'Birthday Gifts',
    subtitle: 'Celebrate another trip around the sun with florals frozen in time.',
    body: [
      'Birth-month blooms, dried garden clippings, or store-bought stems—we preserve what matters to the recipient.',
      'Add gift wrap and a handwritten card at checkout.',
    ],
    accent: 'Ship ready-to-give pieces or send a preservation kit for their own flowers.',
  },
  holidays: {
    title: 'Holiday Gifting',
    subtitle: 'Seasonal botanical jewelry and décor for tables and mantels.',
    body: [
      'Thoughtful alternatives to cut flowers: pieces that last beyond the holidays.',
      'Pair with our Canadian-themed collection for hosts who love local craft.',
    ],
    accent: 'Order early November–December for holiday delivery windows.',
  },
  religious: {
    title: 'Religious & Ceremonial',
    subtitle: 'Respectful keepsakes for blessings, milestones, and remembrance.',
    body: [
      'We work gently with white blooms, olive branch clippings, roses from confirmations, and flowers from services.',
      'Memorial inclusions: a lock of hair, pet fur, or flowers from a service can be sealed with consent and care instructions.',
    ],
    accent: 'Tell us your tradition—we design with discretion.',
  },
  canadian: {
    title: 'Canadian Made & Inspired',
    subtitle: 'Heirlooms crafted in Canada with wild and garden botanicals from our seasons.',
    body: [
      'Maple-toned metals, muted prairie palettes, and coastal-inspired blues appear in our Canadian edits.',
      'Support domestic small-batch artisans and reduce cross-border shipping surprises.',
    ],
    accent: 'Proudly handmade—ships from our Canadian studio.',
  },
};

const GiftOccasionPage = () => {
  const { occasion } = useParams<{ occasion: string }>();
  const slug = occasion ?? '';
  const data = GIFT_COPY[slug];

  if (!data) {
    return (
      <section className="text-center">
        <h1 className="font-heading text-3xl text-charcoal">Occasion not found</h1>
        <Link to="/" className="mt-4 inline-block text-warmGold underline">
          Return home
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div
        className="relative overflow-hidden rounded-3xl border border-beige/60 bg-gradient-to-br from-cream via-ivory to-paleRose/30 px-6 py-14 md:px-12"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 20%, rgba(200, 169, 110, 0.12), transparent 50%)',
        }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-warmGold">Gifts</p>
        <h1 className="font-heading mt-3 text-4xl text-charcoal md:text-5xl">{data.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-softBrown">{data.subtitle}</p>
        <ul className="mt-8 max-w-2xl list-disc space-y-3 pl-5 text-sm leading-relaxed text-softBrown">
          {data.body.map((line, i) => (
            <li key={`${slug}-${i}`}>{line}</li>
          ))}
        </ul>
        <p className="mt-8 font-heading text-xl italic text-deepGold">{data.accent}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/jewelry"
            className="rounded-full bg-warmGold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-deepGold"
          >
            Shop jewelry
          </Link>
          <Link
            to="/memorial-keepsakes"
            className="rounded-full border-2 border-warmGold px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-warmGold transition-colors hover:bg-warmGold/10"
          >
            Memorial inclusions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GiftOccasionPage;
