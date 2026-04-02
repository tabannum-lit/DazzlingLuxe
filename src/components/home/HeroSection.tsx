import { useState, useEffect } from 'react';
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
    }, 3000); // 3 seconds per image
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative flex min-h-[520px] items-center justify-center overflow-hidden md:min-h-[700px]"
      id="hero-section"
    >
      {/* Background Images Slider */}
      {HERO_IMAGES.map((src, idx) => (
        <div 
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIdx ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}
          <img
            src={src}
            alt="Sunlight on resin flower jewellery"
            className="h-full w-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="relative z-20 mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-4 animate-fade-in text-sm font-bold uppercase tracking-[0.25em] text-warmGold drop-shadow-md">
          Dazzling Luxe
        </p>
        <h1
          className="animate-slide-up font-heading text-4xl leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-xl"
          style={{ animationDelay: '0.2s' }}
        >
          CAPTURE THE FLEETING MOMENT
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg text-cream/90 md:text-xl drop-shadow-md"
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
            className="rounded-full bg-warmGold px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-deepGold hover:shadow-lg hover:shadow-warmGold/25 shadow-md"
          >
            Send flowers to preserve
          </Link>
          <Link
            to="/feature-this-season"
            className="rounded-full border-2 border-white px-8 py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all hover:bg-white hover:text-charcoal backdrop-blur-sm"
          >
            Shop Collection
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
