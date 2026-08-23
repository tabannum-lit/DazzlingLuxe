import { ConsentChoice, KeepsakeOption } from './types';
import { CONSENT_TEXT, RETURN_FEE_PLACEHOLDER } from './config';
import { formatCurrency } from '../../utils/currency';

export type ConsentModalProps = {
  keepsake: KeepsakeOption;
  onChoose: (choice: ConsentChoice) => void;
  onBack: () => void;
};

const ConsentModal = ({ keepsake, onChoose, onBack }: ConsentModalProps) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true" aria-label="Flower drying consent">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 3 of 5</p>
        <h2 className="font-heading text-3xl text-charcoal mt-2">Flower Drying Consent</h2>
        <p className="mt-4 text-sm text-softBrown leading-relaxed">{CONSENT_TEXT}</p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => onChoose('retain')}
            className="w-full text-left rounded-xl border border-beige p-4 transition-colors hover:border-warmGold"
          >
            <span className="block font-bold text-charcoal">Dazzling Luxe may keep unused flowers</span>
            <span className="block text-sm text-softBrown mt-1">No additional charge.</span>
          </button>
          <button
            type="button"
            onClick={() => onChoose('return')}
            className="w-full text-left rounded-xl border border-beige p-4 transition-colors hover:border-warmGold"
          >
            <span className="block font-bold text-charcoal">Return my unused flowers</span>
            <span className="block text-sm text-softBrown mt-1">
              Additional handling fee: {formatCurrency(RETURN_FEE_PLACEHOLDER)}
            </span>
          </button>
        </div>

        <p className="mt-4 text-xs text-softBrown">Keepsake selected: {keepsake.label}</p>

        <button type="button" onClick={onBack} className="mt-6 text-sm font-semibold text-softBrown hover:text-charcoal">
          ← Back to keepsake selection
        </button>
      </div>
    </div>
  );
};

export default ConsentModal;
