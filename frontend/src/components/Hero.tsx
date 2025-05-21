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
          className="w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-young-everest-dark to-young-everest-primary opacity-70"></div>
      </div>
      
      {/* Enhanced 3D Snowfall effect */}
      <div className="snowflakes-container">
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
        <div className="snowflake"></div>
      </div>
      
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
                className="absolute inset-0 m-auto h-3/4 w-auto object-contain z-10 float-animation"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mountain wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#f5f7fa"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
