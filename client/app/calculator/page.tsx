"use client";

import Calculator from '@/components/Calculator';

/**
 * Calculator Page - ROI Analysis
 */
export default function CalculatorPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
            Feasibility Forecasting
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-dark font-heading mt-2 mb-6 uppercase tracking-tighter">
            SAVINGS <span className="text-primary">ANALYTICS</span>
          </h1>

          <p className="text-slate-500 max-w-2xl mx-auto text-base font-sans">
            Forecast your industrial plant or commercial property savings when switching to Infinity Green power options. Adjust the slider below based on your current corporate power expenditure.
          </p>
        </div>

        {/* 🔥 MAIN CALCULATOR COMPONENT */}
        <Calculator />

      </div>
    </div>
  );
}