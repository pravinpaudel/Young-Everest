import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  image?: string;
  children: ReactNode;
  className?: string;
};

const Card = ({ title, image, children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-young-everest-primary mb-3">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
