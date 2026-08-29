import { useEffect, useState } from 'react';
import { InvoiceData } from './types';
import { SOCIAL_LINKS_PLACEHOLDER } from './config';
import { formatCurrency } from '../../utils/currency';
import Icon from '../shared/Icon';

export type InvoiceStepProps = {
  invoice: InvoiceData;
  pdfBlob: Blob;
  onStartOver: () => void;
};

const InvoiceStep = ({ invoice, pdfBlob, onStartOver }: InvoiceStepProps) => {
  const fileName = `dazzling-luxe-invoice-${invoice.invoiceNumber}.pdf`;

  const [canNativeShare] = useState(() => {
    const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
    return typeof navigator.share === 'function' && typeof nav.canShare === 'function';
  });

  // Create and revoke the object URL inside the same effect run (rather than
  // useMemo + a separate cleanup) so React StrictMode's dev-mode double
  // mount/cleanup/remount always revokes the URL IT created, never the one
  // currently rendered — otherwise the double-invoke revokes the only URL
  // in existence and the download link silently points at a dead blob.
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  useEffect(() => {
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pdfBlob]);

  const handleShare = async () => {
    const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
    const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
    if (nav.canShare && nav.canShare({ files: [file] }) && navigator.share) {
      try {
        await navigator.share({ files: [file], title: 'Dazzling Luxe Invoice' });
        return;
      } catch {
        // User cancelled or share failed — fall through to social links below.
      }
    }
  };

  return (
    <section className="max-w-xl mx-auto text-center">
      <Icon name="flower" className="mx-auto mb-6 h-14 w-14 text-goldInk" />
      <p className="text-goldInk uppercase tracking-[0.2em] text-sm font-bold">Step 5 of 5</p>
      <h1 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">Your Invoice Is Ready</h1>

      <div className="mt-8 rounded-2xl border border-beige bg-white p-6 text-left space-y-2">
        <p className="text-sm text-softBrown">Invoice #: <span className="font-bold text-charcoal">{invoice.invoiceNumber}</span></p>
        <p className="text-sm text-softBrown">Keepsake: <span className="font-bold text-charcoal">{invoice.keepsake.label}</span></p>
        <p className="text-sm text-softBrown">Total: <span className="font-bold text-charcoal">{formatCurrency(invoice.total)}</span></p>
        <p className="text-sm text-softBrown">Verification code: <span className="font-mono font-bold text-charcoal">{invoice.verificationCode}</span></p>
      </div>

      <a
        href={pdfUrl ?? undefined}
        download={fileName}
        className="mt-8 inline-block w-full py-4 rounded-full bg-warmGold text-charcoal font-bold uppercase tracking-wider transition-all hover:bg-deepGold hover:shadow-lg"
      >
        Download Invoice
      </a>

      {canNativeShare ? (
        <button
          type="button"
          onClick={handleShare}
          className="mt-4 w-full py-3 rounded-full border border-warmGold text-goldInk font-bold uppercase tracking-wider transition-all hover:bg-warmGold/10"
        >
          Share Invoice
        </button>
      ) : null}

      <p className="mt-8 text-sm text-softBrown">
        Please download the invoice above and send it to us on one of our socials so we can confirm your order:
      </p>
      <div className="mt-4 flex justify-center gap-4">
        <a href={SOCIAL_LINKS_PLACEHOLDER.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-beige px-5 py-2 text-sm font-bold text-charcoal hover:border-warmGold hover:text-goldInk">
          Instagram
        </a>
        <a href={SOCIAL_LINKS_PLACEHOLDER.facebook} target="_blank" rel="noreferrer" className="rounded-full border border-beige px-5 py-2 text-sm font-bold text-charcoal hover:border-warmGold hover:text-goldInk">
          Facebook
        </a>
        <a href={SOCIAL_LINKS_PLACEHOLDER.tiktok} target="_blank" rel="noreferrer" className="rounded-full border border-beige px-5 py-2 text-sm font-bold text-charcoal hover:border-warmGold hover:text-goldInk">
          TikTok
        </a>
      </div>

      <button type="button" onClick={onStartOver} className="mt-10 text-sm font-semibold text-softBrown hover:text-charcoal">
        Start a new request
      </button>
    </section>
  );
};

export default InvoiceStep;
