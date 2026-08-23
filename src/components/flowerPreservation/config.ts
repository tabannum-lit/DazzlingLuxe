import { KeepsakeOption } from './types';

export const KEEPSAKE_OPTIONS: KeepsakeOption[] = [
  {
    id: 'coaster',
    label: 'Coaster',
    price: 80,
    description: 'An everyday keepsake coaster with your preserved flowers set in resin.',
  },
  {
    id: 'suncatcher',
    label: 'Suncatcher',
    price: 80,
    description: 'A light-catching resin piece designed to hang in a window.',
  },
  {
    id: 'plaque',
    label: 'Plaque',
    price: 80,
    description: 'A decorative resin plaque for shelf or wall display.',
  },
  {
    id: 'display-piece',
    label: 'Display Piece',
    price: 180,
    description: 'A larger showcase piece built around your preserved flowers.',
  },
  {
    id: 'shadow-box',
    label: 'Shadow Box',
    price: 70,
    description: 'A framed shadow box arrangement of your preserved flowers.',
  },
];

// Placeholder value — Dazzling Luxe to confirm the real return/handling fee
// before launch. Change this single constant to update the fee everywhere
// (review screen, invoice PDF, and totals).
export const RETURN_FEE_PLACEHOLDER = 25;

export const CONSENT_TEXT =
  "Because flower preservation requires additional flowers for testing, breakage, colour changes and design selection, Dazzling Luxe may retain and reuse excess prepared flowers that are not incorporated into the customer's commissioned piece. If you would like all unused flowers returned, please request this before the preservation process begins; additional preparation/handling fees may apply.";

// Placeholder handles — Dazzling Luxe MUST replace these with real profile
// URLs before launch. These are deliberately not real-looking accounts.
export const SOCIAL_LINKS_PLACEHOLDER = {
  instagram: 'https://instagram.com/REPLACE_WITH_REAL_HANDLE',
  facebook: 'https://facebook.com/REPLACE_WITH_REAL_HANDLE',
  tiktok: 'https://tiktok.com/@REPLACE_WITH_REAL_HANDLE',
};
