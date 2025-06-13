import JEMBar from "../../components/ui/JEMBar/JEMBar";

const PaymentFailure = () => {
  return (
    <div>
      <JEMBar />
      <div className="flex flex-col h-[92vh] justify-center items-center ">
        <div className="bg-[#000] text-white p-10 rounded text-center">
          <h5 className="font-bold text-[24px]">PAGO RECHAZADO</h5>
          <p className="my-2">
            ¡El pago fue rechazado! Intenta nuevamente, si el error persiste
            contacta a soporte.
          </p>
          <a
            href="/"
            className="block border border-[#D9D9D9] p-2 hover:cursor-pointer mt-4 w-[10rem] mx-auto "
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
