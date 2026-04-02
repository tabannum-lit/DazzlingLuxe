import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'swiper/react',
  () => ({
    Swiper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  }),
  { virtual: true }
);

jest.mock(
  'swiper/modules',
  () => ({
    Autoplay: {},
    Navigation: {},
    Pagination: {},
  }),
  { virtual: true }
);

test('renders Aethelgard Blooms branding', () => {
  render(<App />);
  const brand = screen.getByRole('link', { name: /Aethelgard Blooms home/i });
  expect(brand).toBeInTheDocument();
});
