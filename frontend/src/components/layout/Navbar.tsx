import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-[#0F0F23]/30 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-auto px-3 h-10 rounded bg-[#E11D48] flex items-center justify-center font-heading font-bold text-lg text-white group-hover:bg-white group-hover:text-[#E11D48] transition-colors">
                SRFC
              </div>
              <span className="font-heading font-bold text-base md:text-xl text-white tracking-tight hidden lg:block">Shri Raghavendra Financial Consultancy</span>
              <span className="font-heading font-bold text-xl text-white tracking-tight lg:hidden">SRFC</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-white font-medium transition-colors">About Us</Link>
            <Link to="/services" className="text-gray-300 hover:text-white font-medium transition-colors">Services</Link>
            <Link 
              to="/contact" 
              className="px-5 py-2.5 rounded-md bg-[#E11D48] text-white font-medium hover:bg-[#be1639] transition-colors cursor-pointer"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1E1B4B] border-b border-[#0F0F23]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#0F0F23]">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#0F0F23]">About Us</Link>
            <Link to="/services" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#0F0F23]">Services</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-[#E11D48] hover:bg-[#0F0F23]">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
