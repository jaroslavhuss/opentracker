import React from "react";

interface Props {
  min: number;
  max: number;
  value: number;
  returnFunction: Function;
}

const FormInputRange: React.FC<Props> = ({
  min,
  max,
  value,
  returnFunction,
}) => {
  const generateClass = (value: number, max: number) => {
    if (value <= max / 4) return "range-success";
    if (value <= (max / 4) * 2) return "range-warning";
    if (value <= (max / 4) * 3) return "range-secondary";
    if (value <= max / 1) return "range-error";
  };

  const generateEmoticon = (value: number, max: number) => {
    if (value <= max / 4) return "😄";
    if (value <= (max / 4) * 2) return "😐";
    if (value <= (max / 4) * 3) return "😔";
    if (value <= max / 1) return "😫";
  };
  return (
    <div className="grid grid-cols-12 gap-4 py-2 my-2 place-content-center content-center">
      <div className="col-span-10">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          className={`range ${generateClass(value, max)}`}
          onChange={({ target }) => {
            returnFunction(parseInt(target.value));
          }}
        />
      </div>
      <div className="col-span-2 text-center font-bold rounded-full shadow-xl p-1 flex justify-evenly items-center">
        {value} {generateEmoticon(value, max)}
      </div>
    </div>
  );
};

export default FormInputRange;
