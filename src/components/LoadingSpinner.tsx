const LoadingSpinner = ({ label = 'Loading products' }: { label?: string }) => {
  return (
    <div className="flex min-h-[220px] items-center justify-center" role="status" aria-live="polite" aria-label={label}>
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-500" />
    </div>
  );
};

export default LoadingSpinner;
