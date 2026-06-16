import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Renewable Energy Knowledge Center | Infinity Green Energy',
  description: 'Learn about clean energy systems, Wind-Solar Hybrid dynamics, Battery Storage options, PPAs, and carbon emission calculation methodologies.',
  openGraph: {
    title: 'Renewable Energy Knowledge Center | Infinity Green Energy',
    description: 'B2B Renewable Energy and smart grid knowledge hub for sustainable enterprises.',
    url: 'https://infinitygreenenergy.com/knowledge-center',
    type: 'website'
  }
};

export default function KnowledgeCenterPage() {
  const categories = [
    {
      title: 'Generation Technologies',
      articles: [
        {
          title: 'Wind-Solar Hybrid Systems',
          desc: 'Combining solar PV modules with wind turbines on a single grid-connection point to achieve high capacity utilization factors (CUF) exceeding 45%.'
        },
        {
          title: 'On-site Rooftop Solar vs Utility Scale',
          desc: 'Comparing space efficiency, local net-metering laws, and financial ROI timelines between building rooftop systems versus procuring external farm power.'
        }
      ]
    },
    {
      title: 'Contracts & PPA Models',
      articles: [
        {
          title: 'Power Purchase Agreements (PPA)',
          desc: 'Understanding fixed tariff agreements, escalation clauses, performance guarantees, and minimum off-take commitments in long-term corporate energy contracts.'
        },
        {
          title: 'Third-Party PPA Procurement',
          desc: 'Securing electricity from independent developers using state transmission grids without sharing equity in the generation plant.'
        }
      ]
    },
    {
      title: 'Storage & Smart Grid',
      articles: [
        {
          title: 'Battery Energy Storage Systems (BESS)',
          desc: 'Integrating lithium-ion or flow batteries to store cheap daytime solar power and discharge during lucrative peak tariff hours.'
        },
        {
          title: 'Availability-Based Tariff (ABT) Scheduling',
          desc: 'How real-time smart meters track energy dispatch deviations and manage grid penalties under Deviation Settlement Mechanism (DSM) rules.'
        }
      ]
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Renewable Energy Knowledge Center',
    'description': 'A repository of technical and commercial guides on renewable technologies, PPAs, and utility battery storage.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Infinity Green Energy',
      'logo': 'https://infinitygreenenergy.com/logo.png'
    }
  };

  return (
    <div className="bg-light min-h-screen text-dark flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3 py-1.5 rounded-full">
            Education Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase leading-none">
            Knowledge Center
          </h1>
          <p className="text-slate-500 text-base font-sans max-w-xl mx-auto">
            Deep technical resources on renewable energy systems, commercial contract architectures, and storage integrations.
          </p>
        </section>

        {/* Categories Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-lg font-black text-dark font-heading uppercase border-b border-slate-200 pb-3 tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                {cat.title}
              </h3>
              
              <div className="space-y-6">
                {cat.articles.map((art, aIdx) => (
                  <div key={aIdx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition-shadow space-y-2">
                    <h4 className="font-heading font-bold text-sm text-dark">{art.title}</h4>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed">{art.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Tools Redirect Banner */}
        <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-xl font-bold font-heading text-dark uppercase">Estimate your carbon offset and cost savings</h3>
          <p className="text-slate-500 text-xs font-sans max-w-lg mx-auto">
            Use our interactive energy calculator to get solar potential estimates, open access feasibility, and projected cash flow sheets.
          </p>
          <div>
            <Link href="/calculator" className="btn-primary inline-flex text-xs py-2.5 px-8">
              Start Energy Assessment
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
