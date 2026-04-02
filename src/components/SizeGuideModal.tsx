type SizeGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

const SizeGuideModal = ({ open, onClose }: SizeGuideModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[var(--z-index-modal)] flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="font-heading text-3xl text-gray-800">Size Guide</h3>
        <p className="mt-3 text-sm text-gray-600">Bracelets: 16-21 cm | Necklaces: 40-55 cm | Rings: US 5-9</p>
        <p className="mt-2 text-sm text-gray-600">For clay and raisin artisan pieces, choose your closest everyday size.</p>
        <button
          onClick={onClose}
          className="mt-6 rounded-full bg-pink-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SizeGuideModal;
