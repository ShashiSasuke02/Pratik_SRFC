import { useState, useEffect } from 'react';
import { Send, MapPin, Mail, Phone, Loader2 } from 'lucide-react';

export default function Contact() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(err => console.error("Failed to load config", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setSuccess(true);
      setFormData({ fullName: '', email: '', mobile: '', service: '', message: '' });
    } catch (err) {
      setError('An error occurred while submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* BACKGROUND WRAPPER */}
      <div className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/Gemini.png')" }}>
        <div className="absolute inset-0 bg-[#0F0F23]/85 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Get In Touch</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Ready to grow your business? Contact us today for professional financial preparations, accounting solutions, and compliance services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info & Map */}
        <div className="space-y-8">
          <div className="bg-[#1E1B4B] p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-heading font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0F0F23] flex items-center justify-center shrink-0 border border-gray-800">
                  <MapPin className="text-[#E11D48]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Our Location</h4>
                  <p className="text-gray-400">{config?.company?.location || 'MALHARI Plot no 15 chandrikalayout, lakamanahalli, Dharwad'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0F0F23] flex items-center justify-center shrink-0 border border-gray-800">
                  <Phone className="text-[#E11D48]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Phone Number</h4>
                  <p className="text-gray-400">{config?.company?.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0F0F23] flex items-center justify-center shrink-0 border border-gray-800">
                  <Mail className="text-[#E11D48]" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Address</h4>
                  <p className="text-gray-400">{config?.company?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.693635956976!2d75.00690041132714!3d15.43574163013233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d2afda2d7b4b%3A0xc6e4b85523a1a62d!2sLakamanahalli%2C%20Dharwad%2C%20Karnataka%20580004!5e0!3m2!1sen!2sin!4v1709292112345!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#1E1B4B] p-8 md:p-10 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
          {/* Abstract glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E11D48]/10 rounded-full blur-[80px]"></div>

          <h3 className="text-2xl font-heading font-bold text-white mb-8 relative z-10">Send Us a Message</h3>
          
          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-lg mb-6 relative z-10">
              Thank you! Your message has been sent successfully. We will get back to you soon.
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6 relative z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-[#0F0F23] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0F0F23] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
                <input 
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0F0F23] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Service Interested In</label>
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full bg-[#0F0F23] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] transition-colors appearance-none"
              >
                <option value="">Select a service...</option>
                {config?.services?.map((s: any) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-[#0F0F23] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#E11D48] transition-colors resize-none"
                placeholder="Tell us about your requirements..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#E11D48] hover:bg-[#be1639] text-white font-bold py-4 rounded-lg transition-colors flex justify-center items-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} /> Sending...</>
              ) : (
                <><Send size={20} /> Send Message</>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
    </div>
  );
}
