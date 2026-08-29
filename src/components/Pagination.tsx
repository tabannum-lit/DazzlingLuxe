type PaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        className="min-h-[44px] rounded-full border border-beige px-5 py-2 text-sm text-charcoal transition-colors hover:border-warmGold disabled:opacity-40 disabled:hover:border-beige"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`h-11 w-11 rounded-full border text-sm transition-colors ${
            page === currentPage
              ? 'border-warmGold bg-warmGold font-bold text-charcoal'
              : 'border-beige text-charcoal hover:border-warmGold'
          }`}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className="min-h-[44px] rounded-full border border-beige px-5 py-2 text-sm text-charcoal transition-colors hover:border-warmGold disabled:opacity-40 disabled:hover:border-beige"
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
