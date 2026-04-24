import LeadForm from '@/components/LeadForm';
import { Mail, MapPin, Phone } from 'lucide-react';

/**
 * Contact Page - Inquiry and contact information
 */
export default function ContactPage() {
  return (
    <div className="py-24 px-4 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            GET IN <span className="text-primary">TOUCH</span>
          </h1>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
            Have questions about solar installation? Our team is here to help you 
            transition to clean energy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Phone /></div>
                <div>
                  <h4 className="text-white font-bold">Call Us</h4>
                  <p className="text-zinc-400">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Mail /></div>
                <div>
                  <h4 className="text-white font-bold">Email Us</h4>
                  <p className="text-zinc-400">info@infinitygreen.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><MapPin /></div>
                <div>
                  <h4 className="text-white font-bold">Visit Us</h4>
                  <p className="text-zinc-400">123 Solar Plaza, Mumbai, MH</p>
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
