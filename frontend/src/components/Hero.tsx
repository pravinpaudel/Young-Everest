import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-young-everest-primary text-white">
      <div className="container-custom py-16 md:py-24">
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
              <Link to="/team" className="btn-secondary">
                Meet Our Team
              </Link>
              <Link to="/fixtures" className="btn-primary">
                View Fixtures
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md h-80 md:h-96 bg-young-everest-dark rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white text-opacity-20 text-9xl font-bold">
                YEFC
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-young-everest-secondary font-bold">
                  [Club Logo/Image Placeholder]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
