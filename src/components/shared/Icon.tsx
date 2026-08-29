import { ReactElement } from 'react';

/**
 * The site's single icon language: 24x24, stroked in `currentColor`, so every
 * glyph takes the palette from its container. This replaces the colour emoji
 * that used to sit in headings and empty states — those render in each
 * platform's own pinks, blues and greens and fight the cream-and-gold theme.
 */
export type IconName =
  | 'flower'
  | 'sparkle'
  | 'gift'
  | 'leaf'
  | 'heart'
  | 'hand'
  | 'envelope'
  | 'phone'
  | 'pin';

const PATHS: Record<IconName, ReactElement> = {
  flower: (
    <>
      <circle cx="12" cy="6.2" r="2.9" />
      <circle cx="16.57" cy="9.52" r="2.9" />
      <circle cx="14.82" cy="14.88" r="2.9" />
      <circle cx="9.18" cy="14.88" r="2.9" />
      <circle cx="7.43" cy="9.52" r="2.9" />
      <circle cx="12" cy="10.5" r="1.9" />
      <path d="M12 17.5V22" />
    </>
  ),
  sparkle: (
    <>
      <path d="M11 2.5 12.7 8.3 18.5 10 12.7 11.7 11 17.5 9.3 11.7 3.5 10 9.3 8.3 11 2.5Z" />
      <path d="M18 15.5 18.8 18.2 21.5 19 18.8 19.8 18 22.5 17.2 19.8 14.5 19 17.2 18.2 18 15.5Z" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="10.5" width="17" height="10" rx="1.6" />
      <rect x="2.5" y="6.8" width="19" height="3.7" rx="1.2" />
      <path d="M12 6.8V20.5" />
      <path d="M12 6.8C10.4 3.6 6 3.3 6 5.6c0 1.6 3 1.2 6 1.2Z" />
      <path d="M12 6.8C13.6 3.6 18 3.3 18 5.6c0 1.6-3 1.2-6 1.2Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c-1-8 4.5-15.2 15.5-15.5C21 15 14.5 20.5 6.5 20" />
      <path d="M4 20C7.5 14.5 12 10.5 17.5 7.8" />
    </>
  ),
  heart: (
    <path d="M12 20.4S4.5 15.6 4.5 10.4A4.4 4.4 0 0 1 12 7.5a4.4 4.4 0 0 1 7.5 2.9c0 5.2-7.5 10-7.5 10Z" />
  ),
  hand: (
    <>
      <path d="M9.1 11.8V4.9a1.45 1.45 0 0 1 2.9 0v6.3" />
      <path d="M12 11.2V3.9a1.45 1.45 0 0 1 2.9 0v7.3" />
      <path d="M14.9 11.6V6.2a1.45 1.45 0 0 1 2.9 0v8.1" />
      <path d="M9.1 12.2V9.7a1.45 1.45 0 0 0-2.9 0v5c0 3.5 2.5 6.4 6.1 6.4h1.6c3.2 0 5.9-2.3 5.9-5.6" />
    </>
  ),
  envelope: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m3.8 7.2 8.2 5.9 8.2-5.9" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.6 18.4h2.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.2s6.9-6.3 6.9-11a6.9 6.9 0 1 0-13.8 0c0 4.7 6.9 11 6.9 11Z" />
      <circle cx="12" cy="10.1" r="2.6" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  className?: string;
  /** Set when the icon carries meaning on its own rather than labelling nearby text. */
  title?: string;
};

const Icon = ({ name, className = 'h-5 w-5', title }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    role={title ? 'img' : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    focusable="false"
  >
    {PATHS[name]}
  </svg>
);

export default Icon;
