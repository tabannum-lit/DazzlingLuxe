import { FormEvent, useState } from 'react';

type HintModalProps = {
  open: boolean;
  onClose: () => void;
  productName: string;
};

const HintModal = ({ open, onClose, productName }: HintModalProps) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  if (!open) {
    return null;
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[var(--z-index-modal)] flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true" aria-label="Send a hint">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="font-heading text-3xl text-gray-800">Send a Hint</h3>
        <p className="mt-3 text-sm text-gray-600">Share {productName} with someone special.</p>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-gray-700" htmlFor="hint-email">
            Recipient Email
          </label>
          <input
            id="hint-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-pink-200 px-4 py-2.5 outline-none focus:border-pink-500"
            placeholder="name@example.com"
          />
          <button className="w-full rounded-full bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600" type="submit">
            Send Hint
          </button>
        </form>
        {sent ? <p className="mt-3 text-sm text-emerald-600">Hint sent successfully (mock).</p> : null}
        <button onClick={onClose} className="mt-4 text-sm font-semibold text-gray-500 transition hover:text-gray-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default HintModal;
