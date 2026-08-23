import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KeepsakeStep from './KeepsakeStep';
import { KEEPSAKE_OPTIONS } from './config';

test('lists every keepsake option with its price and selects one on click', async () => {
  const onSelect = jest.fn();
  render(<KeepsakeStep selected={null} onSelect={onSelect} onBack={jest.fn()} />);

  KEEPSAKE_OPTIONS.forEach((option) => {
    expect(screen.getByText(option.label)).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText('Shadow Box'));
  expect(onSelect).toHaveBeenCalledWith(KEEPSAKE_OPTIONS.find((o) => o.id === 'shadow-box'));
});
