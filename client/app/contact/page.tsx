import { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';
import { Mail, MapPin, Phone, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book Energy Consultation | Infinity Green Energy',
  description: 'Schedule a grid feasibility study or structural energy audit. Speak directly with our B2B open access planning desk.',
  openGraph: {
    title: 'Book Energy Consultation | Infinity Green Energy',
    description: 'Get in touch with our industrial power procurement desk.',
    url: 'https://infinitygreenenergy.com/contact',
    type: 'website'
  }
};

export default function ContactPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading bg-primary/10 px-3.5 py-1.5 rounded-full">
            Corporate RFP Advisory
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-dark font-heading mt-4 mb-6 uppercase tracking-tight">
            BOOK CONSULTATION
          </h1>
          <p className="text-slate-500 text-sm md:text-base">
            Ready to structure your power purchase agreement? Submit your tariff details below to request a complete feasibility audit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Phone className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-wider">Call Grid Desk</h4>
                  <p className="text-slate-500 text-xs md:text-sm font-sans font-semibold">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Mail className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-wider">Corporate Proposals</h4>
                  <p className="text-slate-500 text-xs md:text-sm font-sans font-semibold">proposals@infinitygreen.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-[#25D366] bg-[#25D366]/10"><MessageSquare className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-wider">WhatsApp Advisory</h4>
                  <a 
                    href="https://wa.me/919876543210" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline text-xs md:text-sm font-sans font-bold block"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><MapPin className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-wider">HQ Location</h4>
                  <p className="text-slate-500 text-xs leading-normal font-sans">Bandra Kurla Complex, Mumbai, MH</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Clock className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-xs uppercase tracking-wider">Trading Desk Hours</h4>
                  <p className="text-slate-500 text-xs font-sans">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <LeadForm />
          </div>
        </div>

      </div>
    </div>
  );
}
