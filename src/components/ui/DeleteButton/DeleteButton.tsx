import { Icon } from "@iconify/react/dist/iconify.js";

const DeleteButton = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="text-black cursor-pointer">
    <Icon icon="line-md:trash" width="24" height="24" />
  </button>
);

export default DeleteButton;
