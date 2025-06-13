import React, { useEffect, useState } from "react";
import JEMBar from "../JEMBar/JEMBar";
import { shoppingCartStore } from "../../../store/shoppingCartStore";
import { DetalleService } from "../../../services/detalleService";
import { userStore } from "../../../store/userStore";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { OrderService } from "../../../services/orderServices";
const PUBLIC_KEY = import.meta.env.MP_ACCESS_TOKEN;

const Order = () => {
  const { detalles } = shoppingCartStore();
  const { userActive } = userStore();
  const [detalleIds, setDetalleIds] = useState<number[]>([]);
  const idUser = userActive?.id || 0;
  const orderService = new OrderService();

  useEffect(() => {
    initMercadoPago(PUBLIC_KEY);
  }, []);

  const crearDetalles = async () => {
    const detalleService = new DetalleService();
    const ids: number[] = [];

    for (const d of detalles) {
      const detalleCreado = await detalleService.createDetalle(d);
      console.log(detalleCreado?.id);
      if (detalleCreado?.id) {
        ids.push(detalleCreado.id);
      }
    }

    setDetalleIds(ids);
    return ids;
  };

  const handlePago = async () => {
    try {
      const idDetalles = await crearDetalles();
      console.log(idDetalles);

      const preferenceId = await orderService.crearPreferenciaMP(
        idDetalles,
        idUser
      );

      window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <JEMBar />
      <div className="h-[90vh] flex items-center justify-center flex-col w-[100vw]">
        {detalles.map((detalle) => (
          <div
            key={detalle.id}
            className="flex items-center w-[50vw] justify-around"
          >
            <img
              src={`${detalle.producto.imagen}`}
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
