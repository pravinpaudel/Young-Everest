type PlayerCardProps = {
  name: string;
  position: string;
  number: number;
  image?: string;
  stats?: {
    [key: string]: string | number;
  };
};

const PlayerCard = ({ name, position, number, image }: PlayerCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative">
      {/* Mountain peak accent */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-0 border-r-16 border-b-16 border-l-0 border-young-everest-secondary border-solid z-10"></div>
      
      <div className="relative h-64 overflow-hidden bg-young-everest-light">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-young-everest-primary text-opacity-20 text-7xl font-bold">
              {number}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-young-everest-primary text-white text-center py-1">
          #{number}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-young-everest-primary">{name}</h3>
        <p className="text-gray-600 mb-2">{position}</p>
        
        {/* {stats && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-500 mb-2 flex items-center">
              <span className="mr-1">⛰️</span> Stats
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default PlayerCard;
