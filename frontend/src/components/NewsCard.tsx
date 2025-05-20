type NewsCardProps = {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  category: string;
  url: string;
};

const NewsCard = ({ title, date, excerpt, image, category, url }: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow relative">
      {/* Mountain peak accent in corner */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-16 border-l-16 border-b-0 border-r-0 border-young-everest-secondary border-opacity-30 border-solid z-10"></div>
      
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-young-everest-light text-young-everest-primary rounded-full shadow-sm">
            {category}
          </span>
          <span className="text-sm text-gray-500 ml-3 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-young-everest-primary mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <a 
          href={url}
          className="inline-flex items-center text-young-everest-primary font-semibold hover:text-young-everest-dark transition-colors mountain-path relative pb-2"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
