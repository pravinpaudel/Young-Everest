// import React, { useState, useEffect } from 'react';
// import footballService from '../utils/footballService';
// import type { TeamStanding, Fixture, TeamStats } from '../utils/footballService';

// interface FootballDataViewProps {
//   standingsUrl: string;
//   fixturesUrl: string;
//   statsUrl: string;
// }

// const FootballDataView: React.FC<FootballDataViewProps> = ({
//   standingsUrl,
//   fixturesUrl,
//   statsUrl
// }) => {
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [standings, setStandings] = useState<TeamStanding[]>([]);
//   const [fixtures, setFixtures] = useState<Fixture[]>([]);
//   const [stats, setStats] = useState<TeamStats | null>(null);
//   const [activeTab, setActiveTab] = useState<'standings' | 'fixtures' | 'stats'>('standings');

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         const data = await footballService.getAllFootballData({
//           standingsUrl,
//           fixturesUrl,
//           statsUrl
//         });
        
//         setStandings(data.standings);
//         setFixtures(data.fixtures);
//         setStats(data.stats);
//       } catch (err) {
//         console.error('Error fetching football data:', err);
//         setError('Failed to load data. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [standingsUrl, fixturesUrl, statsUrl]);
  
//   const refreshData = async () => {
//     try {
//       setIsLoading(true);
      
//       // Clear the cache first
//       await footballService.clearCache('all');
      
//       // Then fetch fresh data
//       const data = await footballService.getAllFootballData({
//         standingsUrl,
//         fixturesUrl,
//         statsUrl
//       });
      
//       setStandings(data.standings);
//       setFixtures(data.fixtures);
//       setStats(data.stats);
//       setError(null);
//     } catch (err) {
//       console.error('Error refreshing data:', err);
//       setError('Failed to refresh data. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Football Data</h1>
//         <button 
//           onClick={refreshData}
//           disabled={isLoading}
//           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
//         >
//           {isLoading ? 'Loading...' : 'Refresh Data'}
//         </button>
//       </div>
      
//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
//           <p>{error}</p>
//         </div>
//       )}
      
//       <div className="mb-6">
//         <div className="border-b border-gray-200">
//           <nav className="flex -mb-px">
//             <button
//               onClick={() => setActiveTab('standings')}
//               className={`py-2 px-4 ${
//                 activeTab === 'standings'
//                   ? 'border-b-2 border-blue-500 font-medium text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Standings
//             </button>
//             <button
//               onClick={() => setActiveTab('fixtures')}
//               className={`py-2 px-4 ${
//                 activeTab === 'fixtures'
//                   ? 'border-b-2 border-blue-500 font-medium text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Fixtures
//             </button>
//             <button
//               onClick={() => setActiveTab('stats')}
//               className={`py-2 px-4 ${
//                 activeTab === 'stats'
//                   ? 'border-b-2 border-blue-500 font-medium text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               Team Stats
//             </button>
//           </nav>
//         </div>
//       </div>
      
//       {isLoading ? (
//         <div className="flex justify-center items-center h-48">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <div className="mt-4">
//           {activeTab === 'standings' && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white border">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2 text-left border">Pos</th>
//                     <th className="px-4 py-2 text-left border">Team</th>
//                     <th className="px-4 py-2 text-center border">P</th>
//                     <th className="px-4 py-2 text-center border">W</th>
//                     <th className="px-4 py-2 text-center border">D</th>
//                     <th className="px-4 py-2 text-center border">L</th>
//                     <th className="px-4 py-2 text-center border">GF</th>
//                     <th className="px-4 py-2 text-center border">GA</th>
//                     <th className="px-4 py-2 text-center border">GD</th>
//                     <th className="px-4 py-2 text-center border">Pts</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {standings.map((team, index) => (
//                     <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
//                       <td className="px-4 py-2 border">{team.position}</td>
//                       <td className="px-4 py-2 border font-medium">{team.name}</td>
//                       <td className="px-4 py-2 text-center border">{team.played}</td>
//                       <td className="px-4 py-2 text-center border">{team.wins}</td>
//                       <td className="px-4 py-2 text-center border">{team.draws}</td>
//                       <td className="px-4 py-2 text-center border">{team.losses}</td>
//                       <td className="px-4 py-2 text-center border">{team.goalsFor}</td>
//                       <td className="px-4 py-2 text-center border">{team.goalsAgainst}</td>
//                       <td className="px-4 py-2 text-center border">{team.goalDifference}</td>
//                       <td className="px-4 py-2 text-center border font-bold">{team.points}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
          
//           {activeTab === 'fixtures' && (
//             <div className="space-y-4">
//               {fixtures.map((fixture, index) => (
//                 <div 
//                   key={index} 
//                   className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm text-gray-500">{fixture.date} • {fixture.time}</span>
//                     <span className={`text-xs px-2 py-1 rounded-full ${
//                       fixture.status === 'completed' ? 'bg-gray-200 text-gray-800' :
//                       fixture.status === 'live' ? 'bg-red-100 text-red-800' :
//                       'bg-blue-100 text-blue-800'
//                     }`}>{fixture.status}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex-1 text-right pr-3">
//                       <span className="font-medium">{fixture.homeTeam}</span>
//                     </div>
//                     <div className="px-3 py-1 bg-gray-100 rounded-md text-center min-w-20">
//                       <span className="font-bold">{fixture.score || 'vs'}</span>
//                     </div>
//                     <div className="flex-1 pl-3">
//                       <span className="font-medium">{fixture.awayTeam}</span>
//                     </div>
//                   </div>
//                   <div className="mt-2 text-sm text-gray-600">
//                     <span>{fixture.venue} • {fixture.competition}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {activeTab === 'stats' && stats && (
//             <div>
//               <div className="flex items-center mb-6">
//                 {stats.teamLogo && (
//                   <img 
//                     src={stats.teamLogo} 
//                     alt={stats.teamName} 
//                     className="w-16 h-16 object-contain mr-4"
//                   />
//                 )}
//                 <h2 className="text-2xl font-bold">{stats.teamName}</h2>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//                 {Object.entries(stats.stats).map(([key, value]) => (
//                   <div key={key} className="bg-gray-50 p-4 rounded-lg border">
//                     <div className="text-sm text-gray-500 capitalize">{key.replace(/_/g, ' ')}</div>
//                     <div className="text-xl font-bold">{value}</div>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="mt-8">
//                 <h3 className="text-xl font-bold mb-4">Top Scorers</h3>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full bg-white border">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="px-4 py-2 text-left border">Player</th>
//                         <th className="px-4 py-2 text-center border">Number</th>
//                         <th className="px-4 py-2 text-left border">Position</th>
//                         <th className="px-4 py-2 text-center border">Goals</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {stats.topScorers.map((player, index) => (
//                         <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
//                           <td className="px-4 py-2 border font-medium">{player.name}</td>
//                           <td className="px-4 py-2 text-center border">{player.number}</td>
//                           <td className="px-4 py-2 border">{player.position}</td>
//                           <td className="px-4 py-2 text-center border font-bold">{player.value}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
              
//               {stats.topAssists.length > 0 && (
//                 <div className="mt-8">
//                   <h3 className="text-xl font-bold mb-4">Top Assists</h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="px-4 py-2 text-left border">Player</th>
//                           <th className="px-4 py-2 text-center border">Number</th>
//                           <th className="px-4 py-2 text-left border">Position</th>
//                           <th className="px-4 py-2 text-center border">Assists</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {stats.topAssists.map((player, index) => (
//                           <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-50'}>
//                             <td className="px-4 py-2 border font-medium">{player.name}</td>
//                             <td className="px-4 py-2 text-center border">{player.number}</td>
//                             <td className="px-4 py-2 border">{player.position}</td>
//                             <td className="px-4 py-2 text-center border font-bold">{player.value}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FootballDataView;
