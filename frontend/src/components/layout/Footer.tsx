import { useEffect, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <footer 
      className="text-gray-300 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Gemini.png')" }}
    >
      {/* Dark overlay for readability over the background image */}
      <div className="absolute inset-0 bg-[#0F0F23]/85 backdrop-blur-sm"></div>
      
      <div className="relative z-10">
        {/* Social Proof Section (Above Footer) */}
        <div className="bg-transparent py-16 border-t border-b border-[#0F0F23]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Testimonials */}
            <div className="mb-16 overflow-hidden">
              <h3 className="text-center font-heading text-2xl text-white mb-10">What Our Clients Say</h3>
              
              {/* Infinite Marquee Container */}
              <div className="relative flex overflow-hidden group">
                {/* Fade gradients on edges */}
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#0F0F23] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#0F0F23] to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max gap-8">
                  {[...(config.testimonials || []), ...(config.testimonials || [])].map((t: any, idx: number) => (
                    <div key={idx} className="bg-[#0F0F23]/80 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg relative w-[400px] shrink-0">
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
              <h3 className="text-center font-heading text-white font-bold mb-8 uppercase tracking-widest text-xl">Trusted By</h3>
              <div className="flex justify-center flex-wrap gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {config.clients?.map((client: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-center p-4 bg-[#0F0F23]/80 backdrop-blur-sm rounded-lg border border-gray-800 w-40">
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
                <li><Link to="/" className="hover:text-[#E11D48] transition-colors">Home</Link></li>
                <li><Link to="/about" className="hover:text-[#E11D48] transition-colors">About Us</Link></li>
                <li><Link to="/services" className="hover:text-[#E11D48] transition-colors">Services</Link></li>
                <li><Link to="/contact" className="hover:text-[#E11D48] transition-colors">Contact</Link></li>
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

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {config.company.name}. All rights reserved.
            </div>
            
            {/* Social Links */}
            {config.socials && (
              <div className="flex gap-4">
                {config.socials.map((social: any, idx: number) => {
                  let Icon = (props: any) => (
                    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                  );
                  
                  if (social.platform.toLowerCase() === 'linkedin') {
                    Icon = (props: any) => (
                      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    );
                  }
                  if (social.platform.toLowerCase() === 'instagram') {
                    Icon = (props: any) => (
                      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    );
                  }
                  if (social.platform.toLowerCase() === 'facebook') {
                    Icon = (props: any) => (
                      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    );
                  }
                  
                  return (
                    <a 
                      key={idx} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#1E1B4B] border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#E11D48] hover:bg-[#E11D48]/20 transition-all shadow-lg hover:-translate-y-1"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
