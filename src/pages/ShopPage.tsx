import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import FiltersSidebar, { ShopFilters } from '../components/FiltersSidebar';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import SortDropdown from '../components/SortDropdown';
import { Product, RecipientTag } from '../types';

type ShopPageProps = {
  products: Product[];
};

const ITEMS_PER_PAGE = 9;

const ShopPage = ({ products }: ShopPageProps) => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ShopFilters>({});
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const querySearch = searchParams.get('search')?.toLowerCase() ?? '';
  const queryCategory = searchParams.get('category');
  const queryRecipient = searchParams.get('recipient');
  const querySubcategory = searchParams.get('subcategory');
  const queryNewOnly = searchParams.get('new') === 'true';
  const queryGiftOnly = searchParams.get('gift') === 'true';
  const queryMinPrice = searchParams.get('minPrice');
  const queryMaxPrice = searchParams.get('maxPrice');
  const supportsRecipientTags = products.some((product) => (product.recipientTags?.length ?? 0) > 0);
  const supportsMaterialFilter = products.some((product) => Boolean(product.material));
  const supportsSizeFilter = products.some((product) => Boolean(product.size));
  const supportsColorFilter = products.some((product) => Boolean(product.color));

  useEffect(() => {
    setPage(1);
  }, [filters, sortBy, querySearch, queryCategory, queryRecipient, querySubcategory, queryNewOnly, queryGiftOnly]);

  useEffect(() => {
    const minPrice = queryMinPrice ? Number(queryMinPrice) : undefined;
    const maxPrice = queryMaxPrice ? Number(queryMaxPrice) : undefined;

    setFilters((current) => ({
      ...current,
      minPrice,
      maxPrice,
    }));
  }, [queryMinPrice, queryMaxPrice]);

  const filteredProducts = useMemo(() => {
    const next = products.filter((product) => {
      const recipientTags = product.recipientTags ?? [];

      if (querySearch && !product.name.toLowerCase().includes(querySearch)) {
        return false;
      }

      if (queryCategory && product.category !== queryCategory) {
        return false;
      }

      if (querySubcategory && product.subcategory !== querySubcategory) {
        return false;
      }

      if (queryRecipient && supportsRecipientTags && !recipientTags.includes(queryRecipient as RecipientTag)) {
        return false;
      }

      if (queryNewOnly && !product.newArrival) {
        return false;
      }

      if (queryGiftOnly && supportsRecipientTags && recipientTags.length === 0) {
        return false;
      }

      if (filters.minPrice !== undefined && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
        return false;
      }

      if (filters.material && supportsMaterialFilter && product.material !== filters.material) {
        return false;
      }

      if (filters.size && supportsSizeFilter && product.size !== filters.size) {
        return false;
      }

      if (filters.color && supportsColorFilter && product.color !== filters.color) {
        return false;
      }

      return true;
    });

    return next.sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }

      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }

      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }

      return Number(b.newArrival) - Number(a.newArrival);
    });
  }, [
    filters,
    products,
    queryCategory,
    queryGiftOnly,
    queryNewOnly,
    queryRecipient,
    querySearch,
    querySubcategory,
    sortBy,
    supportsColorFilter,
    supportsMaterialFilter,
    supportsRecipientTags,
    supportsSizeFilter,
  ]);

  const pageCount = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-pink-500">Collection</p>
          <h1 className="mt-1 font-heading text-5xl text-gray-800">Shop Handmade</h1>
          <p className="mt-2 text-gray-600">Curated jewelry, raisin crafts, and artisan clay keepsakes.</p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <FiltersSidebar products={products} filters={filters} onChange={setFilters} />
        <div>
          {paginatedProducts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Products Found"
              description="Try adjusting filters or search terms to discover more handmade pieces."
            />
          )}

          <Pagination currentPage={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
