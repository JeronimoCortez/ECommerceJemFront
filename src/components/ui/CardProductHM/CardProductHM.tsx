import { FC } from "react";
import { IProduct } from "../../../types/IProduct";

type IPropsCardProductHM = {
  producto: IProduct;
};

const CardProductHM: FC<IPropsCardProductHM> = ({ producto }) => {
  return (
    <div className="p-2 text-xs">
      <div className="bg-[#D9D9D9] w-[200px] h-[200px] object-cover flex items-center justify-center">
        <img
          className="w-[150px] h-[150px] object-cover"
          src="/ProductoHeroImageHM.png"
          alt="Imagen {producto.nombre}"
        />
      </div>
      <p className="text-sm">Acsis ff blast +</p>
      <p>Zapatillas Acsis</p>
      <p>$320.000</p>
    </div>
  );
};

export default CardProductHM;
