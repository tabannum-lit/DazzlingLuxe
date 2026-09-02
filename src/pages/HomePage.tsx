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
