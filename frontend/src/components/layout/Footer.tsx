import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config", err));
  }, []);

  if (!config) return <footer className="bg-[#0F0F23] py-10 border-t border-[#1E1B4B]" />;

  return (
    <footer className="bg-[#0F0F23] text-gray-300">
      
      {/* Social Proof Section (Above Footer) */}
      <div className="bg-[#1E1B4B] py-16 border-t border-b border-[#0F0F23]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Testimonials */}
          <div className="mb-16 overflow-hidden">
            <h3 className="text-center font-heading text-2xl text-white mb-10">What Our Clients Say</h3>
            
            {/* Infinite Marquee Container */}
            <div className="relative flex overflow-hidden group">
              {/* Fade gradients on edges */}
              <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#1E1B4B] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#1E1B4B] to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max gap-8">
                {[...(config.testimonials || []), ...(config.testimonials || [])].map((t: any, idx: number) => (
                  <div key={idx} className="bg-[#0F0F23] p-8 rounded-xl border border-gray-800 shadow-lg relative w-[400px] shrink-0">
                    <div className="text-4xl text-[#E11D48] absolute top-4 left-4 opacity-20">"</div>
                    <p className="italic text-gray-300 mb-6 relative z-10">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center font-bold text-white shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-white">{t.name}</h4>
                        <p className="text-sm text-gray-400">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Logos Marquee */}
          <div>
            <h3 className="text-center font-heading text-xl text-gray-400 mb-8 uppercase tracking-widest text-sm">Trusted By</h3>
            <div className="flex justify-center flex-wrap gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {config.clients?.map((client: any, idx: number) => (
                <div key={idx} className="flex items-center justify-center p-4 bg-[#0F0F23] rounded-lg border border-gray-800 w-40">
                  <span className="font-bold font-heading">{client.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[#E11D48] transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-[#E11D48] transition-colors">About Us</a></li>
              <li><a href="/#services" className="hover:text-[#E11D48] transition-colors">Services</a></li>
              <li><a href="/contact" className="hover:text-[#E11D48] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#E11D48] shrink-0 mt-1" size={20} />
                <span>{config.company.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#E11D48] shrink-0" size={20} />
                <span>{config.company.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#E11D48] shrink-0" size={20} />
                <span>{config.company.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {config.company.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
