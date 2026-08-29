type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-products" className="text-sm font-bold uppercase tracking-[0.08em] text-softBrown">
        Sort
      </label>
      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="cursor-pointer rounded-full border border-beige bg-white px-4 py-2.5 text-sm text-charcoal outline-none focus:border-warmGold"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
};

export default SortDropdown;
