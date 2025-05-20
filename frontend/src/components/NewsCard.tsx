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
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow">
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
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-young-everest-light text-young-everest-primary rounded-full">
            {category}
          </span>
          <span className="text-sm text-gray-500 ml-3">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-young-everest-primary mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        <a 
          href={url}
          className="inline-flex items-center text-young-everest-primary font-semibold hover:text-young-everest-dark transition-colors"
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
