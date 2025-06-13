import { FC, useState } from "react";
import { IDetalle } from "../../../types/IDetalle";

interface IPropsProductCounter {
  detalle: IDetalle;
}

export const ProductCounter: FC<IPropsProductCounter> = ({ detalle }) => {
  const [count, setCount] = useState(1);
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
            const talleEncontrado = detalle.producto.talles.find(
              (t) => t.talle === detalle.talle
            );

            if (talleEncontrado && count <= talleEncontrado.stock) {
              setCount(count + 1);
            }
          }}
        >
          +
        </button>
      </div>
    </>
  );
};
