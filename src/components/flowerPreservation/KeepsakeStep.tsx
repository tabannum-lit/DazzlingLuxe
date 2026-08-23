import { KeepsakeOption } from './types';
import { KEEPSAKE_OPTIONS } from './config';
import { formatCurrency } from '../../utils/currency';

export type KeepsakeStepProps = {
  selected: KeepsakeOption | null;
  onSelect: (option: KeepsakeOption) => void;
  onBack: () => void;
};

const KeepsakeStep = ({ selected, onSelect, onBack }: KeepsakeStepProps) => {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 2 of 5</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Choose Your Keepsake</h1>
        <p className="mt-4 text-softBrown max-w-lg mx-auto">
          Send your flowers to dry and make a piece to hold on to it forever.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {KEEPSAKE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option)}
            className={`text-left rounded-2xl border p-6 transition-all hover:border-warmGold hover:shadow-lg ${
              selected?.id === option.id ? 'border-warmGold shadow-lg bg-warmGold/5' : 'border-beige bg-white'
            }`}
          >
            <h3 className="font-heading text-2xl text-charcoal">{option.label}</h3>
            <p className="mt-2 text-sm text-softBrown">{option.description}</p>
            <p className="mt-4 text-lg font-bold text-warmGold">{formatCurrency(option.price)}</p>
          </button>
        ))}
      </div>

      <button type="button" onClick={onBack} className="mt-8 text-sm font-semibold text-softBrown hover:text-charcoal">
        ← Back
      </button>
    </section>
  );
};

export default KeepsakeStep;
