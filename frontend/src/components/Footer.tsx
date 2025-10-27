import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/images/Logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [activePoint, setActivePoint] = useState<number | null>(null);
  
  // Mountain map checkpoint data
  const mapPoints = [
    { id: 1, x: 20, y: 70, label: "Match Day", link: "/fixtures" },
    { id: 2, x: 35, y: 40, label: "Training Camp", link: "/team" },
    { id: 3, x: 50, y: 60, label: "Community Outreach", link: "/news" },
    { id: 4, x: 65, y: 30, label: "Summit Goal", link: "/team" },
    { id: 5, x: 80, y: 55, label: "Join Us", link: "/contact" }
  ];

  return (
    <footer className="bg-young-everest-dark text-white pt-12 pb-6 relative z-50 overflow-hidden">
      {/* Enhanced mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-young-everest-dark mountain-pattern opacity-30" aria-hidden="true"></div>
      
      {/* Misty overlay - contained within footer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="mist-layer mist-1"></div>
        <div className="mist-layer mist-2"></div>
      </div>
      
      {/* Snowfall effect - contained within footer */}
      <div className="snowflakes-container">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="snowflake" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        {/* Mountain Progress Map */}
        <div className="mb-12 px-4 py-6 bg-young-everest-primary/50 rounded-lg backdrop-blur-sm border border-young-everest-primary/30">
          <h3 className="text-xl font-bold mb-6 text-center">
            <span className="text-young-everest-secondary">Join the Ascent</span> - Follow Our Path
          </h3>
          
          <div className="relative h-48 md:h-64 w-full mx-auto">
            {/* Mountain silhouette background */}
            <svg viewBox="0 0 100 80" className="w-full h-full absolute inset-0">
              {/* Mountain backdrop */}
              <path d="M0,80 L15,45 L25,60 L35,20 L50,50 L65,10 L75,40 L85,30 L100,80 Z" 
                    fill="#0c2231" stroke="#214662" strokeWidth="0.5" />
              
              {/* Trail path */}
              <path d="M10,80 C20,60 30,70 35,50 C40,40 45,45 50,35 C55,25 60,40 70,20 C75,15 80,25 90,30" 
                    stroke="#e8952f" 
                    strokeWidth="1" 
                    strokeDasharray="2,2" 
                    fill="none" />
            </svg>
            
            {/* Interactive checkpoints */}
            {mapPoints.map((point) => (
              <div 
                key={point.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                  activePoint === point.id ? 'scale-125' : ''
                }`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onMouseEnter={() => setActivePoint(point.id)}
                onMouseLeave={() => setActivePoint(null)}
              >
                <Link to={point.link} className="block">
                  <div className="w-4 h-4 bg-young-everest-secondary rounded-full pulse-animation"></div>
                  
                  <div className={`absolute mt-2 bg-young-everest-dark/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap transform -translate-x-1/2 transition-opacity duration-300 ${
                    activePoint === point.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {point.label}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-3">
                <img 
                  src={logo} 
                  alt="Young Everest FC Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-young-everest-secondary">Young Everest FC</h3>
            </div>
            
            <p className="text-young-everest-light mb-4">
              Established in 2023, Young Everest FC embodies the spirit of the Himalayas - 
              resilience, teamwork, and the relentless pursuit of new heights in football.
            </p>
            
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-young-everest-primary/50 hover:bg-young-everest-secondary/80 transition-colors p-2 rounded-full">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-young-everest-primary/50 hover:bg-young-everest-secondary/80 transition-colors p-2 rounded-full">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-young-everest-primary/50 hover:bg-young-everest-secondary/80 transition-colors p-2 rounded-full">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-young-everest-secondary mr-2">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Base Camp Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="climbing-link hover:text-young-everest-secondary transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-2 text-young-everest-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  Home Base
                </Link>
              </li>
              <li>
                <Link to="/team" className="climbing-link hover:text-young-everest-secondary transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-2 text-young-everest-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  Climbing Team
                </Link>
              </li>
              <li>
                <Link to="/fixtures" className="climbing-link hover:text-young-everest-secondary transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-2 text-young-everest-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  Expedition Schedule
                </Link>
              </li>
              <li>
                <Link to="/news" className="climbing-link hover:text-young-everest-secondary transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-2 text-young-everest-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  Mountain Dispatches
                </Link>
              </li>
              <li>
                <Link to="/contact" className="climbing-link hover:text-young-everest-secondary transition-colors flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 mr-2 text-young-everest-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  Contact Base Camp
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-young-everest-secondary mr-2">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
              </svg>
              Training Camp Times
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-block w-2 h-2 bg-young-everest-secondary rounded-full"></span>
                </div>
                <div className="ml-2">
                  <span className="font-bold text-young-everest-secondary">Monday</span>
                  <p className="text-sm text-young-everest-light">6:00 PM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-block w-2 h-2 bg-young-everest-secondary rounded-full"></span>
                </div>
                <div className="ml-2">
                  <span className="font-bold text-young-everest-secondary">Wednesday</span>
                  <p className="text-sm text-young-everest-light">6:00 PM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-block w-2 h-2 bg-young-everest-secondary rounded-full"></span>
                </div>
                <div className="ml-2">
                  <span className="font-bold text-young-everest-secondary">Friday</span>
                  <p className="text-sm text-young-everest-light">5:30 PM - 7:30 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-block w-2 h-2 bg-young-everest-secondary rounded-full"></span>
                </div>
                <div className="ml-2">
                  <span className="font-bold text-young-everest-secondary">Saturday</span>
                  <p className="text-sm text-young-everest-light">10:00 AM - 12:00 PM (Youth)</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-young-everest-secondary mr-2">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
              Summit Contact
            </h3>
            <address className="not-italic space-y-3 text-young-everest-light">
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-young-everest-secondary mr-2 mt-1">
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
                <span>Young Everest Football Club<br/>Green Valley Stadium<br/>123 Mountain View Road<br/>Everest City, EC 12345</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-young-everest-secondary mr-2">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                <span>(123) 456-7890</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-young-everest-secondary mr-2">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                <span>info@youngeverestfc.com</span>
              </p>
            </address>
            
            {/* Newsletter signup */}
            <div className="mt-4 pt-4 border-t border-young-everest-primary/30">
              <h4 className="text-sm font-bold mb-2">EXPEDITION UPDATES</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-200 border border-young-everest-primary/20 text-white text-sm rounded-l-md focus:ring-young-everest-secondary focus:border-young-everest-secondary block w-full p-2"
                />
                <button 
                  type="submit" 
                  className="bg-young-everest-secondary text-young-everest-dark px-3 rounded-r-md font-bold hover:bg-young-everest-secondary/80"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-young-everest-primary/30 text-center">
          <div className="flex justify-center space-x-3 mb-4">
            <span className="text-young-everest-secondary text-2xl">⛰️</span>
            <span className="text-young-everest-secondary text-3xl mt-[-8px]">⛰️</span>
            <span className="text-young-everest-secondary text-4xl mt-[-12px]">⛰️</span>
            <span className="text-young-everest-secondary text-3xl mt-[-8px]">⛰️</span>
            <span className="text-young-everest-secondary text-2xl">⛰️</span>
          </div>
          <p className="text-young-everest-light">© {currentYear} Young Everest Football Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

