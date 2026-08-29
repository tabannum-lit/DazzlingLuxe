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

const PRICE_BANDS = [
  { label: 'Under $50', minPrice: undefined, maxPrice: 50 },
  { label: '$50 – $100', minPrice: 50, maxPrice: 100 },
  { label: '$100+', minPrice: 100, maxPrice: undefined },
];

const groupHeadingClass = 'text-sm font-bold uppercase tracking-[0.08em] text-softBrown';
const chipClass = (active: boolean) =>
  `rounded-full border px-4 py-2 text-sm transition-colors ${
    active ? 'border-warmGold bg-warmGold/15 font-bold text-charcoal' : 'border-beige text-charcoal hover:border-warmGold'
  }`;

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

  const hasActiveFilter = Object.values(filters).some((value) => value !== undefined);

  return (
    <aside
      className="space-y-6 rounded-2xl border border-beige/40 bg-white p-5 lg:sticky lg:top-28 lg:h-fit"
      aria-label="Product filters"
    >
      <h2 className="font-heading text-2xl text-charcoal">Filters</h2>

      <div>
        <h3 className={groupHeadingClass}>Price</h3>
        <div className="mt-3 grid gap-2">
          {PRICE_BANDS.map((band) => {
            const active = filters.minPrice === band.minPrice && filters.maxPrice === band.maxPrice;
            return (
              <button
                key={band.label}
                className={`${chipClass(active)} text-left`}
                aria-pressed={active}
                onClick={() =>
                  onChange({
                    ...filters,
                    minPrice: active ? undefined : band.minPrice,
                    maxPrice: active ? undefined : band.maxPrice,
                  })
                }
              >
                {band.label}
              </button>
            );
          })}
        </div>
      </div>

      {materials.length > 0 ? (
        <div>
          <h3 className={groupHeadingClass}>Material</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {materials.map((material) => (
              <button
                key={material}
                className={chipClass(filters.material === material)}
                aria-pressed={filters.material === material}
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
          <h3 className={groupHeadingClass}>Size</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={chipClass(filters.size === size)}
                aria-pressed={filters.size === size}
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
          <h3 className={groupHeadingClass}>Color</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                className={chipClass(filters.color === color)}
                aria-pressed={filters.color === color}
                onClick={() => onChange({ ...filters, color: filters.color === color ? undefined : color })}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {hasActiveFilter ? (
        <button
          className="w-full rounded-full border border-beige px-4 py-2.5 text-sm font-bold text-charcoal transition-colors hover:border-warmGold"
          onClick={() => onChange({})}
        >
          Clear Filters
        </button>
      ) : null}
    </aside>
  );
};

export default FiltersSidebar;
