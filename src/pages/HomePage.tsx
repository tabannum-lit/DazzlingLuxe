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
      
      {/* Feature video before How it Works */}
      <ScrollFade>
        <section className="py-16 md:py-24 bg-cream/50 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-10 font-heading text-3xl font-medium text-charcoal md:text-4xl px-4">
              Dazzling Luxe in Motion
            </h2>
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-lg bg-black shadow-2xl">
              <video
                className="h-full w-full object-contain"
                src="/images/products/video/dazzl.mp4"
                title="Dazzling Luxe handcrafted floral jewelry video"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>
            <p className="mt-8 text-softBrown italic text-lg max-w-2xl mx-auto px-4">
              A closer look at the handcrafted florals, shimmer, and keepsake details behind each piece.
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
