/**
 * Single source of truth for every outbound social/shop link on the site.
 *
 * TODO(dazzling-luxe): Etsy still points at the platform home page — replace
 * with the real shop URL once it exists. Nothing else needs editing — the
 * footer, cart, and invoice all read from this list.
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
  { name: 'Instagram', url: 'https://www.instagram.com/dazzlingluxenl', sellsDirectly: true },
  { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61587442360560', sellsDirectly: true },
  { name: 'TikTok', url: 'https://www.tiktok.com/@dazzling.luxe.nl', sellsDirectly: true },
  { name: 'Etsy', url: 'https://www.etsy.com/ca/shop/DazzlingLuxeNL?ref=shop_profile&listing_id=4562771174', sellsDirectly: true },
];

/** Channels a customer can actually buy through right now. */
export const ORDER_CHANNELS = SOCIAL_LINKS.filter((link) => link.sellsDirectly);
