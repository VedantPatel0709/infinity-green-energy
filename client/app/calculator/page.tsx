"use client";

import Calculator from '@/components/Calculator';

/**
 * Calculator Page - ROI Analysis
 */
export default function CalculatorPage() {
  return (
    <div className="py-24 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            SAVINGS <span className="text-primary">ANALYTICS</span>
          </h1>

          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            See how much you can save by switching to Infinity Green solar solutions. 
            Adjust the slider below to match your monthly expenditure.
          </p>
        </div>

        {/* 🔥 MAIN CALCULATOR COMPONENT */}
        <Calculator />

      </div>
    </div>
  );
}