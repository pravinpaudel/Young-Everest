import { useEffect } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import FixtureCard from '../components/FixtureCard';
import NewsCard from '../components/NewsCard';
import PlayerCard from '../components/PlayerCard';
import { news, players } from '../utils/mockData';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchFixtures } from '../store/slices/fixturesSlice';
import { selectUpcomingFixturesLimited, selectFixturesLoading } from '../store/selectors';
import type { Fixture } from '../utils/footballService';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const upcomingFixtures = useAppSelector(selectUpcomingFixturesLimited(3));
  const isLoadingFixtures = useAppSelector(selectFixturesLoading);
  
  // Get latest news (max 3)
  const latestNews = news.slice(0, 3);
  
  // Get featured players (4 players)
  const featuredPlayers = players.slice(0, 4);

  // Fetch fixtures when component mounts
  useEffect(() => {
    dispatch(fetchFixtures({
      url: "https://www.peisoccer.com/division/1387/31540/games",
      cacheTimeInMinutes: 60,
      filter: "upcoming"
    }));
  }, [dispatch]);
  
  return (
    <div>
      <Hero />
      
      {/* Upcoming Matches Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Upcoming Matches" 
            subtitle="Support Young Everest FC in our upcoming fixtures"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingFixtures ? (
              // Loading skeleton for 3 fixture cards
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              ))
            ) : upcomingFixtures.length > 0 ? (
              upcomingFixtures.map((fixture: Fixture, index: number) => {
                const date = fixture.timestamp ? new Date(fixture.timestamp) : null;
                const formattedDate = date ? date.toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }) : undefined;

                const formattedTime = date ? date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                }) : undefined;

                return (
                  <FixtureCard 
                    key={index}
                    homeTeam={fixture.homeTeam}
                    awayTeam={fixture.awayTeam}
                    date={formattedDate}
                    time={formattedTime}
                    venue={fixture.venue}
                    competition={fixture.competition}
                    homeScore={fixture.homeScore}
                    awayScore={fixture.awayScore}
                    status={fixture.status}
                  />
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-500">
                <p className="text-lg mb-2">No upcoming fixtures scheduled</p>
                <p className="text-sm">Check back later for new match announcements</p>
              </div>
            )}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/fixtures" className="btn-primary">
              View All Fixtures
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Players Section */}
      <section className="py-16 bg-young-everest-light mountain-pattern">
        <div className="container-custom">
          <SectionTitle 
            title="Our Star Players" 
            subtitle="Meet the talent behind Young Everest FC"
            centered
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPlayers.map(player => (
              <PlayerCard 
                key={player.id}
                name={player.name}
                position={player.position}
                number={player.number}
                image={player.image}
                stats={player.stats}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/team" className="btn-primary">
              Meet the Full Team
            </Link>
          </div>
        </div>
      </section>
      
      {/* Club History/About Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle 
                title="Our Club's Journey" 
                subtitle="The story of Young Everest FC since 2015"
              />
              
              <p className="text-gray-600 mb-6">
                Young Everest Football Club was founded in 2015 with a vision to develop local talent
                and provide a pathway for passionate footballers to realize their potential. Starting
                with just a single youth team, we have grown into a full-fledged club with multiple age groups.
              </p>
              
              <p className="text-gray-600 mb-6">
                Our philosophy centers around technical development, tactical awareness, and physical fitness,
                all while fostering the values of teamwork, respect, and perseverance. The club has steadily
                climbed through the regional divisions, earning recognition for both results and our style of play.
              </p>
              
              <p className="text-gray-600 mb-8">
                Today, Young Everest FC stands as a beacon in the community, not just as a football club,
                but as a family that nurtures talent and builds character through the beautiful game.
              </p>
              
              <Link to="/contact" className="btn-secondary">
                Join Our Club
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-primary flex items-center justify-center shadow-lg transform hover:scale-105 transition duration-300">
                <span className="text-white text-opacity-50 text-center">Club Image 1</span>
              </div>
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-secondary flex items-center justify-center shadow-lg transform hover:scale-105 transition duration-300">
                <span className="text-young-everest-dark text-opacity-50 text-center">Club Image 2</span>
              </div>
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-secondary flex items-center justify-center shadow-lg transform hover:scale-105 transition duration-300">
                <span className="text-young-everest-dark text-opacity-50 text-center">Club Image 3</span>
              </div>
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-primary flex items-center justify-center shadow-lg transform hover:scale-105 transition duration-300">
                <span className="text-white text-opacity-50 text-center">Club Image 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16 bg-gray-50 altitude-gradient snow-overlay">
        <div className="container-custom relative z-10">
          <SectionTitle 
            title="Latest News" 
            subtitle="Stay updated with the latest happenings at Young Everest FC"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map(item => (
              <NewsCard 
                key={item.id}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                image={item.image}
                category={item.category}
                url={`/news/${item.slug}`}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/news" className="btn-primary">
              View All News
            </Link>
          </div>
        </div>
      </section>
      
      {/* Sponsors Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-600">Our Trusted Partners</h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-10">
            {/* Sponsor logos would go here */}
            <div className="h-20 w-40 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400">Sponsor 1</span>
            </div>
            <div className="h-20 w-40 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400">Sponsor 2</span>
            </div>
            <div className="h-20 w-40 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400">Sponsor 3</span>
            </div>
            <div className="h-20 w-40 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-400">Sponsor 4</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
