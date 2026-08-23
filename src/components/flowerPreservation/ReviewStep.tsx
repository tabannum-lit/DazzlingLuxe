import { ConsentChoice, CustomerDetails, KeepsakeOption } from './types';
import { formatCurrency } from '../../utils/currency';

export type ReviewStepProps = {
  details: CustomerDetails;
  keepsake: KeepsakeOption;
  consentChoice: ConsentChoice;
  returnFee: number;
  total: number;
  onConfirm: () => void;
  onBack: () => void;
  generating: boolean;
  error: string | null;
};

const ReviewStep = ({ details, keepsake, returnFee, total, onConfirm, onBack, generating, error }: ReviewStepProps) => {
  return (
    <section className="max-w-xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Step 4 of 5</p>
        <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Review Your Order</h1>
      </div>

      <div className="rounded-2xl border border-beige bg-white p-6 space-y-4">
        <div className="flex justify-between text-sm text-softBrown">
          <span>Name</span>
          <span className="font-bold text-charcoal">{details.name}</span>
        </div>
        {details.email ? (
          <div className="flex justify-between text-sm text-softBrown">
            <span>Email</span>
            <span className="font-bold text-charcoal">{details.email}</span>
          </div>
        ) : null}
        {details.phone ? (
          <div className="flex justify-between text-sm text-softBrown">
            <span>Phone</span>
            <span className="font-bold text-charcoal">{details.phone}</span>
          </div>
        ) : null}
        {details.flowerType ? (
          <div className="flex justify-between text-sm text-softBrown">
            <span>Flowers</span>
            <span className="font-bold text-charcoal">{details.flowerType}</span>
          </div>
        ) : null}
        {details.message ? (
          <div className="text-sm text-softBrown">
            <span className="block font-bold text-charcoal mb-1">Your Story</span>
            <p>{details.message}</p>
          </div>
        ) : null}
        <div className="flex justify-between text-sm text-softBrown">
          <span>{keepsake.label}</span>
          <span className="font-bold text-charcoal">{formatCurrency(keepsake.price)}</span>
        </div>
        {returnFee > 0 ? (
          <div className="flex justify-between text-sm text-softBrown">
            <span>Flower return / handling fee</span>
            <span className="font-bold text-charcoal">{formatCurrency(returnFee)}</span>
          </div>
        ) : (
          <div className="flex justify-between text-sm text-softBrown">
            <span>Unused flowers</span>
            <span className="font-bold text-charcoal">Retained by Dazzling Luxe</span>
          </div>
        )}
        <div className="border-t border-beige pt-4 flex justify-between text-lg">
          <span className="font-bold text-charcoal">Total</span>
          <span className="font-bold text-warmGold">{formatCurrency(total)}</span>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={generating}
          className="w-full py-4 rounded-full bg-warmGold text-white font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg disabled:opacity-60"
        >
          {generating ? 'Generating…' : 'Generate Invoice'}
        </button>
        <button type="button" onClick={onBack} className="text-sm font-semibold text-softBrown hover:text-charcoal">
          ← Back
        </button>
      </div>
    </section>
  );
};

export default ReviewStep;
