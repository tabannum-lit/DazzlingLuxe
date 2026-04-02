import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1610419086772-5bb9f39151ff?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1920&q=80'
];

const HeroSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative flex min-h-[640px] items-center justify-center overflow-hidden pt-28 sm:min-h-[720px] sm:pt-32 lg:min-h-[860px] lg:pt-44"
      id="hero-section"
    >
      {HERO_IMAGES.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIdx ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 z-10 bg-black/45" />
          <img
            src={src}
            alt="Sunlight on resin flower jewellery"
            className="h-full w-full object-cover"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <div className="relative z-20 mx-auto max-w-4xl px-6 pb-24 pt-14 text-center sm:px-8 lg:pb-28 lg:pt-20">
        <p className="mb-5 animate-fade-in text-sm font-bold uppercase tracking-[0.35em] text-beige drop-shadow-md">
          Dazzling Luxe
        </p>
        <h1
          className="animate-slide-up font-heading text-4xl leading-[0.95] text-white drop-shadow-xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ animationDelay: '0.2s' }}
        >
          CAPTURE THE FLEETING MOMENT
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg text-cream/90 drop-shadow-md md:text-xl"
          style={{ animationDelay: '0.4s' }}
        >
          Sunlight illuminated botanical jewelry that preserves your most cherished memories in crystal clear resin.
        </p>

        <div
          className="mt-10 flex animate-slide-up flex-col justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.6s' }}
        >
          <Link
            to="/send-your-flowers"
            className="rounded-full bg-warmGold px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-md transition-all hover:bg-deepGold hover:shadow-lg hover:shadow-warmGold/25"
          >
            Send flowers to preserve
          </Link>
          <Link
            to="/feature-this-season"
            className="rounded-full border-2 border-white/85 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-all hover:bg-white hover:text-charcoal"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
};

export default HeroSection;
