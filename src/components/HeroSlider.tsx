import { Link } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type HeroSlide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  actionLabel: string;
  actionLink: string;
};

const slides: HeroSlide[] = [
  {
    id: 1,
    title: 'Spring Atelier Collection',
    subtitle: 'Soft pink accents for handcrafted keepsakes',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1600&q=80',
    actionLabel: 'Shop New Arrivals',
    actionLink: '/shop?new=true',
  },
  {
    id: 2,
    title: 'Raisin Art Gift Edit',
    subtitle: 'Preserved ornaments and mini sculptures under $100',
    image:
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1600&q=80',
    actionLabel: 'Explore Gifts',
    actionLink: '/shop?category=Raisin%20Crafts',
  },
  {
    id: 3,
    title: 'Clay Bead Essentials',
    subtitle: 'Textured clay charms designed for everyday stacking',
    image:
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?auto=format&fit=crop&w=1600&q=80',
    actionLabel: 'Shop Clay Products',
    actionLink: '/shop?category=Clay%20Products',
  },
  {
    id: 4,
    title: 'Bundle & Save 20%',
    subtitle: 'Complete-the-look sets curated by our studio artisans',
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1600&q=80',
    actionLabel: 'View Bundles',
    actionLink: '/shop?bundle=true',
  },
];

const HeroSlider = () => {
  return (
    <section aria-label="Promotions" className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        className="hero-swiper overflow-hidden rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className="relative min-h-[420px] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
              <div className="relative flex min-h-[420px] max-w-xl flex-col justify-center p-8 text-white sm:p-12">
                <p className="text-sm uppercase tracking-[0.18em] text-pink-100">Aethelgard Blooms</p>
                <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl">{slide.title}</h1>
                <p className="mt-4 text-base text-pink-50 sm:text-lg">{slide.subtitle}</p>
                <Link
                  to={slide.actionLink}
                  className="mt-7 inline-flex w-fit rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-pink-600"
                >
                  {slide.actionLabel}
                </Link>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
