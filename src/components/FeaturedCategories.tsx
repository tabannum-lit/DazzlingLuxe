import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Bracelets',
    link: '/shop?subcategory=Bracelets',
    image:
      'https://images.unsplash.com/photo-1611107683227-e9060eccd846?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Necklaces',
    link: '/shop?subcategory=Necklaces',
    image:
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Gifts',
    link: '/shop?gift=true',
    image:
      'https://images.unsplash.com/photo-1611566026373-c6c8da0ea861?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'New Arrivals',
    link: '/shop?new=true',
    image:
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
  },
];

const FeaturedCategories = () => {
  return (
    <section className="mt-16" aria-labelledby="featured-categories">
      <h2 id="featured-categories" className="font-heading text-4xl text-gray-800">
        Featured Categories
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.title}
            to={category.link}
            className="group relative min-h-[250px] overflow-hidden rounded-2xl"
          >
            <img
              src={category.image}
              alt={category.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-heading text-3xl text-white">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
