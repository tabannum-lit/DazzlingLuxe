import PolicyPage from './PolicyPage';

/**
 * TODO(dazzling-luxe): replace the placeholder copy below with your real
 * shipping terms. The page, route and footer link are already wired up —
 * only the strings in `sections` need changing.
 */
const ShippingPolicyPage = () => (
  <PolicyPage
    eyebrow="Policies"
    title="Shipping Policy"
    intro="How and when your handmade pieces reach you."
    lastUpdated="2026-08-28"
    sections={[
      {
        heading: 'Processing time',
        body: [
          'TODO: State how long you take to make and dispatch an order — for example "Ready-to-ship pieces leave the studio within 3–5 business days. Custom preservation work takes 6–10 weeks from the day your flowers arrive."',
        ],
      },
      {
        heading: 'Shipping methods & delivery times',
        body: [
          'TODO: List the carriers you use and typical transit times within Canada, to the US, and internationally if you ship there.',
        ],
      },
      {
        heading: 'Shipping costs',
        body: [
          'TODO: State your rates — flat rate, calculated at checkout, or free over a threshold. Note that shipping currently shows as "Calculated at checkout" on the cart.',
        ],
      },
      {
        heading: 'Sending us your flowers',
        body: [
          'TODO: Explain how customers should pack and send flowers for preservation, who pays that postage, and what happens if blooms arrive damaged.',
        ],
      },
      {
        heading: 'Tracking, delays & lost parcels',
        body: [
          'TODO: Explain how tracking is shared, and what you do if a parcel is delayed, lost, or damaged in transit.',
        ],
      },
      {
        heading: 'Customs & duties',
        body: [
          'TODO: For orders outside Canada, state who is responsible for any customs charges, duties, or import taxes.',
        ],
      },
    ]}
  />
);

export default ShippingPolicyPage;
