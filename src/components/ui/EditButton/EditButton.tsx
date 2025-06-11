import { Icon } from "@iconify/react/dist/iconify.js";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => (
  <button onClick={onClick} className="text-black cursor-pointer">
    <Icon icon="mdi:pencil" width="24" height="24" />
  </button>
);

export default EditButton;;