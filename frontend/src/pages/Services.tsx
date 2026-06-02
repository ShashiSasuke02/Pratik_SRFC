import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Services() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config", err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* BACKGROUND WRAPPER */}
      <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Gemini.png')" }}>
        <div className="absolute inset-0 bg-[#0F0F23]/85 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* HERO SECTION */}
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-white">Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
              Comprehensive financial, compliance, and digital solutions engineered to scale your business.
            </p>
          </div>

          {/* SERVICES LIST */}
          <div className="space-y-16 md:space-y-32">
            {config?.services?.map((service: any, index: number) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Details Side */}
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-heading font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed font-light mb-8">
                    {service.description}
                  </p>
                  
                  {service.features && (
                    <ul className="space-y-4">
                      {service.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4">
                          <CheckCircle2 className="text-[#E11D48] shrink-0 mt-1" size={24} />
                          <span className="text-lg text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Pricing & CTA Side */}
                <div className="w-full md:w-[400px] shrink-0">
                  <div className="bg-[#1E1B4B]/40 backdrop-blur-md p-8 rounded-3xl border border-gray-700 shadow-[0_0_40px_rgba(30,27,75,0.5)] hover:border-[#E11D48]/50 transition-all duration-500 relative overflow-hidden group">
                    {/* Subtle glow effect */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E11D48] rounded-full blur-[80px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
                    
                    <div className="relative z-10 text-center">
                      <p className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-4">Starting from just</p>
                      
                      {service.pricing && (
                        <div className="mb-8">
                          <div className="text-3xl font-bold text-white mb-2">
                            {service.pricing.startingAt}
                          </div>
                          <p className="text-sm text-gray-400 italic">
                            {service.pricing.note}
                          </p>
                        </div>
                      )}

                      <Link 
                        to={`/contact?service=${service.id}`} 
                        className="group/btn relative inline-flex w-full items-center justify-center px-8 py-4 font-bold text-white bg-gradient-to-r from-[#E11D48] to-[#be123c] rounded-full overflow-hidden transition-all hover:scale-[1.02] shadow-lg hover:shadow-[#E11D48]/30"
                      >
                        <span className="flex items-center gap-2">
                          Inquire Now <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
