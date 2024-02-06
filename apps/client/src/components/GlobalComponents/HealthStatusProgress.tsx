const HealthStatusProgress = ({
  current,
  max,
  className,
  date,
}: {
  current: number;
  max: number;
  className?: string;
  date: string;
}) => {
  return (
    <div className="w-full">
        <div className="h2"></div>
      <div className="grid grid-cols-12 gap-3 w-full">
        <div className="col-span-3">{date}</div>
        <progress
          className={`${className} col-span-6 progress`}
          value={current}
          max={max}
        ></progress>
        <div className="col-span-3">{current}</div>
      </div>
    </div>
  );
};

export default HealthStatusProgress;
