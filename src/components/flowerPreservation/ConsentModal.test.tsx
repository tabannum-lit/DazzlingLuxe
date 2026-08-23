import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConsentModal from './ConsentModal';
import { KEEPSAKE_OPTIONS, RETURN_FEE_PLACEHOLDER } from './config';
import { formatCurrency } from '../../utils/currency';

test('shows the consent text and the return fee, and reports the chosen consent option', async () => {
  const onChoose = jest.fn();
  const keepsake = KEEPSAKE_OPTIONS[0];
  render(<ConsentModal keepsake={keepsake} onChoose={onChoose} onBack={jest.fn()} />);

  expect(screen.getByText(/dazzling luxe may retain and reuse excess prepared flowers/i)).toBeInTheDocument();
  expect(screen.getByText(new RegExp(formatCurrency(RETURN_FEE_PLACEHOLDER).replace('$', '\\$')))).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /return my unused flowers/i }));
  expect(onChoose).toHaveBeenCalledWith('return');
});
