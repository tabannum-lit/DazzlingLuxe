import {
  calculateReturnFee,
  calculateTotal,
  generateInvoiceNumber,
  buildVerificationPayload,
  computeVerificationCode,
  buildInvoiceData,
} from './invoiceGenerator';
import { RETURN_FEE_PLACEHOLDER } from '../components/flowerPreservation/config';
import { KeepsakeOption, CustomerDetails } from '../components/flowerPreservation/types';

describe('calculateReturnFee', () => {
  it('returns the placeholder fee when the customer wants flowers returned', () => {
    expect(calculateReturnFee('return')).toBe(RETURN_FEE_PLACEHOLDER);
  });

  it('returns 0 when the customer lets Dazzling Luxe retain unused flowers', () => {
    expect(calculateReturnFee('retain')).toBe(0);
  });
});

describe('calculateTotal', () => {
  it('adds the return fee to the keepsake price', () => {
    expect(calculateTotal(80, 25)).toBe(105);
  });

  it('equals the keepsake price when there is no return fee', () => {
    expect(calculateTotal(180, 0)).toBe(180);
  });
});

describe('generateInvoiceNumber', () => {
  it('formats as DL-YYYYMMDD-XXXX with a 4-digit random suffix', () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const invoiceNumber = generateInvoiceNumber(issuedAt);
    expect(invoiceNumber).toMatch(/^DL-20260823-\d{4}$/);
  });

  it('produces different suffixes across calls', () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const numbers = new Set(Array.from({ length: 20 }, () => generateInvoiceNumber(issuedAt)));
    expect(numbers.size).toBeGreaterThan(1);
  });
});

describe('buildVerificationPayload', () => {
  it('joins the invoice fields with a fixed delimiter', () => {
    const payload = buildVerificationPayload({
      invoiceNumber: 'DL-20260823-0001',
      email: 'customer@example.com',
      total: 105,
      keepsakeId: 'coaster',
    });
    expect(payload).toBe('DL-20260823-0001|customer@example.com|105|coaster');
  });
});

describe('computeVerificationCode', () => {
  it('returns an 8-character uppercase hex code', async () => {
    const code = await computeVerificationCode('DL-20260823-0001|customer@example.com|105|coaster');
    expect(code).toMatch(/^[0-9A-F]{8}$/);
  });

  it('is deterministic for the same payload', async () => {
    const codeA = await computeVerificationCode('same-payload');
    const codeB = await computeVerificationCode('same-payload');
    expect(codeA).toBe(codeB);
  });

  it('changes when the payload changes', async () => {
    const codeA = await computeVerificationCode('payload-a');
    const codeB = await computeVerificationCode('payload-b');
    expect(codeA).not.toBe(codeB);
  });
});

describe('buildInvoiceData', () => {
  const customer: CustomerDetails = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '',
    flowerType: 'Roses',
    message: '',
  };
  const keepsake: KeepsakeOption = {
    id: 'coaster',
    label: 'Coaster',
    price: 80,
    description: 'test',
  };

  it('assembles a complete InvoiceData with the return fee applied', async () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const invoice = await buildInvoiceData({ customer, keepsake, consentChoice: 'return', issuedAt });

    expect(invoice.customer).toBe(customer);
    expect(invoice.keepsake).toBe(keepsake);
    expect(invoice.consentChoice).toBe('return');
    expect(invoice.returnFee).toBe(RETURN_FEE_PLACEHOLDER);
    expect(invoice.total).toBe(80 + RETURN_FEE_PLACEHOLDER);
    expect(invoice.invoiceNumber).toMatch(/^DL-20260823-\d{4}$/);
    expect(invoice.issuedAt).toBe(issuedAt.toISOString());
    expect(invoice.verificationCode).toMatch(/^[0-9A-F]{8}$/);
  });

  it('applies no return fee when the customer lets flowers be retained', async () => {
    const issuedAt = new Date('2026-08-23T12:00:00Z');
    const invoice = await buildInvoiceData({ customer, keepsake, consentChoice: 'retain', issuedAt });

    expect(invoice.returnFee).toBe(0);
    expect(invoice.total).toBe(80);
  });
});
