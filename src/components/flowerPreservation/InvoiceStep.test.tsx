import { render, screen } from '@testing-library/react';
import InvoiceStep from './InvoiceStep';
import { InvoiceData } from './types';

const invoice: InvoiceData = {
  invoiceNumber: 'DL-20260823-0001',
  issuedAt: '2026-08-23T12:00:00.000Z',
  customer: { name: 'Jane Doe', email: 'jane@example.com', phone: '', flowerType: 'Roses', message: '' },
  keepsake: { id: 'coaster', label: 'Coaster', price: 80, description: 'test' },
  consentChoice: 'retain',
  returnFee: 0,
  total: 80,
  verificationCode: 'ABCD1234',
};

test('shows the invoice summary and a download link plus social buttons', () => {
  const pdfBlob = new Blob(['%PDF-1.4'], { type: 'application/pdf' });
  render(<InvoiceStep invoice={invoice} pdfBlob={pdfBlob} onStartOver={jest.fn()} />);

  expect(screen.getByText(/DL-20260823-0001/)).toBeInTheDocument();
  expect(screen.getByText(/ABCD1234/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /download invoice/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /tiktok/i })).toBeInTheDocument();
});
