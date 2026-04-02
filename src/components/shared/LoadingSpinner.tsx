const LoadingSpinner = ({ label = 'Loading...' }: { label?: string }) => (
  <div className="flex flex-col items-center justify-center py-20 gap-4" role="status">
    <div className="w-12 h-12 rounded-full border-4 border-beige border-t-warmGold animate-spin" />
    <p className="text-softBrown text-sm">{label}</p>
  </div>
);

export default LoadingSpinner;
