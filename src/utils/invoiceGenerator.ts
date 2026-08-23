import { ConsentChoice, CustomerDetails, InvoiceData, KeepsakeOption } from '../components/flowerPreservation/types';
import { RETURN_FEE_PLACEHOLDER } from '../components/flowerPreservation/config';

export const calculateReturnFee = (consentChoice: ConsentChoice): number =>
  consentChoice === 'return' ? RETURN_FEE_PLACEHOLDER : 0;

export const calculateTotal = (keepsakePrice: number, returnFee: number): number =>
  keepsakePrice + returnFee;

const pad = (value: number, length: number): string => String(value).padStart(length, '0');

export const generateInvoiceNumber = (issuedAt: Date): string => {
  const datePart = `${issuedAt.getUTCFullYear()}${pad(issuedAt.getUTCMonth() + 1, 2)}${pad(issuedAt.getUTCDate(), 2)}`;
  const suffix = pad(Math.floor(Math.random() * 10000), 4);
  return `DL-${datePart}-${suffix}`;
};

export const buildVerificationPayload = (params: {
  invoiceNumber: string;
  email: string;
  total: number;
  keepsakeId: string;
}): string => `${params.invoiceNumber}|${params.email}|${params.total}|${params.keepsakeId}`;

export const computeVerificationCode = async (payload: string): Promise<string> => {
  const encoded = new TextEncoder().encode(payload);
  const digest = await crypto.subtle.digest('SHA-256', encoded);
  const hex = Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hex.slice(0, 8).toUpperCase();
};

export const buildInvoiceData = async (params: {
  customer: CustomerDetails;
  keepsake: KeepsakeOption;
  consentChoice: ConsentChoice;
  issuedAt: Date;
}): Promise<InvoiceData> => {
  const { customer, keepsake, consentChoice, issuedAt } = params;
  const returnFee = calculateReturnFee(consentChoice);
  const total = calculateTotal(keepsake.price, returnFee);
  const invoiceNumber = generateInvoiceNumber(issuedAt);
  const verificationCode = await computeVerificationCode(
    buildVerificationPayload({ invoiceNumber, email: customer.email, total, keepsakeId: keepsake.id })
  );

  return {
    invoiceNumber,
    issuedAt: issuedAt.toISOString(),
    customer,
    keepsake,
    consentChoice,
    returnFee,
    total,
    verificationCode,
  };
};
