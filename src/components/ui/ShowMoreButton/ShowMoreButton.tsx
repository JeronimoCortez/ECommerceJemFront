import { FC } from "react";

interface IPropsShowMoreButton {
  showMore: VoidFunction;
}

const ShowMoreButton: FC<IPropsShowMoreButton> = ({ showMore }) => {
  return (
    <div className="rounded-full fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-2 z-50">
      <button
        onClick={showMore}
        className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:cursor-pointer"
      >
        Mostrar más...
      </button>
    </div>
  );
};

export default ShowMoreButton;
