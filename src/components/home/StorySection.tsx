const StorySection = () => {
  return (
    <section className="mt-24 py-20 relative overflow-hidden rounded-3xl" id="story-section">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal/60" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
        <p className="text-warmGold uppercase tracking-[0.25em] text-sm font-bold mb-6">Our Philosophy</p>
        <h2 className="font-heading text-5xl md:text-6xl leading-tight italic">
          "Every piece tells a story"
        </h2>
        <p className="mt-8 text-lg text-white/80 leading-relaxed max-w-lg mx-auto">
          We believe that flowers carry memories. A wedding bouquet, a grandmother's garden roses,
          a baby's first bloom — these moments deserve to live forever. That's why we preserve them
          with care, love, and artistry.
        </p>
        <div className="mt-10 w-16 h-px bg-warmGold mx-auto" />
        <p className="mt-6 font-heading text-xl text-warmGold">— Aethelgard Blooms</p>
      </div>
    </section>
  );
};

export default StorySection;
