import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, Lightbulb, Heart, Award, CheckCircle2 } from 'lucide-react';

export default function About() {
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config", err));
  }, []);

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'integrity': return <Shield size={40} className="text-[#E11D48]" />;
      case 'excellence': return <Star size={40} className="text-[#E11D48]" />;
      case 'innovation': return <Lightbulb size={40} className="text-[#E11D48]" />;
      case 'client-centric': return <Heart size={40} className="text-[#E11D48]" />;
      default: return <CheckCircle2 size={40} className="text-[#E11D48]" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* BACKGROUND WRAPPER */}
      <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Gemini.png')" }}>
        <div className="absolute inset-0 bg-[#0F0F23]/85 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E11D48] to-white">Story</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              We are a dedicated team of financial experts, committed to engineering growth and ensuring compliance for businesses across India.
            </p>
          </div>
        </section>

        {/* FIRM HISTORY / TIMELINE */}
        <section className="py-20 px-4 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white text-center mb-16">Our Journey</h2>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
              {config?.history?.map((milestone: any, idx: number) => (
                <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                  
                  {/* Timeline Node */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0F0F23] bg-[#E11D48] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                  
                  {/* Timeline Content */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#1E1B4B]/40 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-[#E11D48]/50 transition-colors shadow-xl">
                    <div className="flex flex-col mb-2">
                      <span className="font-heading font-bold text-[#E11D48] text-xl mb-1">{milestone.year}</span>
                      <h3 className="text-2xl font-bold text-white">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-20 px-4 border-t border-white/5 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Core Values</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide our decisions and shape our client relationships.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {config?.values?.map((value: any, idx: number) => (
                <div key={idx} className="bg-[#1E1B4B]/30 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-[#E11D48] transition-all hover:-translate-y-2 group shadow-xl">
                  <div className="mb-6 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                    {getIcon(value.title)}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="py-20 px-4 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Meet Our Leaders</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">The visionary minds behind SRFC's success.</p>
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {config?.team?.map((member: any, idx: number) => (
                <div key={idx} className="bg-transparent p-8 rounded-2xl border-4 border-black text-center hover:border-gray-900 hover:bg-white/5 transition-all shadow-lg flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#E11D48] to-[#1E1B4B] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(225,29,72,0.3)] overflow-hidden">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <span className="text-5xl font-bold text-white">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-[#E11D48] font-bold tracking-widest uppercase text-sm mb-6">{member.title}</p>
                  
                  {(member.education || member.experience) && (
                    <div className="pt-6 border-t border-gray-800/50 w-full text-left space-y-6">
                      {member.education && (
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Education</p>
                          <p className="text-lg text-gray-300 leading-relaxed font-light">{member.education}</p>
                        </div>
                      )}
                      {member.experience && (
                        <div>
                          <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Expertise</p>
                          <p className="text-lg text-gray-300 leading-relaxed font-light">{member.experience}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS / AWARDS */}
        <section className="py-20 px-4 border-t border-white/5 bg-black/40">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-10">Certifications & Accreditations</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {config?.certifications?.map((cert: string, idx: number) => (
                <div key={idx} className="flex items-center gap-3 bg-[#1E1B4B]/50 backdrop-blur-sm px-6 py-4 rounded-full border border-gray-700 hover:border-[#E11D48] transition-colors cursor-default shadow-lg">
                  <Award className="text-[#E11D48]" size={24} />
                  <span className="text-white font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1E1B4B] to-[#0F0F23] rounded-3xl p-12 text-center border border-gray-700 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E11D48] rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#E11D48] rounded-full blur-[100px] opacity-20"></div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 relative z-10">Ready to Grow Your Business?</h2>
            <p className="text-xl text-gray-300 mb-10 relative z-10 font-light">Let our experts handle the compliance while you focus on what you do best.</p>
            
            <Link 
              to="/contact" 
              className="group relative z-10 inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-[#E11D48] rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)]"
            >
              <span className="flex items-center gap-3 text-lg">Contact Us for a Consultation <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" /></span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
