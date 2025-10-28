import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import LeagueTable from '../components/LeagueTable';
import Fixtures from '../components/Fixtures';
import { CACHE_TIME_MINUTES, API_URLS } from '../constants/config';

const FixturesPage = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [seasonStats, setSeasonStats] = useState({
    matchesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    cleanSheets: 0,
    goalScored: 0,
    goalsConceded: 0,
    winPercentage: 0
  })
  
  return (
    <div>
      {/* Fixtures Hero */}
      <div className="bg-young-everest-primary text-white py-16 relative overflow-hidden">
        {/* Mountain pattern with gradient overlay */}
        <div className="absolute inset-0 mountain-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-young-everest-dark opacity-40"></div>
        
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fixtures & Results</h1>
          <p className="text-xl text-young-everest-light max-w-3xl mx-auto">
            Follow Young Everest FC's journey throughout the season
          </p>
        </div>
      </div>
      
      {/* Season Stats */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-young-everest-light p-4 rounded-lg text-center shadow-md relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-16 border-r-16 border-young-everest-secondary border-opacity-10 transition-opacity duration-300 group-hover:border-opacity-20"></div>
              <div className="text-3xl font-bold text-young-everest-primary mb-1">{seasonStats.matchesPlayed}</div>
              <div className="text-sm text-gray-600">Matches Played</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center shadow-md relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-16 border-r-16 border-young-everest-secondary border-opacity-10 transition-opacity duration-300 group-hover:border-opacity-20"></div>
              <div className="text-3xl font-bold text-young-everest-primary mb-1">{seasonStats.winPercentage}%</div>
              <div className="text-sm text-gray-600">Win Rate</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center shadow-md relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-16 border-r-16 border-young-everest-secondary border-opacity-10 transition-opacity duration-300 group-hover:border-opacity-20"></div>
              <div className="text-3xl font-bold text-young-everest-primary mb-1">{seasonStats.draws}</div>
              <div className="text-sm text-gray-600">Draws</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center shadow-md relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-16 border-r-16 border-young-everest-secondary border-opacity-10 transition-opacity duration-300 group-hover:border-opacity-20"></div>
              <div className="text-3xl font-bold text-young-everest-primary mb-1">{seasonStats.goalScored}</div>
              <div className="text-sm text-gray-600">Goals Scored</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center shadow-md relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-16 border-r-16 border-young-everest-secondary border-opacity-10 transition-opacity duration-300 group-hover:border-opacity-20"></div>
              <div className="text-3xl font-bold text-young-everest-primary mb-1">{seasonStats.cleanSheets}</div>
              <div className="text-sm text-gray-600">Clean Sheets</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center shadow-md relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-16 border-r-16 border-young-everest-secondary border-opacity-10 transition-opacity duration-300 group-hover:border-opacity-20"></div>
              <div className="text-3xl font-bold text-young-everest-primary mb-1">{seasonStats.goalsConceded}</div>
              <div className="text-sm text-gray-600">Goals Conceded</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Fixtures List */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Match Schedule" 
            subtitle="All fixtures and results for the current season"
            centered
          />
          
          {/* Filter Controls */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  filter === 'all' 
                    ? 'bg-young-everest-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Matches
              </button>
              <button
                onClick={() => setFilter('upcoming')}
                className={`px-4 py-2 text-sm font-medium ${
                  filter === 'upcoming' 
                    ? 'bg-young-everest-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter('past')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  filter === 'past' 
                    ? 'bg-young-everest-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Results
              </button>
            </div>
          </div>
          
          {/* Display Fixtures */}
          <Fixtures 
            url={API_URLS.FIXTURES} 
            filter={filter}
            cacheTimeInMinutes={CACHE_TIME_MINUTES}
            setSeasonStats={setSeasonStats} 
          />
        </div>
      </section>
      
      {/* League Table */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="League Table" 
            subtitle="Current standings in the Regional League"
            centered
          />

          <LeagueTable standingsUrl={API_URLS.STANDINGS} />
        </div>
      </section>
    </div>
  );
};

export default FixturesPage;
