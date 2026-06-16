import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Corporate Case Studies | Infinity Green Energy',
  description: 'Examine real-world case studies detailing how spinning mills, chemical labs, and manufacturers reduced power costs via open access.',
  openGraph: {
    title: 'Corporate Case Studies | Infinity Green Energy',
    description: 'Examine real-world case studies detailing corporate renewable energy transitions.',
    url: 'https://infinitygreenenergy.com/case-studies',
    type: 'website'
  }
};

export default function CaseStudiesPage() {
  const cases = [
    {
      title: 'Indo-Tex Spinning Mill (Gujarat)',
      industry: 'Textiles',
      challenge: 'High daytime energy cost averaging ₹8.5/unit from local state DISCOM, reducing profit margins.',
      solution: 'Transitioned to 4.2 MW Hybrid (Wind-Solar) Open Access capacity, wheeled directly under state grid rules.',
      result: 'Electricity bill dropped by 42% (saving over ₹4.8 Crore annually with no upfront capital investment).'
    },
    {
      title: 'Astra Pharma Labs (Maharashtra)',
      industry: 'Pharmaceuticals',
      challenge: 'Requirement for 100% green energy compliance to meet multinational client ESG procurement mandates.',
      solution: 'Deployed 1.8 MW net-metered zero-investment OPEX solar rooftop plant.',
      result: 'Offset 85% of peak daytime load and secured long-term tariff stability locked for 15 years.'
    }
  ];

  return (
    <div className="bg-light min-h-screen text-dark flex flex-col justify-between">
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Success Stories</span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase">
            B2B Case Studies
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base font-sans">
            See how major corporate and industrial facilities optimized their power bills and achieved sustainability objectives.
          </p>
        </section>

        <section className="space-y-8 pt-8 max-w-4xl mx-auto">
          {cases.map((cs, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-dark font-heading">{cs.title}</h3>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{cs.industry}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs font-sans">
                <div className="space-y-1">
                  <strong className="text-slate-400 uppercase text-[9px] block">Challenge:</strong>
                  <p className="text-slate-600">{cs.challenge}</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-slate-400 uppercase text-[9px] block">Solution:</strong>
                  <p className="text-slate-600">{cs.solution}</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-slate-400 uppercase text-[9px] block">Result:</strong>
                  <p className="text-emerald-700 font-bold">{cs.result}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
