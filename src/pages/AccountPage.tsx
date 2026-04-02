import { Link } from 'react-router-dom';

/** Placeholder until auth is wired — prevents broken /account links from the header. */
const AccountPage = () => (
  <section className="mx-auto max-w-lg rounded-3xl border border-beige bg-white px-8 py-14 text-center shadow-sm">
    <h1 className="font-heading text-3xl text-charcoal">Your account</h1>
    <p className="mt-3 text-sm text-softBrown">
      Sign-in for order history and preservation tracking is coming soon. For now, reach out with your order number and we&apos;ll help
      immediately.
    </p>
    <Link
      to="/contact"
      className="mt-8 inline-block rounded-full bg-warmGold px-8 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-deepGold"
    >
      Contact studio
    </Link>
  </section>
);

export default AccountPage;
