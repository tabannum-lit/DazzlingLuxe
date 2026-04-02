const AboutPage = () => {
  return (
    <section className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-warmGold uppercase tracking-[0.2em] text-sm font-bold">Our Story</p>
        <h1 className="font-heading text-4xl md:text-6xl text-charcoal mt-3">About Aethelgard Blooms</h1>
        <div className="mt-6 w-16 h-px bg-warmGold mx-auto" />
      </div>

      {/* Story */}
      <div className="grid gap-12 md:grid-cols-2 items-center mb-20">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=800&q=80"
            alt="Preserved flowers workspace"
            className="w-full h-80 object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="font-heading text-3xl text-charcoal mb-4">Where It All Began</h2>
          <p className="text-softBrown leading-relaxed mb-4">
            Aethelgard Blooms was born from a simple wish — to keep the beauty of real dried flowers alive in
            jewelry you can wear every day. Our Canadian studio preserves wedding bouquets, memorial stems, and
            cherished inclusions with the same care we&apos;d want for our own families.
          </p>
          <p className="text-softBrown leading-relaxed">
            Every piece we create tells a story. Whether it's a bride's bouquet transformed into a pendant,
            a grandmother's garden roses preserved in a coaster, or memorial flowers captured in a keepsake —
            we believe that the most precious things in life deserve to last forever.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 -mx-4 px-4 bg-gradient-to-b from-beige/10 via-beige/20 to-beige/10 rounded-3xl mb-20">
        <h2 className="font-heading text-3xl text-charcoal text-center mb-12">Our Values</h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-3xl mx-auto">
          {[
            { icon: '🌿', title: 'Natural Beauty', desc: 'We work with real flowers, preserving their authentic beauty without artificial substitutes.' },
            { icon: '💛', title: 'Emotional Connection', desc: 'Every keepsake is crafted with the understanding that it holds a precious memory.' },
            { icon: '✋', title: 'Handcrafted Care', desc: 'Each piece is individually made by hand, ensuring uniqueness and attention to detail.' },
          ].map((v) => (
            <div key={v.title} className="text-center">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-heading text-xl text-charcoal mb-2">{v.title}</h3>
              <p className="text-sm text-softBrown leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl text-charcoal mb-4">Our Process</h2>
        <p className="text-softBrown max-w-lg mx-auto">
          From the moment your flowers arrive at our studio, they are treated with the utmost care.
          Our preservation process takes 4-6 weeks to ensure lasting clarity and beauty,
          resulting in keepsakes that will endure for generations.
        </p>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl border border-beige/40 p-8 text-center">
        <h3 className="font-heading text-2xl text-charcoal mb-3">Based in Newfoundland 🍁</h3>
        <p className="text-softBrown text-sm leading-relaxed max-w-md mx-auto">
          Proudly operating from the beautiful province of Newfoundland and Labrador, Canada.
          We ship our keepsakes across Canada and accept flowers from anywhere in the country.
        </p>
      </div>
    </section>
  );
};

export default AboutPage;
