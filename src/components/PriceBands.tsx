import { Link } from 'react-router-dom';

const PriceBands = () => {
  return (
    <section className="mt-16 rounded-2xl bg-pink-50 p-8" aria-labelledby="shop-by-price">
      <h2 id="shop-by-price" className="font-heading text-4xl text-gray-800">
        Shop By Price
      </h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <Link
          to="/shop?maxPrice=50"
          className="rounded-xl border border-pink-200 bg-white px-6 py-5 text-center text-lg font-semibold text-gray-700 transition hover:border-pink-500 hover:text-pink-600"
        >
          Under $50
        </Link>
        <Link
          to="/shop?minPrice=50&maxPrice=100"
          className="rounded-xl border border-pink-200 bg-white px-6 py-5 text-center text-lg font-semibold text-gray-700 transition hover:border-pink-500 hover:text-pink-600"
        >
          $50 - $100
        </Link>
      </div>
    </section>
  );
};

export default PriceBands;
