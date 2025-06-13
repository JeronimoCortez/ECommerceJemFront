import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";

type IPropsDeleteButton = {
  onClick?: VoidFunction;
};

const DeleteButton: FC<IPropsDeleteButton> = ({ onClick }) => (
  <button onClick={onClick} className="text-black cursor-pointer">
    <Icon icon="line-md:trash" width="24" height="24" />
  </button>
);

export default DeleteButton;
