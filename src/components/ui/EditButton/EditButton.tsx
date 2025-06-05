import { Icon } from "@iconify/react/dist/iconify.js";

const EditButton = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="text-black cursor-pointer">
    <Icon icon="mdi:pencil" width="24" height="24" />
  </button>
);

export default EditButton;