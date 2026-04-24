import { Sun, Battery, Building2, Wrench } from 'lucide-react';

/**
 * Services Page - Detailed list of solar and green energy services
 */
export default function ServicesPage() {
  const services = [
    {
      title: 'Residential Solar',
      desc: 'Complete rooftop solar solutions for homes, reducing your dependency on the grid.',
      icon: <Sun className="w-12 h-12 text-primary" />,
    },
    {
      title: 'Commercial Installation',
      desc: 'Large-scale solar farms and industrial rooftop solutions to power your business sustainably.',
      icon: <Building2 className="w-12 h-12 text-primary" />,
    },
    {
      title: 'Energy Storage',
      desc: 'Advanced battery backup systems to keep your home powered during nights and outages.',
      icon: <Battery className="w-12 h-12 text-primary" />,
    },
    {
      title: 'Maintenance & Audit',
      desc: 'Regular cleaning, efficiency checks, and energy audits to ensure peak performance.',
      icon: <Wrench className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <div className="py-24 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6">OUR SERVICES</h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Providing end-to-end green energy solutions with cutting-edge technology and 25 years of trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((s, i) => (
            <div key={i} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-primary/50 transition-all group">
              <div className="mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="text-xl font-bold mb-4">{s.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
