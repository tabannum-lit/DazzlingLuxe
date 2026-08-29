import PolicyPage from './PolicyPage';

/**
 * TODO(dazzling-luxe): replace the placeholder copy below with your real
 * return terms. The page, route and footer link are already wired up —
 * only the strings in `sections` need changing.
 */
const ReturnPolicyPage = () => (
  <PolicyPage
    eyebrow="Policies"
    title="Return Policy"
    intro="What to do if something isn't right."
    lastUpdated="2026-08-28"
    sections={[
      {
        heading: 'Returns window',
        body: [
          'TODO: State how long a customer has to request a return — for example "You may request a return within 30 days of delivery, provided the piece is unworn and in its original packaging."',
        ],
      },
      {
        heading: 'Custom & preserved pieces',
        body: [
          'TODO: Custom work made from a customer\'s own flowers usually cannot be resold. State clearly whether these are final sale, and what you will do if a custom piece arrives damaged or does not match what was agreed.',
        ],
      },
      {
        heading: 'Damaged or faulty items',
        body: [
          'TODO: Explain the process — for example "Email photos within 7 days of delivery and we will repair, remake, or refund."',
        ],
      },
      {
        heading: 'How to start a return',
        body: [
          'TODO: Give the exact steps and the contact address customers should use, plus what information you need from them (order number, photos).',
        ],
      },
      {
        heading: 'Refunds',
        body: [
          'TODO: State how refunds are issued, to which payment method, and how long they take to appear.',
        ],
      },
      {
        heading: 'Return shipping costs',
        body: [
          'TODO: State who pays return postage in each case — change of mind vs. a fault on your side.',
        ],
      },
    ]}
  />
);

export default ReturnPolicyPage;
