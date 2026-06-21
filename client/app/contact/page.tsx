import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { Mail, MapPin, Phone, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Infinity Green Energy',
  description: 'Contact Infinity Green Energy for general corporate, technical, press, and partnership inquiries.',
  openGraph: {
    title: 'Contact Us | Infinity Green Energy',
    description: 'Get in touch with our team for general inquiries, partnerships, support, and business communication.',
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
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-dark font-heading mt-4 mb-6 uppercase tracking-tight">
            Contact Infinity Green Energy
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Get in touch with our team for general inquiries, partnerships, support, and business communication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
              <h3 className="text-lg font-bold font-heading text-dark border-b border-slate-100 pb-3 uppercase tracking-wider text-[11px]">
                Contact Information
              </h3>
              
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Phone className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-slate-400 font-bold font-heading text-[10px] uppercase tracking-wider">Phone Number</h4>
                  <p className="text-dark text-xs md:text-sm font-sans font-semibold">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary"><Mail className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-slate-400 font-bold font-heading text-[10px] uppercase tracking-wider">Corporate Email</h4>
                  <p className="text-dark text-xs md:text-sm font-sans font-semibold">proposals@infinitygreen.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#25D366]/10 rounded-xl text-[#25D366]"><MessageSquare className="w-5 h-5" /></div>
                <div>
                  <h4 className="text-slate-400 font-bold font-heading text-[10px] uppercase tracking-wider">WhatsApp</h4>
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
                  <h4 className="text-slate-400 font-bold font-heading text-[10px] uppercase tracking-wider">Office Address</h4>
                  <p className="text-dark text-xs leading-normal font-sans font-semibold">Awaiting Corporate Office Setup, Mumbai, India</p>
                </div>
              </div>

            </div>

            {/* Regulatory advisory note */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0D7A5F_2px,transparent_2px)] [background-size:16px_16px]" />
              <div className="relative z-10 space-y-4">
                <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-primary">Media & Partners</h4>
                <p className="text-[11px] text-slate-350 leading-relaxed font-sans">
                  Infinity Green works with state regulators, MSME manufacturing groups, and independent power producers (IPPs). For policy queries or media kits, select from the inquiry menu.
                </p>
              </div>
            </div>

          </div>

          {/* General Inquiries Form */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>

      </div>
    </div>
  );
}
