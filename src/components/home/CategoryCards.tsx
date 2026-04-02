import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'On Sale',
    description: 'Limited reductions on resin botanical jewelry while pieces last',
    link: '/sale',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Personalised Jewelry',
    description: 'Custom settings around your dried blooms and handwritten notes',
    link: '/personalized-keepsakes',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Wedding',
    description: 'Bouquet petals cast into rings, pendants, and bridal party gifts',
    link: '/wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Displays',
    description: 'Coasters, suncatchers, and desk totems with pressed botanicals',
    link: '/displays',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Funeral & Wake',
    description: 'Quiet memorial glasswork from service flowers—with optional hair or fur',
    link: '/funeral-wake',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'From Your Flowers',
    description: 'Ship stems from your garden—we dry, design, and cast your story',
    link: '/florals',
    image: 'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=900&q=80',
  },
];

const CategoryCards = () => {
  return (
    <section className="mt-24" aria-labelledby="category-heading" id="categories-section">
      <div className="mb-12 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-warmGold">Shop collections</p>
        <h2 id="category-heading" className="mt-3 font-heading text-4xl text-charcoal md:text-5xl">
          Botanical heirlooms
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-softBrown">
          Every inclusion is real dried flora (plus optional hair or pet fur for memorial work)—never plastic fillers.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.link}
            className="group relative min-h-[300px] overflow-hidden rounded-2xl card-lift"
            id={`category-${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="font-heading text-2xl md:text-3xl">{cat.title}</h3>
              <p className="mt-2 text-sm text-white/85">{cat.description}</p>
              <span className="mt-3 inline-block text-sm font-bold uppercase tracking-wider text-warmGold transition-transform group-hover:translate-x-2">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
