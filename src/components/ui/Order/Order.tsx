import { useEffect } from "react";
import JEMBar from "../JEMBar/JEMBar";
import { userStore } from "../../../store/userStore";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { OrderService } from "../../../services/orderServices";
import { DetalleStore } from "../../../store/detalleStore";
import { shoppingCartStore } from "../../../store/shoppingCartStore";
const PUBLIC_KEY = import.meta.env.MP_ACCESS_TOKEN;

const Order = () => {
  const { detalles } = DetalleStore();
  const { detallesShoppingCart } = shoppingCartStore();
  const { userActive } = userStore();
  const idUser = userActive?.id || 0;
  const orderService = new OrderService();

  useEffect(() => {
    initMercadoPago(PUBLIC_KEY);
  }, []);

  const handlePago = async () => {
    try {
      const idDetalles: number[] = detalles.map((d) => d.id!);
      if (idDetalles.length === 0) {
        console.log("No hay detalles para procesar.");
        return;
      }

      const preferenceId = await orderService.crearPreferenciaMP(
        idDetalles,
        idUser
      );

      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
      localStorage.removeItem("shopping-cart");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <JEMBar />
      <div className="h-[90vh] flex items-center justify-center flex-col w-[100vw]">
        {detallesShoppingCart.map((detalle) => (
          <div
            key={detalle.id}
            className="flex items-center w-[50vw] justify-around"
          >
            <img
              src={detalle.producto.imagen || "../NoImage.png"}
              alt={`imagen ${detalle.producto.nombre}`}
              className="w-[100px] object-cover"
            />
            <div className="flex flex-col items-center justify-center gap-1">
              <p className="">{detalle.producto.nombre}</p>
              <p>
                Talle: {detalle.talle} Color: {detalle.producto.color}
              </p>
              <p>Cantidad: {detalle.cantidad}</p>
            </div>
          </div>
        ))}
        <button
          onClick={handlePago}
          className="all:unset bg-[#000] py-2 cursor-pointer mt-2 px-4 text-white"
        >
          Realizar pago
        </button>
      </div>
    </div>
  );
};

export default Order;
