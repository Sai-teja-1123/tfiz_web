import React from 'react';
import { ShoppingBag, Menu, X, Settings } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80; // account for fixed navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-black/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => (window.location.href = '/')}
            className="flex items-center gap-3 focus:outline-none"
          >
            <img
              src="/logo.jpeg"
              alt="TFIZ logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-3xl font-black italic tracking-tighter leading-none">
              TFiZ
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('shop')}
            className="text-sm font-medium hover:text-black/60 transition-colors"
          >
            Shop
          </button>
          <button
            onClick={() => scrollToSection('shop')}
            className="text-sm font-medium hover:text-black/60 transition-colors"
          >
            Collections
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium hover:text-black/60 transition-colors"
          >
            About
          </button>
          
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-black/10">
            <button 
              onClick={onCartClick}
              className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={onCartClick} className="relative p-2">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 md:hidden">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                scrollToSection('shop');
                setIsMenuOpen(false);
              }}
              className="text-left text-lg font-bold"
            >
              Shop
            </button>
            <button
              onClick={() => {
                scrollToSection('shop');
                setIsMenuOpen(false);
              }}
              className="text-left text-lg font-bold"
            >
              Collections
            </button>
            <button
              onClick={() => {
                scrollToSection('about');
                setIsMenuOpen(false);
              }}
              className="text-left text-lg font-bold"
            >
              About
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
