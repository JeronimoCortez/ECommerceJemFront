const AdvertisingHM = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-screen max-w-full ">
      <div className="flex-1 w-full">
        <img
          className="w-full object-cover"
          src="/AdidasOriginals.png"
          alt="Publicidad adidas originals"
        />
        <p className="p-2">Adidas originals</p>
      </div>
      <div className="flex-1 w-full ">
        <img
          className="w-full object-cover"
          src="/Jordan.png"
          alt="Publicidad Nike Jordan"
        />
        <p className="p-2">Nike Jordan</p>
      </div>
    </div>
  );
};

export default AdvertisingHM;
