// PURPOSE: Trust statistics section

export default function StatsSection() {
  const stats = [
    { label: 'Properties Listed', value: '1,200+' },
    { label: 'Cities Covered', value: '15+' },
    { label: 'Happy Clients', value: '3,500+' },
    { label: 'Years of Experience', value: '10+' },
  ];

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}