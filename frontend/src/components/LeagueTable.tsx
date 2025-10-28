import React, { useState, useEffect } from 'react';
import footballService from '../utils/footballService';
import type { TeamStanding } from '../utils/footballService';
import { CACHE_TIME_MINUTES, API_URLS } from '../constants/config';

interface LeagueTableProps {
  standingsUrl?: string;
  cacheTimeInMinutes?: number;
  defaultUrl?: string;
}

// Enhanced TeamStanding interface with pool
interface EnhancedTeamStanding extends TeamStanding {
  pool?: string;
}

const LeagueTable: React.FC<LeagueTableProps> = ({
  standingsUrl,
  cacheTimeInMinutes = CACHE_TIME_MINUTES, // Default cache time from config
  defaultUrl = API_URLS.STANDINGS // Default standings URL from config
}) => {
  const [standings, setStandings] = useState<EnhancedTeamStanding[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pools, setPools] = useState<string[]>([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const urlToUse = standingsUrl || defaultUrl;
      // For API endpoints, use a different cache key
      const cacheKey = urlToUse.startsWith('/') 
        ? `league_standings_api_endpoint` 
        : `league_standings_${urlToUse}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      try {
        // Check if we have valid cached data
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const now = new Date().getTime();
          
          // Cache is still valid if less than cacheTimeInMinutes old
          if (now - timestamp < cacheTimeInMinutes * 60 * 1000) {
            processStandingsData(data);
            setIsLoading(false);
            return;
          }
        }
        
        // No valid cache, fetch fresh data
        setIsLoading(true);
        const data = await footballService.getStandings(urlToUse);
        
        // Cache the fresh data
        localStorage.setItem(
          cacheKey, 
          JSON.stringify({
            data,
            timestamp: new Date().getTime()
          })
        );
        
        processStandingsData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching league standings:', err);
        setError('Failed to load league standings');
        
        // If cache exists but is outdated, use it as a fallback
        if (cachedData) {
          const { data } = JSON.parse(cachedData);
          processStandingsData(data);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Function to process standings data and extract pools
    const processStandingsData = (data: EnhancedTeamStanding[]) => {
      setStandings(data);
      
      // Extract unique pools from the data
      const uniquePools = Array.from(
        new Set(
          data
            .map(team => team.pool)
            .filter(pool => pool !== undefined)
        )
      ) as string[];
      
      setPools(uniquePools);
    };

    fetchStandings();
  }, [standingsUrl, cacheTimeInMinutes, defaultUrl]);

  // Helper function to render a single table
  const renderTable = (tableStandings: EnhancedTeamStanding[], poolName?: string) => {
    return (
      <div className="mb-8 last:mb-0" key={poolName || 'main-table'}>
        {poolName && (
          <h3 className="text-xl font-bold mb-3 text-young-everest-primary">{poolName}</h3>
        )}
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-young-everest-primary text-white">
            <tr>
              <th className="py-3 px-4 text-left">Rank</th>
              <th className="py-3 px-4 text-left">Team</th>
              <th className="py-3 px-4 text-center">MP</th>
              <th className="py-3 px-4 text-center">W</th>
              <th className="py-3 px-4 text-center">D</th>
              <th className="py-3 px-4 text-center">L</th>
              <th className="py-3 px-4 text-center">GF</th>
              <th className="py-3 px-4 text-center">GA</th>
              <th className="py-3 px-4 text-center">GD</th>
              <th className="py-3 px-4 text-center">Pts</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {tableStandings.map((team, index) => (
              <tr 
                key={`${team.name}-${index}`}
                className={index % 2 === 0 ? 'bg-gray-50 bg-young-everest-light' : 'bg-white'}
              >
                <td className="py-3 px-4 font-medium">{index + 1}</td>

                {team.name === 'Young Everest' ? (
                  <td className="py-3 px-4 font-bold text-young-everest-primary">{team.name} FC</td>
                ) : (
                  <td className="py-3 px-4 font-medium">{team.name}</td>
                )}
                
                <td className="py-3 px-4 text-center">{team.played}</td>
                <td className="py-3 px-4 text-center">{team.wins}</td>
                <td className="py-3 px-4 text-center">{team.draws}</td>
                <td className="py-3 px-4 text-center">{team.losses}</td>
                <td className="py-3 px-4 text-center">{team.goalsFor}</td>
                <td className="py-3 px-4 text-center">{team.goalsAgainst}</td>
                <td className="py-3 px-4 text-center">{team.goalDifference}</td>
                <td className="py-3 px-4 text-center font-bold">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && standings.length === 0) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-md rounded-lg p-4">
      {pools.length > 0 ? (
        // If we have pool data, group by pool and render separate tables
        <>
          {pools.map(poolName => {
            const poolTeams = standings
              .filter(team => team.pool === poolName)
              .sort((a, b) => (b.points || 0) - (a.points || 0));
              
            return renderTable(poolTeams, poolName);
          })}
        </>
      ) : (
        // If no pool data, render a single table
        renderTable(standings)
      )}
      
      {error && (
        <div className="p-2 text-xs text-gray-500 italic text-center">
          Note: Showing cached data. Unable to fetch latest standings. {error}
        </div>
      )}
    </div>
  );
}

export default LeagueTable;