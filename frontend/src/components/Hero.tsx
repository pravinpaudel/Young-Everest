import { Link } from 'react-router-dom';
import heroImage from '../assets/images/HeroSection.png';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-young-everest-primary text-white overflow-hidden min-h-screen flex items-center">
      {/* Video background with fallback image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-black">
          {/* Fallback image shown until video loads */}
          <img 
            src={heroImage} 
            alt="Mount Everest" 
            className="w-full h-full object-cover opacity-70 absolute inset-0"
          />
          {/* Video background - replace with actual video once available */}
          <div className="absolute inset-0 bg-gradient-to-b from-young-everest-dark to-transparent opacity-80"></div>
        </div>
      </div>
      
      {/* Misty mountain animation overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="mist-layer mist-1"></div>
        <div className="mist-layer mist-2"></div>
        <div className="mist-layer mist-3"></div>
      </div>
      
      {/* Enhanced 3D Snowfall effect */}
      <div className="snowflakes-container">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="snowflake" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
      
      <div className="container-custom py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className={`transform transition-all duration-1000 ${scrolled ? 'translate-y-4 opacity-90' : ''}`}>
            <span className="bg-young-everest-secondary/80 text-young-everest-dark px-4 py-1 rounded-full text-sm font-bold tracking-wider mb-6 inline-block">A HIMALAYAN SPIRIT</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-white drop-shadow-lg">
              <span className="text-young-everest-secondary block mb-2">YOUNG EVEREST</span>
              <span className="text-white">FOOTBALL CLUB</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-young-everest-light font-medium leading-relaxed">
              Elevating the Game, <span className="text-young-everest-secondary font-semibold">One Step at a Time</span>
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/team" className="btn-secondary mountain-path text-lg font-bold px-6 py-3">
                Meet Our Team
              </Link>
              <Link to="/fixtures" className="btn-primary text-lg font-bold px-6 py-3 relative group overflow-hidden">
                <span className="relative z-10">View Fixtures</span>
                <span className="absolute inset-0 bg-young-everest-secondary transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
          
          {/* Logo section with floating animation */}
          <div className="flex justify-center">
            <div className="w-full max-w-md h-80 md:h-96 relative overflow-hidden shadow-2xl perspective-effect">
              <div className="bg-gradient-to-tr from-young-everest-primary/80 to-young-everest-dark/80 p-6 rounded-lg h-full flex items-center justify-center relative">
                <img 
                  src="/src/assets/images/Logo.png" 
                  alt="Young Everest FC Logo" 
                  className="h-3/4 w-auto object-contain z-10 float-animation bg-gray-100 rounded-lg"
                />
                {/* Mountain silhouette background */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-contain bg-bottom bg-no-repeat z-0 opacity-30 mountain-silhouette"></div */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mountain wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 z-10 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 absolute -bottom-1">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#f5f7fa"></path>
        </svg>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-2 h-3 bg-white/70 rounded-full mt-2 animate-scrollDown"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
