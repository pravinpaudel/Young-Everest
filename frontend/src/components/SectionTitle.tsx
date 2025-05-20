type SectionTitleProps = {
  title: string;
  subtitle?: string;
  centered?: boolean;
};

const SectionTitle = ({ title, subtitle, centered = false }: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-young-everest-primary mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-24 bg-young-everest-secondary mt-4 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;
