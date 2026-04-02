import { Product } from '../types';
import HeroSection from '../components/home/HeroSection';
import CategoryCards from '../components/home/CategoryCards';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedProducts from '../components/home/FeaturedProducts';
import StorySection from '../components/home/StorySection';
import Testimonials from '../components/home/Testimonials';
import ScrollFade from '../components/shared/ScrollFade';

type HomePageProps = {
  products: Product[];
};

const HomePage = ({ products }: HomePageProps) => {
  return (
    <>
      <HeroSection />
      <ScrollFade>
        <CategoryCards />
      </ScrollFade>
      
      {/* Flower Garden Video before How it Works */}
      <ScrollFade>
        <section className="py-16 md:py-24 bg-cream/50 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-10 font-heading text-3xl font-medium text-charcoal md:text-4xl px-4">
              Botanical Inspiration
            </h2>
            <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black/5">
              <iframe
                src="https://www.youtube.com/embed/n4s9t9r3tGE?autoplay=1&mute=1&loop=1&playlist=n4s9t9r3tGE&controls=0&showinfo=0&rel=0"
                title="Beautiful flower garden"
                className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-8 text-softBrown italic text-lg max-w-2xl mx-auto px-4">
              From delicate forget-me-nots and dandelion seeds, to sunflowers, daisies, roses, pansies, lavender, baby's breath, and statice. Every bloom tells a story.
            </p>
          </div>
        </section>
      </ScrollFade>

      <ScrollFade>
        <HowItWorks />
      </ScrollFade>
      <ScrollFade>
        <FeaturedProducts products={products} />
      </ScrollFade>
      <ScrollFade>
        <StorySection />
      </ScrollFade>
      <ScrollFade>
        <Testimonials />
      </ScrollFade>
    </>
  );
};

export default HomePage;
