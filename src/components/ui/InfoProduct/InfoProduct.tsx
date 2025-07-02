import { FC, useState } from "react";
import { IProduct } from "../../../types/IProduct";
import CreateProduct from "../CreateProduct/CreateProduct";

interface IPropsInfoProduct {
  product: IProduct;
  onClose: VoidFunction;
}

const InfoProduct: FC<IPropsInfoProduct> = ({ product, onClose }) => {
  const [modalEdit, setModalEdit] = useState(false);

  const handleEditProduct = () => {
    setModalEdit(true);
  };
  return (
    <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
      <div className="min-w-[30vw] bg-[#FFF] p-4">
        <h5 className="text-center font-bold ">{product.nombre}</h5>
        <img
          src={product.imagen || "../NoImage.png"}
          className="w-[6rem] mx-auto mt-1"
          alt="Imagen producto"
        />
        <p>
          <span className="font-bold">Activo</span>:{" "}
          {product.activo ? "SI" : "NO"}
        </p>
        <p>
          <span className="font-bold">Precio:</span> ${product.precio}
        </p>
        <p>
          <span className="font-bold">Color:</span> {product.color}
        </p>
        <p>
          <span className="font-bold">Descripcion:</span> {product.descripcion}
        </p>
        <div>
          <p className="font-bold text-center">Stock</p>
          {product.talles.map((talle) => (
            <div className="flex gap-2">
              <p>
                <span className="font-bold">Talle:</span> {talle.talle}
              </p>
              <p>
                <span className="font-bold">Stock:</span> {talle.stock}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-1">
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto bg-[#5A0000]  hover:cursor-pointer text-white py-1 px-2"
          >
            Cerrar
          </button>
          <button
            onClick={handleEditProduct}
            type="button"
            className="w-full sm:w-auto bg-[#000]  hover:cursor-pointer text-white py-1 px-2"
          >
            Editar
          </button>
        </div>
      </div>
      {modalEdit && <CreateProduct initialData={product} onClose={onClose} />}
    </div>
  );
};

export default InfoProduct;
