import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Infinity Green Energy',
  description: 'Find answers to common questions about solar energy, Open Access power wheeling, PPA contracts, and grid connectivity in India.',
  openGraph: {
    title: 'Frequently Asked Questions | Infinity Green Energy',
    description: 'Find answers to common questions about industrial solar and open access.',
    url: 'https://infinitygreenenergy.com/faqs',
    type: 'website'
  }
};

export default function FaqsPage() {
  const faqs = [
    {
      q: 'What is Open Access power procurement?',
      a: 'Open Access is a regulatory mechanism in India that allows bulk electricity consumers (with a connected load of 1 MW and above) to purchase cheaper power directly from independent power producers on the grid instead of relying solely on state-owned distribution companies (DISCOMs).'
    },
    {
      q: 'What is the difference between CAPEX and OPEX models?',
      a: 'In the CAPEX model, the consumer owns the solar plant, bearing the entire upfront investment and maintenance. In the OPEX (or RESCO) model, a developer installs the plant on the consumer\'s premises at no upfront cost, and the consumer only pays for the electricity generated at a pre-agreed tariff.'
    },
    {
      q: 'What charges apply to open access transactions?',
      a: 'Open access power transactions are subject to several utility charges, including transmission charges, wheeling charges, line losses, cross-subsidy surcharges (CSS), and additional surcharges (AS) depending on state-specific grid policies.'
    },
    {
      q: 'How does Infinity Green Energy ensure power reliability?',
      a: 'We manage a diversified portfolio of generation sources (solar, wind, and run-of-river hydro) and coordinate real-time grid integration to offset weather-related generation fluctuations.'
    }
  ];

  return (
    <div className="bg-light min-h-screen text-dark flex flex-col justify-between">
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">FAQ</span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base font-sans">
            Get clear answers to the most common questions regarding solar integration, grid connection regulations, and utility tariffs.
          </p>
        </section>

        <section className="max-w-3xl mx-auto space-y-6 pt-8">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-2">
              <h3 className="text-sm font-bold text-dark font-heading flex items-start gap-2">
                <span className="text-primary text-base">Q.</span> {f.q}
              </h3>
              <p className="text-slate-500 text-xs font-sans leading-relaxed pl-5">
                {f.a}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
