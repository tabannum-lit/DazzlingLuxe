// src/components/flowerPreservation/SendYourFlowersWizard.tsx
import { useState } from 'react';
import DetailsStep from './DetailsStep';
import KeepsakeStep from './KeepsakeStep';
import ConsentModal from './ConsentModal';
import ReviewStep from './ReviewStep';
import InvoiceStep from './InvoiceStep';
import { ConsentChoice, CustomerDetails, InvoiceData, KeepsakeOption, WizardStep } from './types';
import { buildInvoiceData, buildInvoicePdfBlob, calculateReturnFee, calculateTotal, loadLogoDataUrl } from '../../utils/invoiceGenerator';

const EMPTY_DETAILS: CustomerDetails = { name: '', email: '', phone: '', flowerType: '', message: '' };

const SendYourFlowersWizard = () => {
  const [step, setStep] = useState<WizardStep>('details');
  const [details, setDetails] = useState<CustomerDetails>(EMPTY_DETAILS);
  const [keepsake, setKeepsake] = useState<KeepsakeOption | null>(null);
  const [consentChoice, setConsentChoice] = useState<ConsentChoice | null>(null);
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInvoice = async () => {
    if (!keepsake || !consentChoice) {
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const [invoiceData, logoDataUrl] = await Promise.all([
        buildInvoiceData({ customer: details, keepsake, consentChoice, issuedAt: new Date() }),
        loadLogoDataUrl(),
      ]);
      const blob = buildInvoicePdfBlob(invoiceData, logoDataUrl);
      setInvoice(invoiceData);
      setPdfBlob(blob);
      setStep('invoice');
    } catch {
      setError('Could not generate the invoice. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleStartOver = () => {
    setStep('details');
    setDetails(EMPTY_DETAILS);
    setKeepsake(null);
    setConsentChoice(null);
    setInvoice(null);
    setPdfBlob(null);
    setError(null);
  };

  if (step === 'details') {
    return (
      <DetailsStep
        details={details}
        onSubmit={(submitted) => {
          setDetails(submitted);
          setStep('keepsake');
        }}
      />
    );
  }

  if (step === 'keepsake') {
    return (
      <KeepsakeStep
        selected={keepsake}
        onSelect={(option) => {
          setKeepsake(option);
          setStep('consent');
        }}
        onBack={() => setStep('details')}
      />
    );
  }

  if (step === 'consent' && keepsake) {
    return (
      <ConsentModal
        keepsake={keepsake}
        onChoose={(choice) => {
          setConsentChoice(choice);
          setStep('review');
        }}
        onBack={() => setStep('keepsake')}
      />
    );
  }

  if (step === 'review' && keepsake && consentChoice) {
    const returnFee = calculateReturnFee(consentChoice);
    return (
      <ReviewStep
        details={details}
        keepsake={keepsake}
        consentChoice={consentChoice}
        returnFee={returnFee}
        total={calculateTotal(keepsake.price, returnFee)}
        onConfirm={handleGenerateInvoice}
        onBack={() => setStep('consent')}
        generating={generating}
        error={error}
      />
    );
  }

  if (step === 'invoice' && invoice && pdfBlob) {
    return <InvoiceStep invoice={invoice} pdfBlob={pdfBlob} onStartOver={handleStartOver} />;
  }

  return null;
};

export default SendYourFlowersWizard;
