import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReviewStep from './ReviewStep';
import { KEEPSAKE_OPTIONS } from './config';

const details = { name: 'Jane Doe', email: 'jane@example.com', phone: '', flowerType: 'Roses', message: '' };

test('shows the line items and total, and confirms on click', async () => {
  const onConfirm = jest.fn();
  render(
    <ReviewStep
      details={details}
      keepsake={KEEPSAKE_OPTIONS[0]}
      consentChoice="return"
      returnFee={25}
      total={105}
      onConfirm={onConfirm}
      onBack={jest.fn()}
      generating={false}
      error={null}
    />
  );

  expect(screen.getByText(/coaster/i)).toBeInTheDocument();
  expect(screen.getByText('$105.00')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /generate invoice/i }));
  expect(onConfirm).toHaveBeenCalled();
});

test('shows an error message and keeps the confirm button enabled to retry', () => {
  render(
    <ReviewStep
      details={details}
      keepsake={KEEPSAKE_OPTIONS[0]}
      consentChoice="retain"
      returnFee={0}
      total={80}
      onConfirm={jest.fn()}
      onBack={jest.fn()}
      generating={false}
      error="Could not generate the invoice. Please try again."
    />
  );

  expect(screen.getByText(/could not generate the invoice/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /generate invoice/i })).not.toBeDisabled();
});
