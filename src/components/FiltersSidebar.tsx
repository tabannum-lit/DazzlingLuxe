import { Product } from '../types';

export type ShopFilters = {
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  size?: string;
  color?: string;
};

type FiltersSidebarProps = {
  products: Product[];
  filters: ShopFilters;
  onChange: (next: ShopFilters) => void;
};

const FiltersSidebar = ({ products, filters, onChange }: FiltersSidebarProps) => {
  const materials = Array.from(
    new Set(products.flatMap((product) => (product.material ? [product.material] : [])))
  );
  const sizes = Array.from(
    new Set(products.flatMap((product) => (product.size ? [product.size] : [])))
  );
  const colors = Array.from(
    new Set(products.flatMap((product) => (product.color ? [product.color] : [])))
  );

  return (
    <aside className="space-y-6 rounded-2xl border border-pink-100 bg-white p-5 shadow-sm lg:sticky lg:top-28 lg:h-fit">
      <div>
        <h2 className="font-heading text-2xl text-gray-800">Filters</h2>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-500">Price</h3>
        <div className="mt-3 grid gap-2">
          <button
            className={`rounded-full border px-3 py-2 text-sm text-left ${
              filters.maxPrice === 50 ? 'border-pink-500 text-pink-600' : 'border-pink-200 text-gray-700'
            }`}
            onClick={() => onChange({ ...filters, minPrice: undefined, maxPrice: filters.maxPrice === 50 ? undefined : 50 })}
          >
            Under $50
          </button>
          <button
            className={`rounded-full border px-3 py-2 text-sm text-left ${
              filters.minPrice === 50 && filters.maxPrice === 100
                ? 'border-pink-500 text-pink-600'
                : 'border-pink-200 text-gray-700'
            }`}
            onClick={() =>
              onChange({
                ...filters,
                minPrice: filters.minPrice === 50 && filters.maxPrice === 100 ? undefined : 50,
                maxPrice: filters.minPrice === 50 && filters.maxPrice === 100 ? undefined : 100,
              })
            }
          >
            $50 - $100
          </button>
          <button
            className={`rounded-full border px-3 py-2 text-sm text-left ${
              filters.minPrice === 100 ? 'border-pink-500 text-pink-600' : 'border-pink-200 text-gray-700'
            }`}
            onClick={() =>
              onChange({
                ...filters,
                minPrice: filters.minPrice === 100 ? undefined : 100,
                maxPrice: filters.minPrice === 100 ? undefined : undefined,
              })
            }
          >
            $100+
          </button>
        </div>
      </div>

      {materials.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-500">Material</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {materials.map((material) => (
              <button
                key={material}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  filters.material === material ? 'border-pink-500 text-pink-600' : 'border-pink-200 text-gray-700'
                }`}
                onClick={() => onChange({ ...filters, material: filters.material === material ? undefined : material })}
              >
                {material}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {sizes.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-500">Size</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  filters.size === size ? 'border-pink-500 text-pink-600' : 'border-pink-200 text-gray-700'
                }`}
                onClick={() => onChange({ ...filters, size: filters.size === size ? undefined : size })}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {colors.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-500">Color</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  filters.color === color ? 'border-pink-500 text-pink-600' : 'border-pink-200 text-gray-700'
                }`}
                onClick={() => onChange({ ...filters, color: filters.color === color ? undefined : color })}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <button
        className="w-full rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-pink-500 hover:text-pink-600"
        onClick={() => onChange({})}
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default FiltersSidebar;
