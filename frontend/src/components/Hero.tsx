import { Link } from 'react-router-dom';
import heroImage from '../assets/images/HeroSection.png';

const Hero = () => {
  return (
    <div className="relative bg-young-everest-primary text-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Mount Everest" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-young-everest-dark to-young-everest-primary opacity-80"></div>
      </div>
      
      {/* Snowfall effect */}
      <div className="absolute inset-0 z-0 snowfall"></div>
      
      <div className="container-custom py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-young-everest-secondary">YOUNG EVEREST</span> FOOTBALL CLUB
            </h1>
            <p className="text-lg md:text-xl mb-8 text-young-everest-light">
              Elevating the game, one step at a time. Dedicated to developing talent
              and fostering a love for football in our community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/team" className="btn-secondary mountain-path">
                Meet Our Team
              </Link>
              <Link to="/fixtures" className="btn-primary">
                View Fixtures
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-80 md:h-96 bg-young-everest-dark bg-opacity-50 rounded-lg relative overflow-hidden border-2 border-young-everest-secondary shadow-2xl">
              <img 
                src="/src/assets/images/Logo.png" 
                alt="Young Everest FC Logo" 
                className="absolute inset-0 m-auto h-3/4 w-auto object-contain z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
