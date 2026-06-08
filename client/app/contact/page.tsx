import LeadForm from '@/components/LeadForm';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

/**
 * Contact Page - Inquiry and contact information
 */
export default function ContactPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-light min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest font-heading">
            Corporate Advisory
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-dark font-heading mt-2 mb-6 uppercase tracking-tighter">
            GET IN <span className="text-primary">TOUCH</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base font-sans">
            Ready to optimize your industrial energy tariff? Contact our national grid planning team for feasibility analysis and PPA structuring.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Phone className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-sm">Call Grid Desk</h4>
                  <p className="text-slate-500 text-sm font-sans">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Mail className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-sm">Corporate RFP / Mail</h4>
                  <p className="text-slate-500 text-sm font-sans">proposals@infinitygreen.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><MapPin className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-sm">HQ Address</h4>
                  <p className="text-slate-500 text-xs leading-normal font-sans">Bandra Kurla Complex, Mumbai, MH</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Clock className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-dark font-bold font-heading text-sm">Trading Desk Hours</h4>
                  <p className="text-slate-500 text-xs font-sans">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-2">
            <LeadForm />
          </div>
        </div>
      </div>
    </div>
  );
}
