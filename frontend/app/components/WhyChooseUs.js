// PURPOSE: Why Choose Us section

export default function WhyChooseUs() {
  const points = [
    {
      title: 'Verified Listings',
      desc: 'All properties are thoroughly verified for authenticity and legal compliance.',
    },
    {
      title: 'Trusted Agents',
      desc: 'Work with experienced real estate professionals across India.',
    },
    {
      title: 'Transparent Pricing',
      desc: 'No hidden charges. Clear pricing with full documentation support.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            Why Choose LuxEstate
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We make property buying and renting simple, transparent, and secure.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {points.map((point) => (
            <div
              key={point.title}
              className="border border-gray-200 rounded-xl p-8 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}