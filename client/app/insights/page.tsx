'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Clock, ArrowRight, User } from 'lucide-react';

const articles = [
  {
    id: 'art-1',
    title: 'Industrial Energy Cost Reduction: A Strategic Playbook',
    excerpt: 'Detailed analysis of tariff structures, operational load balancing, and demand side management optimization strategies for factory owners.',
    category: 'Cost Optimization',
    date: 'June 10, 2026',
    readTime: '8 min read',
    slug: 'industrial-energy-cost-reduction',
    author: 'Aditya Vardhan',
    tags: ['EBITDA', 'Cost Slashes', 'Load Profile']
  },
  {
    id: 'art-2',
    title: 'Open Access Energy Explained for Indian Bulk Consumers',
    excerpt: 'How medium and heavy industries can bypass state DISCOM utilities to buy green power directly from IPPs via grid wheeling agreements.',
    category: 'Open Access',
    date: 'June 05, 2026',
    readTime: '6 min read',
    slug: 'open-access-explained',
    author: 'Aditya Vardhan',
    tags: ['Open Access', 'Grid Surcharges', 'PPA']
  },
  {
    id: 'art-3',
    title: 'Navigating Solar Net-Metering Limits for Factory Owners',
    excerpt: 'Understanding state-by-state net-metering thresholds, grid injection limits, and RESCO vs CAPEX solar installations.',
    category: 'Industrial Solar',
    date: 'May 29, 2026',
    readTime: '7 min read',
    slug: 'solar-net-metering-limits',
    author: 'Ecosystem Sourcing Desk',
    tags: ['Rooftop Solar', 'Net Metering', 'CAPEX']
  },
  {
    id: 'art-4',
    title: 'Wind-Solar Hybrid Blending to Offset 24/7 Base Load',
    excerpt: 'How multi-technology hybrid parks blend generation profiles to meet strict evening and night operational loads.',
    category: 'Hybrid Solutions',
    date: 'May 20, 2026',
    readTime: '9 min read',
    slug: 'wind-solar-hybrid-blending',
    author: 'Ecosystem Sourcing Desk',
    tags: ['Hybrid Blend', '24/7 Power', 'IPP Sourced']
  },
  {
    id: 'art-5',
    title: 'Understanding Indian Energy Exchange (IEX) Spot Markets',
    excerpt: 'Leveraging real-time energy price indexing, bilateral contracts, and short-term grid purchase pathways.',
    category: 'Energy Markets',
    date: 'May 12, 2026',
    readTime: '10 min read',
    slug: 'iex-spot-markets',
    author: 'Regulatory Desk',
    tags: ['IEX Spot', 'Trading', 'Grid code']
  },
  {
    id: 'art-6',
    title: 'Decoding CERC Green Open Access and Draft Grid Guidelines',
    excerpt: 'Navigating regulatory caps, ISTS transmission waivers, cross-subsidy exemptions, and compliance requirements.',
    category: 'Industry Regulations',
    date: 'May 02, 2026',
    readTime: '8 min read',
    slug: 'cerc-grid-guidelines',
    author: 'Regulatory Desk',
    tags: ['CERC rules', 'Green OA', 'Compliance']
  },
  {
    id: 'art-7',
    title: 'Decarbonizing Heavy Industry: A Practical ESG Strategy',
    excerpt: 'Transitioning chemical, pharma, and textile plants toward carbon-neutral operations while securing up to 35% electricity tariff reductions.',
    category: 'Cost Optimization',
    date: 'April 25, 2026',
    readTime: '8 min read',
    slug: 'sustainability-strategy',
    author: 'Aditya Vardhan',
    tags: ['ESG', 'Net Zero', 'Chemicals']
  }
];

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Open Access',
    'Industrial Solar',
    'Wind Energy',
    'Hybrid Solutions',
    'Energy Markets',
    'Cost Optimization',
    'Industry Regulations'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || art.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  // JSON-LD Structured Data Schema for Search Engines (SEO Optimization)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Infinity Green Energy Insights',
    'description': 'Industrial clean energy procurement articles, regulations briefs, and energy optimization reports.',
    'publisher': {
      '@type': 'Organization',
      'name': 'Infinity Green Energy',
      'logo': 'https://infinitygreenenergy.com/logo.png'
    },
    'blogPost': filteredArticles.map(art => ({
      '@type': 'BlogPosting',
      'headline': art.title,
      'description': art.excerpt,
      'datePublished': new Date(art.date).toISOString().split('T')[0],
      'author': {
        '@type': 'Person',
        'name': art.author
      }
    }))
  };

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      {/* Injecting Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Knowledge Hub & Advisory
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-heading text-dark mt-4 mb-6 uppercase tracking-tight">
            RENEWABLE ENERGY INSIGHTS
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Market briefs, legislative analyses, and practical guides detailing industrial energy procurement and optimization.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:w-1/3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search articles and briefs..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary text-xs font-medium text-dark font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto items-center justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-sm' 
                    : 'bg-slate-50 text-slate-500 border border-slate-200 hover:text-dark hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Section */}
        {filteredArticles.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
          <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 border border-slate-900 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="bg-primary text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Featured Article
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {filteredArticles[0].readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black font-heading uppercase tracking-tight text-white leading-tight">
                  {filteredArticles[0].title}
                </h2>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                  {filteredArticles[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {filteredArticles[0].tags?.map((tag) => (
                    <span key={tag} className="text-[9px] bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <span className="text-xs text-slate-400 font-sans">Author: {filteredArticles[0].author}</span>
                  <Link 
                    href={`/insights/${filteredArticles[0].slug}`}
                    className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:underline"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-center text-center space-y-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Knowledge Desk</span>
                <p className="text-xs text-slate-300">Detailed compliance guides, cost audits, and contract templates.</p>
                <Link href="/request-proposal" className="btn-primary py-2.5 text-xs">Request Feasibility Proposal</Link>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div>
          <h2 className="text-xl font-heading font-black text-dark uppercase tracking-tight mb-6">
            {selectedCategory === 'All' ? 'All Publications' : `${selectedCategory} Articles`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <article 
                  key={art.id} 
                  className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6 md:p-8 flex flex-col justify-between hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-sans">
                      <span className="bg-slate-100 text-slate-650 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        {art.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {art.readTime}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-black font-heading text-dark uppercase tracking-tight leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans">
                      {art.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {art.tags?.map((tag) => (
                        <span key={tag} className="text-[9px] bg-slate-50 text-slate-400 font-bold px-2 py-0.5 rounded border border-slate-200/50">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-sans">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <User className="w-3 h-3" />
                      </div>
                      <span>{art.author}</span>
                    </div>
                    
                    <Link 
                      href={`/insights/${art.slug}`}
                      className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:underline"
                    >
                      Read Brief <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-400 text-sm font-sans">
                No matching articles found. Try adjusting your search query or categories.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
