import { FC } from "react";
import { IDetalle } from "../../../types/IDetalle";

interface IPropsProductCounter {
  detalle?: IDetalle;
  maxCounter?: number;
  count: number;
  setCount: (newCount: number) => void; // ✅ Esta línea corregida
}

export const ProductCounter: FC<IPropsProductCounter> = ({
  detalle,
  maxCounter,
  count,
  setCount,
}) => {
  return (
    <div className="flex w-[125px] gap-4 bg-[#000] text-white justify-center items-center rounded-full">
      <button
        className="all:unset hover:cursor-pointer text-xl "
        onClick={() => {
          if (count > 1) {
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
          const talleEncontrado = detalle?.producto.talles.find(
            (t) => t.talle === detalle.talle
          );

          if (talleEncontrado && count < talleEncontrado.stock) {
            setCount(count + 1);
          } else if (maxCounter && count < maxCounter) {
            setCount(count + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
};
