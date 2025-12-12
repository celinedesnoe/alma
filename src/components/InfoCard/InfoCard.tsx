interface InfoCardProps {
  title: string;
  value: string | number;
  valueTestId?: string;
  className?: string; // pour étendre le style
  color?: string;
}

const InfoCard = ({
  title,
  value,
  valueTestId,
  className = "",
  color = "bg-orange-100",
}: InfoCardProps) => {
  return (
    <div
      className={`mb-8 flex w-full flex-col rounded-lg ${color} px-8 py-4 md:w-2/3 lg:w-1/2 ${className}`}
      data-testid="info-card"
    >
      <h2 className="text-l">{title}</h2>
      <p data-testid={valueTestId} className="text-2xl font-extrabold">
        {value}
      </p>
    </div>
  );
};

export default InfoCard;
