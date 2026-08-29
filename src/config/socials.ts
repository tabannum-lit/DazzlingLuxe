/**
 * Single source of truth for every outbound social/shop link on the site.
 *
 * TODO(dazzling-luxe): replace each `url` below with the real profile URL.
 * These currently point at the platform home pages, which send customers to
 * the wrong place. Nothing else needs editing — the footer and the cart both
 * read from this list.
 */

export type SocialLink = {
  /** Display name, also used as the accessible label. */
  name: string;
  /** Full profile URL. */
  url: string;
  /** Whether this account can actually take an order today. */
  sellsDirectly: boolean;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com', sellsDirectly: true },
  { name: 'Facebook', url: 'https://facebook.com', sellsDirectly: true },
  { name: 'TikTok', url: 'https://tiktok.com', sellsDirectly: true },
  { name: 'Etsy', url: 'https://etsy.com', sellsDirectly: true },
  { name: 'Pinterest', url: 'https://pinterest.com', sellsDirectly: false },
];

/** Channels a customer can actually buy through right now. */
export const ORDER_CHANNELS = SOCIAL_LINKS.filter((link) => link.sellsDirectly);
