import { Icon } from "@iconify/react/dist/iconify.js";

interface CheckButtonProps {
  checked?: boolean;
  label?: string;
  onClick?: () => void;
}

const CheckButton: React.FC<CheckButtonProps> = ({ checked = false, label, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center justify-center
      ${label ? "w-12 h-12" : "w-6 h-6"}
      shadow-md border border-black
      cursor-pointer
      ${checked ? "bg-black text-white" : "bg-white text-black"}
    `}
  >
    {checked ? <Icon icon="basil:check-outline" width="24" height="24" /> : label}
  </div>
);

export default CheckButton;