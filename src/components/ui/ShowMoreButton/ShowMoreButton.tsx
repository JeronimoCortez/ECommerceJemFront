const ShowMoreButton = () => {
  //fixed w-full max-w-full flex justify-center bottom-0 border mb-2 shadow
  return (
    <div className="flex justify-center border mb-2 shadow">
      <button className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:cursor-pointer">
        Mostrar más...
      </button>
    </div>
  );
};

export default ShowMoreButton;
