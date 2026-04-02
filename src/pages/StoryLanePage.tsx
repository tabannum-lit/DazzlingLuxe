import { Link, useLocation } from 'react-router-dom';

type Lane = 'wedding' | 'funeral-wake' | 'florals';

const LANES: Record<
  Lane,
  {
    title: string;
    kicker: string;
    subtitle: string;
    bullets: string[];
    ctaPrimary: { to: string; label: string };
    ctaSecondary: { to: string; label: string };
    image: string;
  }
> = {
  wedding: {
    kicker: 'Wedding',
    title: 'Your bouquet, forever wearable',
    subtitle:
      'We dry individual petals from your wedding flowers and suspend them in resin—set in gold-toned findings for rings, pendants, and cufflinks.',
    bullets: [
      'Bridal party sets: coordinated mini pendants or tie pins',
      'Tight timelines—rush consult available',
      'Pairs with matching coaster or suncatcher displays for head tables',
    ],
    ctaPrimary: { to: '/send-your-flowers', label: 'Ship your bouquet' },
    ctaSecondary: { to: '/jewelry', label: 'Shop wedding-ready pieces' },
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  },
  'funeral-wake': {
    kicker: 'Funeral & wake flowers',
    title: 'Gentle preservation after farewell',
    subtitle:
      'Roses, lilies, and garden stems from services can become touchstones for family—discreet pendants, paperweights, and suncatchers.',
    bullets: [
      'Coordinated family orders with matched metal finishes',
      'Optional inclusion of a small lock of hair or pet fur alongside petals',
      'Packaging suited for hand-delivery to loved ones',
    ],
    ctaPrimary: { to: '/memorial-keepsakes', label: 'Memorial keepsakes' },
    ctaSecondary: { to: '/send-your-flowers', label: 'Send flowers to our studio' },
    image:
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1400&q=80',
  },
  florals: {
    kicker: 'From your flowers',
    title: 'Florals you mail. Jewelry we cast.',
    subtitle:
      'Any meaningful bloom—anniversary roses, garden peonies, wildflowers from a hike—pressed, dried, and sealed into custom heirlooms.',
    bullets: [
      'Consultation on petal placement before resin pour',
      'Ship with our packing guide; tracked return available',
      'Combine with hair, fur, or paper vows in layered castings when requested',
    ],
    ctaPrimary: { to: '/send-your-flowers', label: 'Start preservation' },
    ctaSecondary: { to: '/personalized-keepsakes', label: 'See personalized work' },
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=1400&q=80',
  },
};

const pathToLane: Record<string, Lane> = {
  '/wedding': 'wedding',
  '/funeral-wake': 'funeral-wake',
  '/florals': 'florals',
};

const StoryLanePage = () => {
  const { pathname } = useLocation();
  const key = pathToLane[pathname];
  const data = key ? LANES[key] : undefined;

  if (!data) {
    return (
      <section className="text-center">
        <h1 className="font-heading text-3xl">Page not found</h1>
        <Link to="/" className="mt-4 inline-block text-warmGold underline">
          Home
        </Link>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-3xl border border-beige/50 bg-white">
      <div className="grid gap-0 lg:grid-cols-2">
        <div className="relative min-h-[280px] lg:min-h-[480px]">
          <img src={data.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-charcoal/20" />
        </div>
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-warmGold">{data.kicker}</p>
          <h1 className="font-heading mt-3 text-4xl leading-tight text-charcoal md:text-[2.75rem]">
            {data.title}
          </h1>
          <p className="mt-4 text-lg text-softBrown">{data.subtitle}</p>
          <ul className="mt-8 space-y-3 text-sm text-softBrown">
            {data.bullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warmGold" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to={data.ctaPrimary.to}
              className="inline-flex justify-center rounded-full bg-warmGold px-8 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-white transition hover:bg-deepGold"
            >
              {data.ctaPrimary.label}
            </Link>
            <Link
              to={data.ctaSecondary.to}
              className="inline-flex justify-center rounded-full border-2 border-warmGold px-8 py-3.5 text-center text-xs font-bold uppercase tracking-widest text-warmGold transition hover:bg-warmGold/10"
            >
              {data.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryLanePage;
