type FixtureCardProps = {
  homeTeam: string;
  awayTeam: string;
  date?: string;
  time?: string;
  venue: string;
  competition: string;
  homeScore?: number | null;
  awayScore?: number | null;
  status: string;
};

const FixtureCard = ({
  homeTeam,
  awayTeam,
  date,
  time,
  venue,
  competition,
  homeScore,
  awayScore,
  status,
}: FixtureCardProps) => {
  const isYoungEverestHome = homeTeam === 'Young Everest FC';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 bg-young-everest-light relative">
        {/* Mountain peak silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-8 mountain-pattern opacity-20"></div>
        
        <div className="text-sm text-gray-600 mb-1 flex items-center">
          <span className="inline-block w-2 h-2 bg-young-everest-secondary rounded-full mr-2"></span>
          {competition}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className={`text-lg font-bold ${isYoungEverestHome ? 'text-young-everest-primary' : ''}`}>
              {homeTeam}
            </div>
          </div>
          
          {status === "completed" ? (
            <div className="flex items-center justify-center mx-4 bg-white bg-opacity-60 px-3 py-1 rounded-full shadow-sm">
              <span className="text-2xl font-bold text-gray-800">{homeScore}</span>
              <span className="mx-2 text-gray-400">-</span>
              <span className="text-2xl font-bold text-gray-800">{awayScore}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center mx-4 bg-young-everest-secondary bg-opacity-20 px-3 py-1 rounded-full">
              <span className="text-xl font-bold text-young-everest-primary">VS</span>
            </div>
          )}
          
          <div className="flex-1 text-right">
            <div className={`text-lg font-bold ${!isYoungEverestHome ? 'text-young-everest-primary' : ''}`}>
              {awayTeam}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-wrap justify-between text-sm text-gray-600">
        <div className="flex items-center mr-4 mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
        </div>
        
        <div className="flex items-center mr-4 mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{time}</span>
        </div>
        
        <div className="flex items-center mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{venue}</span>
        </div>
      </div>
      
      {status === "completed" && (
        <div className="px-4 pb-4">
          <button className="text-young-everest-primary text-sm font-medium hover:underline flex items-center">
            <span className="mr-1">📋</span> View Match Report
          </button>
        </div>
      )}
      
      {!status && (
        <div className="w-full h-1 bg-gradient-to-r from-young-everest-primary via-young-everest-secondary to-young-everest-primary"></div>
      )}
    </div>
  );
};

export default FixtureCard;
