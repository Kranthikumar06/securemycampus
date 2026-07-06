import React from 'react';

const DEFAULT_STATS = [
  { id: 1, value: '1.2k+', label: 'Resolved Issues' },
  { id: 2, value: '15k+', label: 'Active Users' },
  { id: 3, value: '24/7', label: 'Security Support' },
  { id: 4, value: '98%', label: 'Safety Rating' },
];

export default function Stats({ stats = DEFAULT_STATS }) {
  return (
    <section className="stats py-3xl bg-primary-container text-on-primary">
      <div className="container mx-auto px-gutter grid grid-cols-2 lg:grid-cols-4 gap-xl text-center">
        {stats.map((stat) => (
          <div key={stat.id} className="space-y-sm">
            <div className="font-display-lg text-[56px] font-extrabold">{stat.value}</div>
            <div className="font-label-md text-label-md uppercase tracking-widest opacity-80">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
