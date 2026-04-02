type SortDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-products" className="text-sm font-semibold uppercase tracking-[0.08em] text-gray-500">
        Sort
      </label>
      <select
        id="sort-products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-pink-500"
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
};

export default SortDropdown;
