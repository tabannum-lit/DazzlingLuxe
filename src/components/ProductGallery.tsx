import { useState } from 'react';

type ProductGalleryProps = {
  name: string;
  images: string[];
};

const ProductGallery = ({ name, images }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-label="Product images" className="space-y-4">
      <div className="simulate-360 perspective overflow-hidden rounded-2xl bg-gray-100">
        <img src={images[activeIndex]} alt={name} className="h-[500px] w-full object-cover transition duration-500" />
      </div>
      <p className="text-xs uppercase tracking-[0.12em] text-gray-500">Hover image for 360 view mock</p>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-lg border ${
              index === activeIndex ? 'border-pink-500' : 'border-pink-100'
            }`}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`${name} thumbnail ${index + 1}`} className="h-20 w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default ProductGallery;
