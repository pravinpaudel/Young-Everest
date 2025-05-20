import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import FixtureCard from '../components/FixtureCard';
import { fixtures } from '../utils/mockData';

const FixturesPage = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  
  const filteredFixtures = fixtures.filter(fixture => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return !fixture.isCompleted;
    if (filter === 'past') return fixture.isCompleted;
    return true;
  });
  
  return (
    <div>
      {/* Fixtures Hero */}
      <div className="bg-young-everest-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fixtures & Results</h1>
          <p className="text-xl text-young-everest-light max-w-3xl mx-auto">
            Follow Young Everest FC's journey throughout the season
          </p>
        </div>
      </div>
      
      {/* Season Stats */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-young-everest-light p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-young-everest-primary mb-1">14</div>
              <div className="text-sm text-gray-600">Matches Played</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-young-everest-primary mb-1">9</div>
              <div className="text-sm text-gray-600">Wins</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-young-everest-primary mb-1">3</div>
              <div className="text-sm text-gray-600">Draws</div>
            </div>
            <div className="bg-young-everest-light p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-young-everest-primary mb-1">2</div>
              <div className="text-sm text-gray-600">Losses</div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFixtures.length > 0 ? (
              filteredFixtures.map(fixture => (
                <FixtureCard 
                  key={fixture.id}
                  homeTeam={fixture.homeTeam}
                  awayTeam={fixture.awayTeam}
                  date={fixture.date}
                  time={fixture.time}
                  venue={fixture.venue}
                  competition={fixture.competition}
                  homeScore={fixture.homeScore}
                  awayScore={fixture.awayScore}
                  isCompleted={fixture.isCompleted}
                />
              ))
            ) : (
              <div className="col-span-2 py-16 text-center text-gray-500">
                No fixtures found for the selected filter.
              </div>
            )}
          </div>
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
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-young-everest-primary text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Pos</th>
                  <th className="py-3 px-4 text-left">Team</th>
                  <th className="py-3 px-4 text-center">P</th>
                  <th className="py-3 px-4 text-center">W</th>
                  <th className="py-3 px-4 text-center">D</th>
                  <th className="py-3 px-4 text-center">L</th>
                  <th className="py-3 px-4 text-center">GF</th>
                  <th className="py-3 px-4 text-center">GA</th>
                  <th className="py-3 px-4 text-center">GD</th>
                  <th className="py-3 px-4 text-center">Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 bg-young-everest-light">
                  <td className="py-3 px-4">1</td>
                  <td className="py-3 px-4 font-medium">Forest Rangers</td>
                  <td className="py-3 px-4 text-center">15</td>
                  <td className="py-3 px-4 text-center">11</td>
                  <td className="py-3 px-4 text-center">2</td>
                  <td className="py-3 px-4 text-center">2</td>
                  <td className="py-3 px-4 text-center">35</td>
                  <td className="py-3 px-4 text-center">15</td>
                  <td className="py-3 px-4 text-center">+20</td>
                  <td className="py-3 px-4 text-center font-bold">35</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">2</td>
                  <td className="py-3 px-4 font-medium">Coastal United</td>
                  <td className="py-3 px-4 text-center">15</td>
                  <td className="py-3 px-4 text-center">10</td>
                  <td className="py-3 px-4 text-center">3</td>
                  <td className="py-3 px-4 text-center">2</td>
                  <td className="py-3 px-4 text-center">28</td>
                  <td className="py-3 px-4 text-center">14</td>
                  <td className="py-3 px-4 text-center">+14</td>
                  <td className="py-3 px-4 text-center font-bold">33</td>
                </tr>
                <tr className="border-b border-gray-200 bg-young-everest-light font-medium">
                  <td className="py-3 px-4">3</td>
                  <td className="py-3 px-4 text-young-everest-primary">Young Everest FC</td>
                  <td className="py-3 px-4 text-center">14</td>
                  <td className="py-3 px-4 text-center">9</td>
                  <td className="py-3 px-4 text-center">3</td>
                  <td className="py-3 px-4 text-center">2</td>
                  <td className="py-3 px-4 text-center">30</td>
                  <td className="py-3 px-4 text-center">16</td>
                  <td className="py-3 px-4 text-center">+14</td>
                  <td className="py-3 px-4 text-center font-bold">30</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">4</td>
                  <td className="py-3 px-4 font-medium">Metro Stars</td>
                  <td className="py-3 px-4 text-center">15</td>
                  <td className="py-3 px-4 text-center">8</td>
                  <td className="py-3 px-4 text-center">4</td>
                  <td className="py-3 px-4 text-center">3</td>
                  <td className="py-3 px-4 text-center">26</td>
                  <td className="py-3 px-4 text-center">17</td>
                  <td className="py-3 px-4 text-center">+9</td>
                  <td className="py-3 px-4 text-center font-bold">28</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">5</td>
                  <td className="py-3 px-4 font-medium">Mountain Lions</td>
                  <td className="py-3 px-4 text-center">15</td>
                  <td className="py-3 px-4 text-center">7</td>
                  <td className="py-3 px-4 text-center">5</td>
                  <td className="py-3 px-4 text-center">3</td>
                  <td className="py-3 px-4 text-center">22</td>
                  <td className="py-3 px-4 text-center">18</td>
                  <td className="py-3 px-4 text-center">+4</td>
                  <td className="py-3 px-4 text-center font-bold">26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FixturesPage;
