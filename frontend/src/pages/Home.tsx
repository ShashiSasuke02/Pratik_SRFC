import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Calculator, Building2, FileCheck2, Globe } from 'lucide-react';

export default function Home() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config", err));
  }, []);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'audit-accounting': return <Calculator className="w-12 h-12 text-[#E11D48] mb-6 group-hover:scale-110 transition-transform" />;
      case 'income-tax-gst': return <FileCheck2 className="w-12 h-12 text-[#E11D48] mb-6 group-hover:scale-110 transition-transform" />;
      case 'mca-compliances': return <Building2 className="w-12 h-12 text-[#E11D48] mb-6 group-hover:scale-110 transition-transform" />;
      case 'pf-pt-esic': return <Briefcase className="w-12 h-12 text-[#E11D48] mb-6 group-hover:scale-110 transition-transform" />;
      case 'website-building': return <Globe className="w-12 h-12 text-[#E11D48] mb-6 group-hover:scale-110 transition-transform" />;
      default: return <Briefcase className="w-12 h-12 text-[#E11D48] mb-6 group-hover:scale-110 transition-transform" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* SHARED BACKGROUND FOR HERO AND SERVICES */}
      <div 
        className="relative w-full bg-cover bg-[center_15%] bg-no-repeat"
        style={{ backgroundImage: "url('/Gemini_Generated.png?v=2')" }}
      >
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[700px] flex items-center overflow-hidden">
          {/* Dark overlay to ensure text readability over the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-start text-left">
          <p className="text-[#E11D48] font-bold tracking-wider uppercase mb-4 text-sm"># let's Grow Your Business</p>
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight max-w-3xl">
            Together We can Make <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-white">Business Great Again</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Optimize your tax strategy and streamline your corporate finances at an affordable cost. We don't just crunch numbers; we engineer business growth.
          </p>
          <Link 
            to="/contact" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-[#E11D48] rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-2">JOIN US NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
          </Link>
        </div>
      </section>

        {/* HORIZONTAL SCROLL SERVICES */}
        <section 
          id="services" 
          className="relative z-20 w-full py-20 border-b border-gray-900"
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Our Core Services</h2>
            <p className="text-gray-400 mt-2">Swipe to explore our comprehensive financial solutions</p>
          </div>
          
          {/* Infinite Marquee Container */}
          <div className="relative flex overflow-hidden group py-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {/* Fade gradients on edges */}
            <div className="absolute top-0 left-0 w-16 sm:w-32 h-full bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 sm:w-32 h-full bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max gap-6">
              {[...(config?.services || []), ...(config?.services || [])].map((service: any, idx: number) => (
                <div 
                  key={`${service.id}-${idx}`} 
                  className="group bg-[#1E1B4B]/90 backdrop-blur-md rounded-2xl p-8 border border-gray-700 hover:border-[#E11D48] hover:bg-[#1E1B4B] transition-all hover:-translate-y-2 shadow-2xl overflow-hidden relative shrink-0 w-[85vw] sm:w-[350px]"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    {getServiceIcon(service.id)}
                  </div>
                  {getServiceIcon(service.id)}
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        </section>
      </div>

      {/* MISSION & VISION */}
      <section className="py-24 bg-black border-t border-[#1E1B4B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold text-white mb-6">Our Mission & Vision</h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            {config?.company?.mission || "Standards compliant e-business. Phosfluorescently expedite functional products via premium action items wireless innovation compliant e-business."}
          </p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section 
        className="py-24 relative border-t border-[#1E1B4B] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Gemini.png')" }}
      >
        {/* Dark overlay to ensure text and cards remain readable over the image */}
        <div className="absolute inset-0 bg-[#0F0F23]/85 backdrop-blur-sm"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Meet Our Leaders</h2>
          </div> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {config?.team?.map((member: any, idx: number) => (
              <div key={idx} className="bg-black p-8 rounded-2xl border border-gray-800 text-center hover:border-gray-600 transition-colors">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#E11D48] to-[#1E1B4B] flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">{member.name}</h3>
                <p className="text-[#E11D48] font-medium tracking-wide uppercase text-sm mb-6">{member.title}</p>
                
                {(member.education || member.experience) && (
                  <div className="pt-6 border-t border-gray-800/50 text-left space-y-4">
                    {member.education && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Education</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{member.education}</p>
                      </div>
                    )}
                    {member.experience && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Experience & Expertise</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{member.experience}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
