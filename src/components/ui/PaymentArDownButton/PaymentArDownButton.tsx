import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useState } from "react";
import AddDiscount from "../AddDiscount/AddDiscount";
import { IDescuento } from "../../../types/IDescuento";

type IPaymentArDownButton = {
  idProducto: number;
  descuento?: IDescuento;
};

const PaymentArDownButton: FC<IPaymentArDownButton> = ({
  idProducto,
  descuento,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="hover:cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <Icon
          icon="material-symbols:payment-arrow-down-outline"
          width="24"
          height="24"
        />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-[#D9D9D9]/75 flex items-center justify-center z-50">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            {descuento ? (
              <AddDiscount
                initialValues={descuento}
                idProduct={idProducto}
                onClose={() => setIsModalOpen(false)}
              />
            ) : (
              <AddDiscount
                idProduct={idProducto}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentArDownButton;
