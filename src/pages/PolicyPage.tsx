import { ReactNode } from 'react';

export type PolicySection = {
  heading: string;
  /** Replace with your real terms. Each string renders as a paragraph. */
  body: string[];
};

type PolicyPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
  /** ISO date string, e.g. '2026-08-28'. */
  lastUpdated: string;
  footer?: ReactNode;
};

const PolicyPage = ({ eyebrow, title, intro, sections, lastUpdated, footer }: PolicyPageProps) => (
  <section className="mx-auto max-w-3xl">
    <p className="text-sm font-bold uppercase tracking-[0.2em] text-warmGold">{eyebrow}</p>
    <h1 className="mt-2 font-heading text-4xl text-charcoal md:text-5xl">{title}</h1>
    <p className="mt-4 text-softBrown">{intro}</p>

    <div className="mt-10 space-y-8">
      {sections.map((section) => (
        <div key={section.heading}>
          <h2 className="font-heading text-2xl text-charcoal">{section.heading}</h2>
          {section.body.map((paragraph, index) => (
            <p key={index} className="mt-3 leading-relaxed text-softBrown">
              {paragraph}
            </p>
          ))}
        </div>
      ))}
    </div>

    {footer}

    <p className="mt-12 border-t border-beige/40 pt-6 text-sm text-softBrown">
      Last updated:{' '}
      {new Date(lastUpdated).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
    </p>
  </section>
);

export default PolicyPage;
