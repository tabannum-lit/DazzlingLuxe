import PolicyPage from './PolicyPage';

/**
 * TODO(dazzling-luxe): replace the placeholder copy below with your real
 * privacy terms. The page, route and footer link are already wired up —
 * only the strings in `sections` need changing.
 *
 * As a Canadian business you are likely subject to PIPEDA, and to GDPR for
 * any EU/UK customers. Consider having a professional review the final text.
 */
const PrivacyPolicyPage = () => (
  <PolicyPage
    eyebrow="Policies"
    title="Privacy Policy"
    intro="What we collect, why we collect it, and what we do with it."
    lastUpdated="2026-08-28"
    sections={[
      {
        heading: 'What we collect',
        body: [
          'TODO: List the personal information you actually collect. Today the site gathers a name, email, phone number and free-text story through the preservation form, a name/email/subject/message through the contact form, and an email address through the newsletter signup.',
        ],
      },
      {
        heading: 'How we use it',
        body: [
          'TODO: Explain what each piece of information is used for — fulfilling orders, replying to enquiries, sending marketing email.',
        ],
      },
      {
        heading: 'Cookies & local storage',
        body: [
          'TODO: The site stores your cart in your browser\'s local storage under "dazzling-luxe-cart". Disclose this, plus any analytics or advertising cookies you add later.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: [
          'TODO: Name your processors — payment provider, email/newsletter platform, shipping carriers, hosting — and confirm you do not sell personal information.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: ['TODO: State your retention periods for order records and marketing contacts.'],
      },
      {
        heading: 'Your rights',
        body: [
          'TODO: Explain how someone can access, correct, or delete their data, and unsubscribe from marketing. Give the contact address for these requests.',
        ],
      },
      {
        heading: 'Contact',
        body: ['TODO: Give the email address and business mailing address for privacy enquiries.'],
      },
    ]}
  />
);

export default PrivacyPolicyPage;
