import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Open Access Energy Procurement Guides | Infinity Green Energy',
  description: 'Detailed B2B guides on cross-subsidy surcharges, power wheeling regulations, captive vs group captive, and solar net-metering in India.',
  openGraph: {
    title: 'Open Access Energy Procurement Guides | Infinity Green Energy',
    description: 'Learn the step-by-step process of procuring green power under open access regulations.',
    url: 'https://infinitygreenenergy.com/guides',
    type: 'website'
  }
};

export default function GuidesPage() {
  const guides = [
    {
      title: 'Captive vs. Group Captive Power Models',
      description: 'Understand the ownership and equity requirements under Electricity Rules. Learn how group captive models exempt your business from hefty Cross-Subsidy Surcharges (CSS).',
      steps: [
        'Ownership: Consumer must own at least 26% of equity in the generation plant.',
        'Consumption: Consumer must consume at least 51% of generated power annually.',
        'Surcharges: Completely exempt from Cross-Subsidy Surcharge (CSS) and Additional Surcharge (AS).'
      ]
    },
    {
      title: 'Open Access Grid Connectivity Process',
      description: 'A step-by-step checklist to secure state load dispatch center (SLDC) permissions and utility approvals for grid wheeling.',
      steps: [
        'Feasibility Study: Verify if connected load is at least 1 MW and determine the nearest grid substation.',
        'LTOA/MTOA Application: File for Long-Term or Medium-Term Open Access with the state transmission utility.',
        'ABT Meter Installation: Install special Availability-Based Tariff meters for 15-minute time-block monitoring.',
        'NOC and Wheeling Agreement: Secure No-Objection Certificates from the local DISCOM and sign the wheeling contract.'
      ]
    },
    {
      title: 'Calculating Cross-Subsidy & Wheeling Surcharges',
      description: 'How to calculate the final landed cost of open access electricity after accounting for grid losses and local state policy surcharges.',
      steps: [
        'Landed Cost = Generation Tariff + Transmission Charges + Wheeling Charges + CSS + AS + Line Losses.',
        'Cross-Subsidy Surcharge (CSS): Designed to compensate DISCOMs for losing high-paying commercial consumers.',
        'Group Captive Waiver: Avoid CSS and AS by opting for a joint equity model, saving up to ₹2.0/kWh.'
      ]
    }
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'name': 'Open Access Energy Procurement Guides',
    'description': 'How to procure green power, calculate wheeling charges, and implement group captive models in India.',
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
            Technical Resources
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase">
            Open Access Guides
          </h1>
          <p className="text-slate-500 text-base font-sans max-w-xl mx-auto">
            Practical regulatory manuals and frameworks to navigate green energy transactions, utility contracts, and load integration.
          </p>
        </section>

        {/* Guides List */}
        <section className="max-w-4xl mx-auto space-y-12 pt-8">
          {guides.map((guide, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-primary tracking-widest uppercase font-heading">
                  Module {idx + 1}
                </span>
                <h2 className="text-2xl font-black text-dark font-heading uppercase leading-tight">
                  {guide.title}
                </h2>
                <p className="text-slate-500 text-sm font-sans leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="bg-light p-6 rounded-2xl border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-4">
                  Implementation Guidelines / Key Steps
                </span>
                <ol className="space-y-3 font-sans text-xs text-slate-700">
                  {guide.steps.map((step, sIdx) => (
                    <li key={sIdx} className="flex gap-3">
                      <span className="flex items-center justify-center w-5 h-5 bg-primary/10 text-primary font-bold rounded-full shrink-0">
                        {sIdx + 1}
                      </span>
                      <p className="leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </section>

        {/* Quick FAQ Integration */}
        <section className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 max-w-4xl mx-auto space-y-6 text-center">
          <h3 className="text-xl font-bold font-heading text-dark uppercase">Have regulatory or state-specific questions?</h3>
          <p className="text-slate-500 text-xs font-sans max-w-xl mx-auto">
            State policies vary widely. Maharashtra, Gujarat, Karnataka, and Tamil Nadu have distinct cross-subsidy and banking guidelines.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/faqs" className="btn-secondary !text-primary text-xs py-2 px-6">
              Read Detailed FAQs
            </Link>
            <Link href="/contact" className="btn-primary text-xs py-2 px-6">
              Schedule Consult
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
