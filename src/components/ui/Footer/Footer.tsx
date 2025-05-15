import { Icon } from "@iconify/react/dist/iconify.js";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16 py-8 px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-sm">© 2025 JEM Ecommerce</div>
      <div className="text-bold text-4xl jacquard-24-regular">JEM</div>
      <div className="flex space-x-4 mt-4 md:mt-0">
      <Icon icon="mdi:facebook" width="42" height="42" />
      <Icon icon="mdi:instagram" width="42" height="42" />
      <Icon icon="mdi:twitter" width="42" height="42" />
      <Icon icon="mdi:whatsapp" width="42" height="42" />
      </div>
    </footer>
  );
};

export default Footer;
