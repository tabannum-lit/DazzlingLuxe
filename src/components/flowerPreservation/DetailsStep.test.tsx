import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailsStep from './DetailsStep';

const emptyDetails = { name: '', email: '', phone: '', flowerType: '', message: '' };

test('requires a name and at least one contact method before continuing', async () => {
  const onSubmit = jest.fn();
  render(<DetailsStep details={emptyDetails} onSubmit={onSubmit} />);

  await userEvent.click(screen.getByRole('button', { name: /continue/i }));
  expect(onSubmit).not.toHaveBeenCalled();

  await userEvent.type(screen.getByLabelText(/full name/i), 'Jane Doe');
  await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
  await userEvent.click(screen.getByRole('button', { name: /continue/i }));

  expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jane Doe', email: 'jane@example.com' }));
});
