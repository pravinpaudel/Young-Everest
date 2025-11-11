import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'white';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
  fullScreen = false,
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-3',
    lg: 'h-16 w-16 border-4',
    xl: 'h-24 w-24 border-4'
  };

  const colorClasses = {
    primary: 'border-young-everest-primary',
    secondary: 'border-blue-500',
    white: 'border-white'
  };

  const spinnerClasses = `
    animate-spin 
    rounded-full 
    ${sizeClasses[size]} 
    border-t-transparent 
    border-r-transparent
    ${colorClasses[color]}
  `;

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex flex-col justify-center items-center bg-white bg-opacity-90 z-50'
    : 'flex flex-col justify-center items-center p-10';

  return (
    <div className={containerClasses}>
      <div className={spinnerClasses} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {message && (
        <p className="mt-4 text-gray-600 text-sm md:text-base font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
