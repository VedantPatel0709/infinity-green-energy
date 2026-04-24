"use client";

import { useRouter } from "next/navigation";
import Hero from '@/components/Hero';
import LeadForm from '@/components/LeadForm';

/**
 * Home Page - Infinity Green Energy
 */
export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-black">
      <Hero />

      {/* 🔥 NEW BUTTON (optional but recommended) */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push("/calculator")}
          className="btn-primary"
        >
          Calculate Savings
        </button>
      </div>
      
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                Ready to <span className="text-primary">Switch?</span>
              </h2>
              
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Join thousands of homeowners and businesses in the green revolution. 
                Our experts will analyze your property and provide a custom solar roadmap.
              </p>
              
              <ul className="space-y-4">
                {[
                  'Free Site Survey',
                  'Zero Upfront Cost Options',
                  'Government Subsidy Assistance',
                  'Premium Tier-1 Modules'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div id="contact">
              <LeadForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}