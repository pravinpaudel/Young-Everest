type SectionTitleProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

const SectionTitle = ({ title, subtitle, centered = false }: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <div className="flex items-center justify-center mb-2">
        <span className="text-young-everest-secondary text-2xl">⛰️</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-young-everest-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`relative h-1 w-24 bg-young-everest-secondary mt-4 ${centered ? 'mx-auto' : ''}`}>
        <div className="absolute -right-4 -top-1 w-3 h-3 rounded-full bg-young-everest-secondary"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
