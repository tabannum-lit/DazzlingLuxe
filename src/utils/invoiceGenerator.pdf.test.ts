import { buildInvoicePdfBlob } from './invoiceGenerator';
import { InvoiceData } from '../components/flowerPreservation/types';

const TINY_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

const invoice: InvoiceData = {
  invoiceNumber: 'DL-20260823-0001',
  issuedAt: '2026-08-23T12:00:00.000Z',
  customer: { name: 'Jane Doe', email: 'jane@example.com', phone: '', flowerType: 'Roses', message: '' },
  keepsake: { id: 'coaster', label: 'Coaster', price: 80, description: 'test' },
  consentChoice: 'return',
  returnFee: 25,
  total: 105,
  verificationCode: 'ABCD1234',
};

test('builds a non-empty application/pdf blob', () => {
  const blob = buildInvoicePdfBlob(invoice, TINY_PNG);
  expect(blob).toBeInstanceOf(Blob);
  expect(blob.type).toBe('application/pdf');
  expect(blob.size).toBeGreaterThan(0);
});
