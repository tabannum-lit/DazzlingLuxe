import { ReactElement } from 'react';

type SocialIconProps = {
  name: string;
  className?: string;
};

/**
 * Monochrome brand glyphs for the social links.
 * They inherit `currentColor`, so the palette stays with the caller.
 */
const PATHS: Record<string, ReactElement> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  Facebook: (
    <path d="M14.5 8.5h2.2V5.6h-2.6c-2.3 0-3.7 1.4-3.7 3.8v1.7H8.2v2.9h2.2V21h3v-7h2.3l.4-2.9h-2.7v-1.3c0-.8.3-1.3 1.1-1.3z" />
  ),
  TikTok: (
    <path d="M16.2 3h-2.8v11.7a2.4 2.4 0 11-1.9-2.3V9.5a5.3 5.3 0 104.7 5.2V9.1a6.2 6.2 0 003.3 1V7.3a3.4 3.4 0 01-3.3-3.3V3z" />
  ),
  Pinterest: (
    <path d="M12 3a8.6 8.6 0 00-3.3 16.6 8.3 8.3 0 01.1-2.1l1-4.2a3 3 0 01-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.5 1.1 1.2 0 .8-.5 1.9-.7 3a1.3 1.3 0 001.4 1.6c1.6 0 2.8-1.7 2.8-4.2a3.6 3.6 0 00-3.8-3.7A4 4 0 007.7 12a3.5 3.5 0 00.7 2.1.3.3 0 01.1.3l-.2.8c0 .2-.2.3-.4.2a3.9 3.9 0 01-1.8-3.4c0-2.6 1.9-5 5.5-5a4.9 4.9 0 015.1 4.8c0 3-1.9 5.4-4.5 5.4a2.4 2.4 0 01-2-1l-.6 2a9.6 9.6 0 01-1 2.2A8.6 8.6 0 1012 3z" />
  ),
  Etsy: (
    <path d="M9.3 6.2v4.9h2.4c.9 0 1.4-.1 1.7-1.3l.2-.9h1l-.2 2.9.1 2.9h-1l-.2-.9c-.3-1.1-.8-1.2-1.7-1.2H9.3v4c0 .9.4 1.2 1.4 1.2h3.1c1.3 0 2-.4 2.6-1.9l.6-1.4h.9c-.1.4-.5 3.7-.6 4.5H6.3v-1l1.2-.2c.8-.2 1-.4 1-1V7.4c0-.6-.2-.8-1-1l-1.2-.2v-1h11.3l.1 3.6h-.9l-.4-1.3c-.4-1.1-.9-1.3-2-1.3H9.3z" />
  ),
};

const SocialIcon = ({ name, className = 'h-4 w-4' }: SocialIconProps) => {
  const path = PATHS[name];
  if (!path) return null;

  // Instagram is drawn as strokes; the rest are solid brand marks.
  const isStroke = name === 'Instagram';

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={isStroke ? 'none' : 'currentColor'}
      stroke={isStroke ? 'currentColor' : 'none'}
      strokeWidth={isStroke ? 1.8 : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
};

export default SocialIcon;
