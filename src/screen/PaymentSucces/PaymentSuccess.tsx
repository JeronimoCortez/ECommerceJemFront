import JEMBar from "../../components/ui/JEMBar/JEMBar";
import { userStore } from "../../store/userStore";

const PaymentSuccess = () => {
  const { userActive } = userStore();
  return (
    <div>
      <JEMBar />
      <div className="flex flex-col h-[92vh] justify-center items-center ">
        <div className="bg-[#000] text-white p-10 rounded text-center">
          <h5 className="font-bold text-[24px]">
            PAGO EXITOSO ¡MUCHAS GRACIAS!
          </h5>
          <p className="my-2">El pago se realizo con exito, ¡Muchas gracias!</p>
          <div className="flex justify-center gap-2">
            <a
              href="/"
              className="p-2 hover:cursor-pointer mt-4 w-[10rem] bg-[#fff] text-[#000]"
            >
              Volver al inicio
            </a>
            <a
              href={`/ordersUser/${userActive!.id}`}
              className="p-2 hover:cursor-pointer mt-4 w-[10rem] bg-[#fff] text-[#000]"
            >
              Ver mis compras
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
