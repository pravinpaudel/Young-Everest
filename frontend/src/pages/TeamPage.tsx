import SectionTitle from '../components/SectionTitle';
import PlayerCard from '../components/PlayerCard';
import { players } from '../utils/mockData';

const TeamPage = () => {
  // Group players by position
  const goalkeepers = players.filter(player => player.position === 'Goalkeeper');
  const defenders = players.filter(player => player.position === 'Defender');
  const midfielders = players.filter(player => player.position === 'Midfielder');
  const forwards = players.filter(player => player.position === 'Forward');
  
  return (
    <div>
      {/* Team Hero */}
      <div className="bg-young-everest-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-xl text-young-everest-light max-w-3xl mx-auto">
            Meet the players who represent Young Everest FC with pride and passion
          </p>
        </div>
      </div>
      
      {/* Team Stats Overview */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-young-everest-light p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-young-everest-primary mb-2">25</div>
              <div className="text-gray-600">Total Players</div>
            </div>
            <div className="bg-young-everest-light p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-young-everest-primary mb-2">52</div>
              <div className="text-gray-600">Goals Scored</div>
            </div>
            <div className="bg-young-everest-light p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-young-everest-primary mb-2">10</div>
              <div className="text-gray-600">Clean Sheets</div>
            </div>
            <div className="bg-young-everest-light p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-young-everest-primary mb-2">3rd</div>
              <div className="text-gray-600">League Position</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Management */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Coaching Staff" 
            subtitle="The leadership behind our success"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-young-everest-primary flex items-center justify-center">
                <span className="text-white text-opacity-20 text-center">Coach Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-young-everest-primary">Robert Wilson</h3>
                <p className="text-gray-600 mb-4">Head Coach</p>
                <p className="text-gray-700">
                  With over 15 years of coaching experience, Coach Wilson has led
                  Young Everest FC since its founding, implementing a technical and attacking
                  philosophy that has become the club's trademark.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-young-everest-primary flex items-center justify-center">
                <span className="text-white text-opacity-20 text-center">Coach Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-young-everest-primary">Sarah Johnson</h3>
                <p className="text-gray-600 mb-4">Assistant Coach & Head of Youth Development</p>
                <p className="text-gray-700">
                  A former professional player, Sarah brings valuable experience and a keen eye
                  for young talent. She oversees our youth academy while assisting with first team duties.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-young-everest-primary flex items-center justify-center">
                <span className="text-white text-opacity-20 text-center">Coach Photo</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-young-everest-primary">Michael Torres</h3>
                <p className="text-gray-600 mb-4">Goalkeeping Coach & Fitness Trainer</p>
                <p className="text-gray-700">
                  A specialist in modern goalkeeping techniques and physical conditioning,
                  Michael ensures our players maintain peak performance throughout the season.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Players Section - Grouped by Position */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="First Team Squad" 
            subtitle="The talent representing Young Everest FC"
            centered
          />
          
          {/* Goalkeepers */}
          <div className="mt-12 mb-16">
            <h3 className="text-2xl font-bold text-young-everest-primary mb-6 pb-2 border-b border-gray-200">
              Goalkeepers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {goalkeepers.map(player => (
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
          </div>
          
          {/* Defenders */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-young-everest-primary mb-6 pb-2 border-b border-gray-200">
              Defenders
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {defenders.map(player => (
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
          </div>
          
          {/* Midfielders */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-young-everest-primary mb-6 pb-2 border-b border-gray-200">
              Midfielders
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {midfielders.map(player => (
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
          </div>
          
          {/* Forwards */}
          <div>
            <h3 className="text-2xl font-bold text-young-everest-primary mb-6 pb-2 border-b border-gray-200">
              Forwards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {forwards.map(player => (
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
          </div>
        </div>
      </section>
      
      {/* Team Philosophy */}
      <section className="py-16 bg-young-everest-light hero-pattern">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-young-everest-primary mb-4">Our Playing Philosophy</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                At Young Everest FC, we believe in a progressive, possession-based approach to the game.
                Our style is characterized by technical skill, tactical intelligence, and physical preparation.
              </p>
              <p>
                We emphasize building from the back with short, precise passing combinations to break through
                defensive lines. Our players are encouraged to express their creativity while maintaining
                positional discipline.
              </p>
              <p>
                Defensively, we employ a high-pressing system to regain possession quickly and close to the
                opponent's goal. This approach requires excellent fitness, coordination, and game understanding
                from every player.
              </p>
              <p>
                Above all, we strive to play entertaining, attack-minded football that excites our fans
                and reflects our community's spirit of ambition and perseverance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
