import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import FixtureCard from '../components/FixtureCard';
import NewsCard from '../components/NewsCard';
import PlayerCard from '../components/PlayerCard';
import { fixtures, news, players } from '../utils/mockData';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Get upcoming fixtures (max 3)
  const upcomingFixtures = fixtures
    .filter(fixture => !fixture.isCompleted)
    .slice(0, 3);
  
  // Get latest news (max 3)
  const latestNews = news.slice(0, 3);
  
  // Get featured players (4 players)
  const featuredPlayers = players.slice(0, 4);
  
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
            {upcomingFixtures.map(fixture => (
              <FixtureCard 
                key={fixture.id}
                homeTeam={fixture.homeTeam}
                awayTeam={fixture.awayTeam}
                date={fixture.date}
                time={fixture.time}
                venue={fixture.venue}
                competition={fixture.competition}
                isCompleted={fixture.isCompleted}
              />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/fixtures" className="btn-primary">
              View All Fixtures
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Players Section */}
      <section className="py-16 bg-young-everest-light hero-pattern">
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
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-primary flex items-center justify-center">
                <span className="text-white text-opacity-50 text-center">Club Image 1</span>
              </div>
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-secondary flex items-center justify-center">
                <span className="text-young-everest-dark text-opacity-50 text-center">Club Image 2</span>
              </div>
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-secondary flex items-center justify-center">
                <span className="text-young-everest-dark text-opacity-50 text-center">Club Image 3</span>
              </div>
              <div className="rounded-lg overflow-hidden h-48 bg-young-everest-primary flex items-center justify-center">
                <span className="text-white text-opacity-50 text-center">Club Image 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
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
