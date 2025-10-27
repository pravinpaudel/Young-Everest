import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/images/Logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
    { name: 'Fixtures', path: '/fixtures' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-young-everest-primary text-white shadow-md z-50 relative">
      {/* Mountain peak accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-young-everest-secondary"></div>
      
      {/* Subtle snowfall effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="snowflakes-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="container-custom py-3 relative z-10">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="h-14 w-14 rounded-full bg-white p-1 shadow-lg transform transition-transform group-hover:scale-105">
              <img src={logo} alt="Young Everest FC Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="font-display text-xl md:text-2xl font-bold text-white block">
                <span className="text-young-everest-secondary">YOUNG</span> EVEREST
              </span>
              <span className="text-xs text-young-everest-light tracking-wider">A HIMALAYAN SPIRIT FOOTBALL CLUB</span>
            </div>
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 text-white bg-young-everest-dark/50 rounded-md"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`climbing-link hover:text-young-everest-secondary transition-colors font-bold relative outline-none focus:outline-none ${
                  isActive(link.path) 
                    ? 'text-young-everest-secondary' 
                    : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="btn-secondary text-sm px-4 py-2 ml-2">
              Join the Club
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-3 pb-4 space-y-2 mt-3 bg-young-everest-dark/90 backdrop-blur-sm rounded-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-2 px-4 ${
                  isActive(link.path)
                    ? 'bg-young-everest-primary text-young-everest-secondary font-bold border-l-4 border-young-everest-secondary'
                    : 'hover:bg-young-everest-primary/50 hover:text-young-everest-secondary'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 pt-3 mt-2 border-t border-young-everest-primary/30">
              <Link 
                to="/contact" 
                className="block w-full py-2 px-4 bg-young-everest-secondary text-young-everest-dark font-bold text-center rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Join the Club
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
