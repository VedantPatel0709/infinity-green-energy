import { Globe2, Zap, Factory, Building2, HelpCircle, FileCheck2 } from 'lucide-react';

/**
 * Services Page - Detailed list of enterprise energy services
 */
export default function ServicesPage() {
  const services = [
    {
      title: 'Energy Exchange Trading',
      desc: 'Leverage electricity trading platforms (IEX, PXIL) to procure power dynamically at market-clearing prices. Excellent for optimizing short-term utility budgets.',
      icon: <Globe2 className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Open Access Power',
      desc: 'Procure clean grid power directly from third-party IPPs. Bypass local utilities, choose from solar, wind, or hybrid sources, and secure predictable long-term tariffs.',
      icon: <Zap className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Industrial Solar Solutions',
      desc: 'SLA-backed, high-yield CAPEX and OPEX rooftop or ground-mount systems. Custom engineered for heavy industries, textile mills, and chemical plants.',
      icon: <Factory className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Commercial Solar Solutions',
      desc: 'Sleek, integrated rooftop and solar carport solutions. Specially designed to meet the ESG compliance requirements and green building standards of commercial properties.',
      icon: <Building2 className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Energy Consulting & Audits',
      desc: 'Complete power audit, load profiling, tariff analysis, and demand side management optimization. Make data-driven choices for power-intensive facilities.',
      icon: <HelpCircle className="w-10 h-10 text-primary" />,
    },
    {
      title: 'Subsidy & Compliance Assistance',
      desc: 'Navigate state regulations, open access approvals, net metering syncing, governmental subsidies, and carbon offset reporting with absolute ease.',
      icon: <FileCheck2 className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
            Enterprise Offerings
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark mt-2 tracking-tight uppercase">
            Solutions Portfolio
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base font-sans">
            End-to-end power procurement, infrastructure buildout, and strategic consulting for the nation&apos;s leading industries.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="card-premium">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold font-heading text-dark mb-4">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm font-sans">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
