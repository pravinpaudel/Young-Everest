import React, { useState } from 'react';
import footballService from '../utils/footballService';

interface ScraperConfig {
  standingsUrl: string;
  fixturesUrl: string;
  statsUrl: string;
  waitTime: number;
  selectors: {
    [key: string]: string;
  };
}

const ScrapeConfigPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'standings' | 'fixtures' | 'stats'>('standings');
  
  const [standingsConfig, setStandingsConfig] = useState<ScraperConfig>({
    standingsUrl: '',
    fixturesUrl: '',
    statsUrl: '',
    waitTime: 3000,
    selectors: {
      tableSelector: 'table.standings',
      rowSelector: 'tr:not(.header-row)',
      positionSelector: 'td.position',
      teamNameSelector: 'td.team-name',
      playedSelector: 'td.played',
      winsSelector: 'td.wins',
      drawsSelector: 'td.draws',
      lossesSelector: 'td.losses',
      goalsForSelector: 'td.goals-for',
      goalsAgainstSelector: 'td.goals-against',
      pointsSelector: 'td.points'
    }
  });
  
  const [fixturesConfig, setFixturesConfig] = useState<ScraperConfig>({
    standingsUrl: '',
    fixturesUrl: '',
    statsUrl: '',
    waitTime: 3000,
    selectors: {
      fixtureSelector: '.fixture-item',
      dateSelector: '.fixture-date',
      timeSelector: '.fixture-time',
      homeTeamSelector: '.home-team',
      awayTeamSelector: '.away-team',
      venueSelector: '.venue',
      competitionSelector: '.competition',
      scoreSelector: '.score'
    }
  });
  
  const [statsConfig, setStatsConfig] = useState<ScraperConfig>({
    standingsUrl: '',
    fixturesUrl: '',
    statsUrl: '',
    waitTime: 3000,
    selectors: {
      teamNameSelector: '.team-name',
      teamLogoSelector: '.team-logo img',
      statBlockSelector: '.team-stats .stat-block',
      statLabelSelector: '.stat-label',
      statValueSelector: '.stat-value',
      playerSelector: '.player-item'
    }
  });
  
  const handleStandingsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'standingsUrl' || name === 'waitTime') {
      setStandingsConfig({
        ...standingsConfig,
        [name]: name === 'waitTime' ? parseInt(value, 10) : value
      });
    } else {
      setStandingsConfig({
        ...standingsConfig,
        selectors: {
          ...standingsConfig.selectors,
          [name]: value
        }
      });
    }
  };
  
  const handleFixturesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'fixturesUrl' || name === 'waitTime') {
      setFixturesConfig({
        ...fixturesConfig,
        [name]: name === 'waitTime' ? parseInt(value, 10) : value
      });
    } else {
      setFixturesConfig({
        ...fixturesConfig,
        selectors: {
          ...fixturesConfig.selectors,
          [name]: value
        }
      });
    }
  };
  
  const handleStatsInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'statsUrl' || name === 'waitTime') {
      setStatsConfig({
        ...statsConfig,
        [name]: name === 'waitTime' ? parseInt(value, 10) : value
      });
    } else {
      setStatsConfig({
        ...statsConfig,
        selectors: {
          ...statsConfig.selectors,
          [name]: value
        }
      });
    }
  };
  
  const testScrape = async (type: 'standings' | 'fixtures' | 'stats') => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);
    
    try {
      let url = '';
      let selectors = {};
      let waitTime = 3000;
      
      if (type === 'standings') {
        url = standingsConfig.standingsUrl;
        selectors = standingsConfig.selectors;
        waitTime = standingsConfig.waitTime;
      } else if (type === 'fixtures') {
        url = fixturesConfig.fixturesUrl;
        selectors = fixturesConfig.selectors;
        waitTime = fixturesConfig.waitTime;
      } else if (type === 'stats') {
        url = statsConfig.statsUrl;
        selectors = statsConfig.selectors;
        waitTime = statsConfig.waitTime;
      }
      
      if (!url) {
        setError('Please enter a URL to scrape');
        setIsLoading(false);
        return;
      }
      
      const result = await footballService.testScraping(url, {
        selector: getMainSelector(type, selectors),
        waitTime,
        type,
        selectors
      });
      
      setTestResult(result.data);
    } catch (err) {
      console.error('Error testing scrape:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getMainSelector = (type: string, selectors: any): string => {
    if (type === 'standings') return selectors.tableSelector || 'table.standings';
    if (type === 'fixtures') return selectors.fixtureSelector || '.fixture-item';
    if (type === 'stats') return selectors.teamNameSelector || '.team-name';
    return 'body';
  };
  
  const saveConfiguration = () => {
    // Save to local storage for persistence
    localStorage.setItem('footballScrapeConfig', JSON.stringify({
      standings: standingsConfig,
      fixtures: fixturesConfig,
      stats: statsConfig
    }));
    
    alert('Configuration saved successfully!');
  };
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Football Data Scraper Configuration</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('standings')}
              className={`py-2 px-4 ${
                activeTab === 'standings'
                  ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Standings
            </button>
            <button
              onClick={() => setActiveTab('fixtures')}
              className={`py-2 px-4 ${
                activeTab === 'fixtures'
                  ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Fixtures
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-2 px-4 ${
                activeTab === 'stats'
                  ? 'border-b-2 border-blue-500 font-medium text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Team Stats
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'standings' && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Standings Configuration</h2>
          
          <div className="mb-4">
            <label htmlFor="standingsUrl" className="block text-sm font-medium mb-1">
              Standings URL
            </label>
            <input
              type="text"
              id="standingsUrl"
              name="standingsUrl"
              value={standingsConfig.standingsUrl}
              onChange={handleStandingsInputChange}
              placeholder="https://example.com/football/standings"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="waitTime" className="block text-sm font-medium mb-1">
              Wait Time (ms)
            </label>
            <input
              type="number"
              id="waitTime"
              name="waitTime"
              value={standingsConfig.waitTime}
              onChange={handleStandingsInputChange}
              min="0"
              max="10000"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <p className="block text-sm font-medium mb-2">CSS Selectors</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(standingsConfig.selectors).map((key) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-xs mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/selector/i, '')}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={standingsConfig.selectors[key]}
                    onChange={handleStandingsInputChange}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => testScrape('standings')}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2 disabled:bg-gray-400"
            >
              {isLoading && activeTab === 'standings' ? 'Testing...' : 'Test Configuration'}
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'fixtures' && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Fixtures Configuration</h2>
          
          <div className="mb-4">
            <label htmlFor="fixturesUrl" className="block text-sm font-medium mb-1">
              Fixtures URL
            </label>
            <input
              type="text"
              id="fixturesUrl"
              name="fixturesUrl"
              value={fixturesConfig.fixturesUrl}
              onChange={handleFixturesInputChange}
              placeholder="https://example.com/football/fixtures"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="waitTime" className="block text-sm font-medium mb-1">
              Wait Time (ms)
            </label>
            <input
              type="number"
              id="waitTime"
              name="waitTime"
              value={fixturesConfig.waitTime}
              onChange={handleFixturesInputChange}
              min="0"
              max="10000"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <p className="block text-sm font-medium mb-2">CSS Selectors</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(fixturesConfig.selectors).map((key) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-xs mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/selector/i, '')}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={fixturesConfig.selectors[key]}
                    onChange={handleFixturesInputChange}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => testScrape('fixtures')}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2 disabled:bg-gray-400"
            >
              {isLoading && activeTab === 'fixtures' ? 'Testing...' : 'Test Configuration'}
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'stats' && (
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Team Stats Configuration</h2>
          
          <div className="mb-4">
            <label htmlFor="statsUrl" className="block text-sm font-medium mb-1">
              Team Stats URL
            </label>
            <input
              type="text"
              id="statsUrl"
              name="statsUrl"
              value={statsConfig.statsUrl}
              onChange={handleStatsInputChange}
              placeholder="https://example.com/football/team-stats"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="waitTime" className="block text-sm font-medium mb-1">
              Wait Time (ms)
            </label>
            <input
              type="number"
              id="waitTime"
              name="waitTime"
              value={statsConfig.waitTime}
              onChange={handleStatsInputChange}
              min="0"
              max="10000"
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="mb-4">
            <p className="block text-sm font-medium mb-2">CSS Selectors</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(statsConfig.selectors).map((key) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-xs mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/selector/i, '')}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={statsConfig.selectors[key]}
                    onChange={handleStatsInputChange}
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => testScrape('stats')}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mr-2 disabled:bg-gray-400"
            >
              {isLoading && activeTab === 'stats' ? 'Testing...' : 'Test Configuration'}
            </button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between mb-6">
        <button
          onClick={saveConfiguration}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
        >
          Save All Configurations
        </button>
        
        <button
          onClick={() => footballService.clearCache('all')}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded"
        >
          Clear Cache
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {testResult && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Test Result:</h3>
          <div className="border rounded p-4 bg-gray-50 overflow-auto max-h-96">
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(testResult, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrapeConfigPage;
