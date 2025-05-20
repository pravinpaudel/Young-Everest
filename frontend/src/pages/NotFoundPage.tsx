import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-16">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-young-everest-primary mb-4">404</h1>
        <div className="w-20 h-1 bg-young-everest-secondary mx-auto mb-8"></div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Link to="/" className="btn-primary">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
