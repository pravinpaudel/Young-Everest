import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import NewsCard from '../components/NewsCard';
import { news } from '../utils/mockData';

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  
  const categories = ['all', ...new Set(news.map(item => item.category.toLowerCase()))];
  
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || item.category.toLowerCase() === category;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div>
      {/* News Hero */}
      <div className="bg-young-everest-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest News</h1>
          <p className="text-xl text-young-everest-light max-w-3xl mx-auto">
            Stay updated with the latest happenings at Young Everest FC
          </p>
        </div>
      </div>
      
      {/* News Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search news..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-young-everest-primary focus:border-young-everest-primary w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                    category === cat
                      ? 'bg-young-everest-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setCategory(cat)}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* News List */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title={`Club News ${category !== 'all' ? `- ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''}`}
            subtitle="Keep up with everything happening at Young Everest FC"
            centered
          />
          
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map(item => (
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
          ) : (
            <div className="py-16 text-center text-gray-500">
              No news articles found. Try adjusting your search or filter.
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Signup */}
      <section className="py-16 bg-young-everest-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
            <p className="text-young-everest-light mb-8">
              Subscribe to our newsletter to receive the latest news, match reports, and special announcements
              directly to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-young-everest-secondary"
                required
              />
              <button
                type="submit"
                className="btn-secondary px-6"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm mt-4 text-young-everest-light">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
