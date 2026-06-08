"use client";

import { useRouter } from "next/navigation";
import Link from 'next/link';
import Hero from '@/components/Hero';
import LeadForm from '@/components/LeadForm';
import Calculator from '@/components/Calculator';

import { 
  ArrowRight, Globe2, Zap, Factory, Building2, Landmark, 
  HelpCircle, ShieldCheck, CheckCircle2, ChevronRight, BarChart3, Users2, Award, BriefcaseIcon
} from 'lucide-react';

/**
 * Home Page - Infinity Green Energy B2B Renewable Platform
 */
export default function Home() {
  const router = useRouter();

  // 3. Core Solutions Data (Exactly 4 Solutions)
  const coreSolutions = [
    {
      title: "Energy Exchange",
      desc: "Dynamically procure green energy on state exchanges (IEX, PXIL) to minimize short-term peak tariffs.",
      icon: <Globe2 className="w-6 h-6 text-primary" />
    },
    {
      title: "Industrial Solar",
      desc: "CAPEX & OPEX solar plant integration designed to power heavy-load manufacturing processes.",
      icon: <Factory className="w-6 h-6 text-primary" />
    },
    {
      title: "Energy Consulting",
      desc: "In-depth energy load audits, tariff pattern optimization, and grid integration forecasting.",
      icon: <BriefcaseIcon className="w-6 h-6 text-primary" />
    },
    {
      title: "Subsidy & Compliance",
      desc: "Hassle-free synchronization with net metering guidelines, grid codes, and government subsidies.",
      icon: <Landmark className="w-6 h-6 text-primary" />
    }
  ];

  // 5. Industries We Serve
  const targetIndustries = [
    { name: "Manufacturing", icon: "🏭" },
    { name: "Textile", icon: "🧵" },
    { name: "Chemical", icon: "🧪" },
    { name: "Pharmaceutical", icon: "💊" },
    { name: "Food Processing", icon: "🍎" },
    { name: "Logistics", icon: "🚚" },
    { name: "Commercial Real Estate", icon: "🏢" }
  ];


  // 8. B2B Case Studies
  const caseStudies = [
    {
      company: "Indo-Tex Spinning Mill",
      industry: "Textile",
      stat: "42% Reduction",
      detail: "Switched 4.2 MW load to Hybrid Open Access Power, decreasing annual electricity expenditure from ₹12 Cr to ₹7.2 Cr."
    },
    {
      company: "Astra Pharma Labs",
      industry: "Pharmaceuticals",
      stat: "1.8 MW Solar Rooftop",
      detail: "Deployed net-metered zero-investment OPEX solar plant offsetting peak daytime load under state-level regulatory subsidy."
    }
  ];

  // 9. Client Testimonials
  const testimonials = [
    {
      quote: "Infinity Green helped us navigate complex open access compliance and state power exchange bidding. Our tariff savings are fully aligned with projections.",
      author: "Rajesh Mehta",
      role: "VP Operations, Indo-Tex Spinning"
    },
    {
      quote: "The zero upfront OPEX model was a seamless fit for our ESG targets. We have already logged 18 months of zero-downtime green power.",
      author: "Dr. Ananya Sen",
      role: "Director of Facilities, Astra Pharma"
    }
  ];

  return (
    <div className="bg-light min-h-screen text-dark">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Indicators Section */}
      <section className="py-12 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="block text-4xl font-black text-primary font-heading">2.5 GW+</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Energy Transacted</span>
            </div>
            <div>
              <span className="block text-4xl font-black text-primary font-heading">300+</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Industrial Clients</span>
            </div>
            <div>
              <span className="block text-4xl font-black text-primary font-heading">38%</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Average Tariff Drop</span>
            </div>
            <div>
              <span className="block text-4xl font-black text-primary font-heading">15 State</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Transmission Nodes</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Solutions Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
            Specialized Grid Infrastructure
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-dark mt-2 tracking-tight uppercase">
            Core Solutions Portfolio
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm font-sans">
            End-to-end B2B power procurement and generation management engineered specifically for high-load consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreSolutions.map((sol, index) => (
            <div key={index} className="card-premium flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  {sol.icon}
                </div>
                <h3 className="text-lg font-bold text-dark font-heading mb-3">{sol.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 font-sans">{sol.desc}</p>
              </div>
              <button 
                onClick={() => router.push("/services")} 
                className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. How Energy Exchange Works - Signature Visual Flow Section */}
      <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
              Transaction Pathway
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark mt-2 tracking-tight uppercase">
              How Energy Exchange Works
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm font-sans">
              Our platform coordinates bilateral trade pipelines and grid inject scheduling under national transmission regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center max-w-5xl mx-auto font-sans text-xs">
            
            {/* Step 1: Renewable Producer */}
            <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center text-primary text-xl font-black mx-auto">1</div>
              <div>
                <h4 className="font-bold text-dark text-sm font-heading">Renewable Producer</h4>
                <p className="text-slate-500 mt-2">Injects power into the state/national transmission grid infrastructure.</p>
              </div>
            </div>

            {/* Connector */}
            <div className="lg:col-span-1 flex justify-center text-primary">
              <ArrowRight className="w-8 h-8 rotate-90 lg:rotate-0" />
            </div>

            {/* Step 2: Infinity Green Energy */}
            <div className="lg:col-span-1 bg-primary text-white p-6 rounded-2xl text-center space-y-4 shadow-lg shadow-primary/10">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-black mx-auto">2</div>
              <div>
                <h4 className="font-bold text-white text-sm font-heading">Infinity Green Energy</h4>
                <p className="text-slate-200 mt-2">Manages real-time load matching, SLDC sync, and tariff billing contracts.</p>
              </div>
            </div>

            {/* Connector */}
            <div className="lg:col-span-1 flex justify-center text-primary">
              <ArrowRight className="w-8 h-8 rotate-90 lg:rotate-0" />
            </div>

            {/* Step 3: Industrial Consumer */}
            <div className="lg:col-span-1 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 bg-primary/15 rounded-full flex items-center justify-center text-primary text-xl font-black mx-auto">3</div>
              <div>
                <h4 className="font-bold text-dark text-sm font-heading">Industrial Consumer</h4>
                <p className="text-slate-500 mt-2">Receives verified green grid power at up to 40% tariff reduction.</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 5. Industries We Serve Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
              Operational Focus
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark mt-2 uppercase tracking-tight">
              Industries We Serve
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm font-sans">
              Tailoring utility scaling parameters to fit specific energy loads across industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {targetIndustries.map((ind, index) => (
              <div key={index} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl text-center hover:bg-slate-100/50 transition-all duration-300">
                <div className="text-3xl mb-3">{ind.icon}</div>
                <h4 className="text-xs font-bold text-dark tracking-tight font-sans leading-tight">{ind.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Energy Savings Calculator Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
            Live Savings Forecasts
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-dark mt-2 uppercase tracking-tight">
            Tariff Offset Calculator
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm font-sans">
            Adjust the industrial bill parameter to estimate dynamic PPA and grid offset savings.
          </p>
        </div>
        <Calculator />
        
        <div className="mt-10 text-center bg-primary/5 p-4 rounded-xl border border-primary/10 max-w-xl mx-auto text-xs text-slate-600 font-sans">
          🔒 <strong>B2B Feature:</strong> Log in to save these calculations, customize multi-plant load profiles, and download a detailed grid feasibility report. <Link href="/login" className="text-primary font-bold hover:underline">Sign In Here</Link>
        </div>
      </section>


      {/* 7. Why Infinity Green Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
              Why Corporate Partners Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-dark mt-2 mb-6 uppercase tracking-tight leading-none">
              A Sovereign Partnership <br />for Green Power
            </h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed font-sans">
              We eliminate technical complexity, upfront capital barriers, and grid regulatory friction, allowing you to focus entirely on production.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Zero Upfront OPEX Model", desc: "No infrastructure installation investment. Pay only for the power generated." },
                { title: "SLA-Backed Performance", desc: "Guaranteed generation outputs and plant uptime monitoring dashboards." },
                { title: "State-Wide Open Access", desc: "Complete transmission synchronization and SLDC scheduling." },
                { title: "ESG Compliance Logs", desc: "Get dynamic audits and green power certificates automatically." }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span className="font-heading text-sm text-dark">{item.title}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-normal font-sans pl-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
            <h3 className="text-xl font-bold font-heading text-dark">Grid Connectivity SLA</h3>
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mt-0.5"><ShieldCheck className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold text-dark text-sm">99.5% Uptime Gurantee</h4>
                  <p className="text-slate-500">Continuous power grid sync backed by automated trading desk triggers.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary mt-0.5"><Award className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold text-dark text-sm">National Regulatory Sync</h4>
                  <p className="text-slate-500">Fully compliant with state grid-interconnection policies and CEA guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Case Studies Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
            Decarbonization In Practice
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-heading text-dark mt-2 uppercase tracking-tight">
            Case Studies
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-sm font-sans">
            Real B2B feasibility cases logging verified tariff reduction records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-100/50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-50 px-3 py-1 rounded-full">{cs.industry}</span>
                <span className="text-primary font-bold text-sm font-heading">{cs.company}</span>
              </div>
              <h3 className="text-2xl font-black text-dark font-heading uppercase mb-2">{cs.stat}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-sans">{cs.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Testimonials Section */}
      <section className="py-24 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest font-heading">
              Client Appraisals
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-heading text-white mt-2 uppercase tracking-tight">
              Corporate Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-800 border border-slate-700/60 p-8 rounded-3xl space-y-4">
                <p className="text-slate-300 italic text-sm leading-relaxed font-sans">&ldquo;{t.quote}&rdquo;</p>

                <div>
                  <h4 className="font-bold text-white text-sm font-heading">{t.author}</h4>
                  <span className="text-slate-500 text-xs font-sans">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final Consultation CTA Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
                Proposals & Custom Wheeling
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-heading text-dark mt-2 mb-6 uppercase tracking-tight leading-none">
                Schedule a Grid <br />Feasibility Study
              </h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed font-sans">
                Initiate a corporate energy audit. Submit tariff profiles to evaluate Open Access cross-subsidy charge offsets and grid injection layouts.
              </p>
              <div className="space-y-3 font-sans text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">✓</div>
                  <span>Cross-Subsidy Surcharges (CSS) Audit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">✓</div>
                  <span>State SLDC connectivity feasibility verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">✓</div>
                  <span>Net metering solar design matching your load patterns</span>
                </div>
              </div>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}