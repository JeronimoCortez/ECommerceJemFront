import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 py-8 px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-sm">© 2025 JEM Ecommerce</div>
      <div className="text-bold text-4xl jacquard-24-regular">JEM</div>
      <div className="flex space-x-4 mt-4 md:mt-0">
      <Icon icon="mdi:facebook" className="text-2xl" />
      <Icon icon="mdi:instagram" className="text-2xl" />
      <Icon icon="mdi:twitter" className="text-2xl" />
      <Icon icon="mdi:whatsapp" className="text-2xl" />
      </div>
    </footer>
  );
};

export default Footer;
