// // PURPOSE: Trust statistics section

// export default function StatsSection() {
//   const stats = [
//     { label: 'Properties Listed', value: '1,200+' },
//     { label: 'Cities Covered', value: '15+' },
//     { label: 'Happy Clients', value: '3,500+' },
//     { label: 'Years of Experience', value: '10+' },
//   ];

//   return (
//     <section className="bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//         {stats.map((stat) => (
//           <div key={stat.label}>
//             <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
//             <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// PURPOSE: Trust statistics section

export default function StatsSection() {
  const stats = [
    {
      label: 'Properties Listed',
      value: '4+',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
        </svg>
      ),
    },
    {
      label: 'Cities Covered',
      value: '2+',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      label: 'Happy Clients',
      value: '100+',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      ),
    },
    {
      label: 'Years of Experience',
      value: '18+',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 5.492M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative overflow-hidden py-16"
             style={{ background: 'linear-gradient(135deg, #1a1f2e 0%, #0f1420 50%, #1a1f2e 100%)' }}>

      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
           style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
           style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />

      {/* Ambient glow center */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)' }} />

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative flex flex-col items-center text-center px-6 py-8
                ${i < stats.length - 1 ? 'md:border-r border-white/10' : ''}
                ${i === 1 ? 'border-r border-white/10 md:border-r' : ''}
              `}
            >
              {/* Icon pill */}
              <div className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center
                              text-amber-400 group-hover:scale-110 transition-transform duration-300"
                   style={{ background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.2)' }}>
                {stat.icon}
              </div>

              {/* Value */}
              <p className="font-playfair text-3xl md:text-4xl font-bold text-white mb-1
                             group-hover:text-amber-300 transition-colors duration-300">
                {stat.value}
              </p>

              {/* Label */}
              <p className="text-gray-400 text-sm tracking-wide">{stat.label}</p>

              {/* Hover underline accent */}
              <div className="mt-3 h-0.5 w-0 group-hover:w-10 rounded-full transition-all duration-500"
                   style={{ background: 'linear-gradient(90deg, #c9a96e, #e8c98a)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}