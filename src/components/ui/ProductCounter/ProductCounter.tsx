import { useState } from "react";

export default function ProductCounter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="flex w-[125px] gap-4 bg-[#000] text-white justify-center items-center rounded-full">
        <button
          className="all:unset hover:cursor-pointer text-xl "
          onClick={() => {
            if (count > 0) {
              setCount(count - 1);
            }
          }}
        >
          -
        </button>
        <p>{count}</p>
        <button
          className="all:unset hover:cursor-pointer text-xl "
          onClick={() => {
            {
              /*Incluir verificacion para que no supere el stock disponible*/
            }
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    </>
  );
}