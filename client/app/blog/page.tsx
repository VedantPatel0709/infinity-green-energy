import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Renewable Energy Blog & Insights | Infinity Green Energy',
  description: 'Stay updated with the latest trends in industrial open-access, solar policy, net metering guidelines, and PPA structure in India.',
  openGraph: {
    title: 'Renewable Energy Blog & Insights | Infinity Green Energy',
    description: 'Stay updated with the latest trends in industrial open access and solar policy.',
    url: 'https://infinitygreenenergy.com/blog',
    type: 'website'
  }
};

export default function BlogPage() {
  const posts = [
    {
      title: 'Navigating Open Access Regulations in India (2026)',
      excerpt: 'A comprehensive review of inter-state and intra-state open-access rules, transmission charges, and cross-subsidy surcharges.',
      category: 'Regulations',
      date: 'June 2, 2026',
      readTime: '6 min read'
    },
    {
      title: 'Why Group Captive Solar Models represent 100% OPEX savings',
      excerpt: 'How commercial and industrial clusters can set up joint solar plants to bypass high state DISCOM tariffs under electricity rules.',
      category: 'PPA Strategy',
      date: 'May 28, 2026',
      readTime: '5 min read'
    },
    {
      title: 'Real-time bidding on the Indian Power Exchange (IEX)',
      excerpt: 'Leveraging short-term day-ahead contracts to procure power and offset high peak load industrial tariffs.',
      category: 'Marketplace',
      date: 'May 14, 2026',
      readTime: '8 min read'
    }
  ];

  return (
    <div className="bg-light min-h-screen text-dark flex flex-col justify-between">
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <section className="text-center space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">Knowledge Center</span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark tracking-tight uppercase">
            Renewable Energy Insights
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base font-sans">
            Stay up-to-date with regulatory modifications, grid policies, and optimization guidelines for commercial energy consumers.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {posts.map((post, index) => (
            <article key={index} className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div className="space-y-4">
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{post.category}</span>
                <h3 className="text-lg font-bold text-dark font-heading leading-snug">{post.title}</h3>
                <p className="text-slate-500 text-xs font-sans leading-relaxed">{post.excerpt}</p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
