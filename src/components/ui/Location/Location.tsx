import { FC } from "react";

type ILocationProps = {
  location: String;
  subLocation?: String;
};
const Location: FC<ILocationProps> = ({ location, subLocation }) => {
  return (
    <div className="flex flex-col justify-center p-6 h-[80px] w-full bg-[#F1F1F1]">
      <p className="text-sm uppercase">{` ${
        subLocation ? subLocation : location
      } / ${location}`}</p>
      <h4 className="text-xl uppercase">{`${location}`}</h4>
    </div>
  );
};

export default Location;
