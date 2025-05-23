import { FC } from "react";

type LogoProps = {
  className?: string;
};

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={`text-4xl jacquard-24-regular font-black ${className}`}>
      JEM
    </div>
  );
};

export default Logo;
