import { FC } from "react";

type LogoProps = {
  className?: string;
};

const Logo: FC<LogoProps> = ({ className }) => {
  return (
    <div className={`${className}`}>
      <a href="/" className="text-4xl jacquard-24-regular font-black">
        JEM
      </a>
    </div>
  );
};

export default Logo;
