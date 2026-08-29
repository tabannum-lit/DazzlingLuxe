import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import EmptyState from '../components/shared/EmptyState';
import FiltersSidebar, { ShopFilters } from '../components/FiltersSidebar';
import Pagination from '../components/Pagination';
import ProductCard from '../components/shared/ProductCard';
import SortDropdown from '../components/SortDropdown';
import { Product, RecipientTag } from '../types';

type ShopPageProps = {
  products: Product[];
};

const ITEMS_PER_PAGE = 9;

/**
 * Match a product against a free-text query. Every whitespace-separated term
 * must appear somewhere in the product's searchable text, so "flower necklace"
 * narrows rather than widens.
 */
const matchesSearch = (product: Product, query: string) => {
  const haystack = [product.name, product.category, product.subcategory, product.description]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return query
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

const ShopPage = ({ products }: ShopPageProps) => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ShopFilters>({});
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const querySearch = searchParams.get('search')?.toLowerCase().trim() ?? '';
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

      if (querySearch && !matchesSearch(product, querySearch)) {
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

  // Describe what the visitor is currently looking at.
  const heading = querySearch
    ? `Results for “${searchParams.get('search')}”`
    : querySubcategory ?? queryCategory ?? (queryNewOnly ? 'New Arrivals' : 'Shop All');
  const isNarrowed = Boolean(querySearch || querySubcategory || queryCategory || queryNewOnly || queryGiftOnly);

  return (
    <section>
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-warmGold">Collection</p>
          <h1 className="mt-2 font-heading text-4xl text-charcoal md:text-5xl">{heading}</h1>
          <p className="mt-2 text-softBrown">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'} handmade with real preserved
            flowers.
            {isNarrowed ? (
              <>
                {' '}
                <Link to="/shop" className="underline transition-colors hover:text-warmGold">
                  View all
                </Link>
              </>
            ) : null}
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FiltersSidebar products={products} filters={filters} onChange={setFilters} />
        <div>
          {paginatedProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Pieces Found"
              description={
                querySearch
                  ? `Nothing matched “${searchParams.get('search')}”. Try a different word, or browse the full collection.`
                  : 'Try adjusting your filters to discover more handmade pieces.'
              }
              action={
                <Link
                  to="/shop"
                  className="rounded-full bg-warmGold px-6 py-3 text-sm font-bold text-charcoal transition-colors hover:bg-deepGold"
                >
                  Browse Collection
                </Link>
              }
            />
          )}

          <Pagination currentPage={page} pageCount={pageCount} onPageChange={setPage} />
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
