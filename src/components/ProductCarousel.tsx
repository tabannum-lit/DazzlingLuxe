import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Product } from '../types';
import ProductCard from './ProductCard';

type ProductCarouselProps = {
  title: string;
  products: Product[];
};

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  return (
    <section className="mt-16" aria-label={title}>
      <h2 className="font-heading text-4xl text-gray-800">{title}</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1.1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="product-swiper mt-8"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="pb-2">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductCarousel;
