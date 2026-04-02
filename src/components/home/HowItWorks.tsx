const steps = [
  {
    number: '01',
    title: 'Send Your Flowers',
    description:
      'Ship or drop off cherished flowers—or memorial locks of hair and pet fur alongside blooms. Wedding bouquets, wakes, anniversaries, or a single stem that matters.',
    icon: '🌸',
  },
  {
    number: '02',
    title: 'We Preserve & Design',
    description: 'Our artisans carefully preserve each petal and craft your chosen keepsake — jewelry, coaster, suncatcher, or custom piece.',
    icon: '✨',
  },
  {
    number: '03',
    title: 'Receive Your Keepsake',
    description: 'Your one-of-a-kind floral keepsake arrives beautifully packaged, ready to treasure for a lifetime or gift to someone special.',
    icon: '🎁',
  },
];

const HowItWorks = () => {
  return (
    <section className="mt-24 py-20 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 bg-gradient-to-b from-transparent via-beige/20 to-transparent" id="how-it-works-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">The Process</p>
          <h2 className="font-heading text-4xl md:text-5xl text-charcoal mt-3">How It Works</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[17%] right-[17%] h-px bg-gradient-to-r from-transparent via-warmGold/30 to-transparent" />

          {steps.map((step) => (
            <div key={step.number} className="text-center group">
              <div className="w-24 h-24 mx-auto rounded-full bg-cream border-2 border-warmGold/20 flex items-center justify-center text-4xl mb-6 transition-all group-hover:border-warmGold group-hover:shadow-lg group-hover:shadow-warmGold/10 relative z-10 bg-cream">
                {step.icon}
              </div>
              <div className="text-warmGold font-bold text-sm tracking-widest mb-2">{step.number}</div>
              <h3 className="font-heading text-2xl text-charcoal mb-3">{step.title}</h3>
              <p className="text-softBrown text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
