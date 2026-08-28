import { jsPDF } from 'jspdf';
import { ConsentChoice, CustomerDetails, InvoiceData, KeepsakeOption } from '../components/flowerPreservation/types';
import { CONSENT_TEXT, RETURN_FEE_PLACEHOLDER } from '../components/flowerPreservation/config';
import { formatCurrency } from './currency';

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
    buildVerificationPayload({ invoiceNumber, email: customer.email || customer.phone, total, keepsakeId: keepsake.id })
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

const COLORS = {
  cream: [255, 248, 240] as [number, number, number],
  warmGold: [196, 225, 197] as [number, number, number],
  charcoal: [44, 44, 44] as [number, number, number],
  softBrown: [107, 91, 79] as [number, number, number],
};

// Keeps the consent wording used in the PDF pulled from the same shared
// config the on-screen ConsentModal uses, so the two can never drift apart.
const CONSENT_TEXT_FOR_PDF = (invoice: InvoiceData): string =>
  `${CONSENT_TEXT} (Consent given: ${invoice.consentChoice === 'return' ? 'return unused flowers' : 'Dazzling Luxe may retain unused flowers'}.)`;

export const loadLogoDataUrl = async (): Promise<string> => {
  const response = await fetch('/logo-dazz-transparent.png');
  if (!response.ok) {
    throw new Error(`Logo fetch failed: ${response.status}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const buildInvoicePdfBlob = (invoice: InvoiceData, logoDataUrl: string | null): Blob => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 20;

  // Header band
  doc.setFillColor(...COLORS.cream);
  doc.rect(0, 0, pageWidth, 40, 'F');
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', marginX, 8, 24, 24);
  }
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...COLORS.charcoal);
  doc.text('Dazzling Luxe', marginX + 30, 20);
  doc.setFont('times', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.softBrown);
  doc.text('Flower Preservation Invoice', marginX + 30, 28);
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.8);
  doc.line(marginX, 40, pageWidth - marginX, 40);

  // Invoice meta
  let y = 52;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.softBrown);
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, marginX, y);
  doc.text(`Date: ${new Date(invoice.issuedAt).toLocaleDateString('en-CA')}`, pageWidth - marginX, y, { align: 'right' });

  y += 10;
  doc.setTextColor(...COLORS.charcoal);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To', marginX, y);
  doc.setFont('helvetica', 'normal');
  y += 6;
  doc.text(invoice.customer.name, marginX, y);
  y += 5;
  if (invoice.customer.email) {
    doc.text(invoice.customer.email, marginX, y);
    y += 5;
  }
  if (invoice.customer.phone) {
    doc.text(invoice.customer.phone, marginX, y);
    y += 5;
  }

  if (invoice.customer.flowerType) {
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.charcoal);
    doc.text('Flowers', marginX, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.softBrown);
    y += 5;
    doc.text(invoice.customer.flowerType, marginX, y);
  }

  if (invoice.customer.message) {
    y += 8;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.charcoal);
    doc.text('Story', marginX, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.softBrown);
    y += 5;
    const messageLines = doc.splitTextToSize(invoice.customer.message, pageWidth - marginX * 2);
    doc.text(messageLines, marginX, y);
    y += messageLines.length * 5;
  }

  // Line items table
  y += 8;
  const tableTop = y;
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.3);
  doc.line(marginX, tableTop, pageWidth - marginX, tableTop);
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Item', marginX, y);
  doc.text('Price', pageWidth - marginX, y, { align: 'right' });
  y += 3;
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.keepsake.label, marginX, y);
  doc.text(formatCurrency(invoice.keepsake.price), pageWidth - marginX, y, { align: 'right' });

  if (invoice.returnFee > 0) {
    y += 7;
    doc.text('Flower return / handling fee', marginX, y);
    doc.text(formatCurrency(invoice.returnFee), pageWidth - marginX, y, { align: 'right' });
  }

  y += 5;
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Total', marginX, y);
  doc.text(formatCurrency(invoice.total), pageWidth - marginX, y, { align: 'right' });
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.6);
  doc.line(pageWidth - marginX - 40, y + 2, pageWidth - marginX, y + 2);

  // Consent callout
  y += 14;
  doc.setDrawColor(...COLORS.warmGold);
  doc.setFillColor(...COLORS.cream);
  const consentLines = doc.splitTextToSize(CONSENT_TEXT_FOR_PDF(invoice), pageWidth - marginX * 2 - 8);
  const boxHeight = consentLines.length * 5 + 10;
  doc.roundedRect(marginX, y, pageWidth - marginX * 2, boxHeight, 2, 2, 'FD');
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.softBrown);
  doc.text(consentLines, marginX + 4, y + 7);
  y += boxHeight + 12;

  // Footer
  doc.setDrawColor(...COLORS.warmGold);
  doc.setLineWidth(0.4);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 6;
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.softBrown);
  doc.text(`Verification code: ${invoice.verificationCode}`, marginX, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...COLORS.softBrown);
  const disclaimerLines = doc.splitTextToSize(
    'Prices shown do not include applicable taxes. This is an order summary, not a receipt of payment — we will confirm payment details with you directly.',
    pageWidth - marginX * 2
  );
  doc.text(disclaimerLines, marginX, y);
  y += disclaimerLines.length * 4 + 6;

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.charcoal);
  doc.text('Thank you for trusting us with your flowers.', marginX, y);

  return doc.output('blob');
};
