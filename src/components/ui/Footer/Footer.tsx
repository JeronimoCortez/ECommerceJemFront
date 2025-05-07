const Footer = () => {
  return (
    // Chequear el tamaño del mt
    <footer className="bg-black text-white mt-16 py-8 px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-sm">© 2025 JEM Ecommerce</div>
      <div className="flex space-x-4 mt-4 md:mt-0">
        {/* 
        cambiar por iconos de google icons
    
        <WhatsApp />
        <Facebook />
        <Instagram />
        <Twitter /> */}
      </div>
    </footer>
  );
};

export default Footer;
