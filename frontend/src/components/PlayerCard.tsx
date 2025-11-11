import { memo } from 'react';
import jerseyImage from '../assets/images/Jersey.png'; 

interface PlayerStats {
  [key: string]: string | number;
}

interface PlayerCardProps {
  name: string;
  position: string;
  number: number;
  image?: string;
  stats?: PlayerStats;
}

const PlayerCard = memo(({ 
  name, 
  position, 
  number, 
  image = jerseyImage 
}: PlayerCardProps) => {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden group relative transition-shadow duration-300 hover:shadow-xl">
      {/* Mountain peak accent */}
      <div 
        className="absolute top-0 right-0 w-0 h-0 border-t-0 border-r-16 border-b-16 border-l-0 border-young-everest-secondary border-solid z-10"
        aria-hidden="true"
      />
      
      {/* Player image section */}
      <div className="relative h-64 overflow-hidden bg-young-everest-light">
        <img
          src={image}
          alt={`${name} - ${position}`}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Player number badge */}
        <div 
          className="absolute bottom-0 left-0 right-0 bg-young-everest-primary text-white text-center py-1 font-semibold"
          aria-label={`Jersey number ${number}`}
        >
          #{number}
        </div>
      </div>
      
      {/* Player info section */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-young-everest-primary truncate" title={name}>
          {name}
        </h3>
        <p className="text-gray-600 text-sm">{position}</p>
        
        {/* Stats section - currently disabled but ready for use */}
        {/* {stats && Object.keys(stats).length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
              <span className="mr-1" aria-hidden="true">⛰️</span> 
              <span>Stats</span>
            </h4>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <dt className="text-gray-600">{key}:</dt>
                  <dd className="font-medium">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )} */}
      </div>
    </article>
  );
});

PlayerCard.displayName = 'PlayerCard';

export default PlayerCard;
