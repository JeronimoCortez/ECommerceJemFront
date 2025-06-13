import React, { useEffect, useState } from "react";
import JEMBar from "../../components/ui/JEMBar/JEMBar";
import { useParams } from "react-router-dom";
import ListOrderUser from "../../components/ui/ListOrderUser/ListOrderUser";
import { IOrdenCompra } from "../../types/IOrdenCompra";
import { Estado } from "../../types/enums/Estado.enum";
import Footer from "../../components/ui/Footer/Footer";

const ordenesPrueba: IOrdenCompra[] = [
  {
    id: 1,
    fecha: new Date(),
    precioTotal: 100.0,
    estado: Estado.PENDIENTE,
    activo: true,
    detalles: [
      {
        id: 1,
        activo: true,
        cantidad: 5,
        producto: {
          id: 1,
          activo: true,
          nombre: "Botines nike",
          precio: 120.0,
          categorias: [],
          descripcion: "Botines nike talle 42",
          talles: [],
          color: "Negro",
          marca: "nike",
          imagen:
            "https://res.cloudinary.com/dz6xrizuc/image/upload/v1748436763/EcommerceJem/vprvgfaj1rpuq9n2b3i2.jpg",
          descuentos: [],
        },
      },
    ],
  },
  {
    id: 2,
    fecha: new Date(),
    precioTotal: 100.0,
    estado: Estado.COMPLETADO,
    activo: true,
  },
  {
    id: 3,
    fecha: new Date(),
    precioTotal: 100.0,
    estado: Estado.EN_PROCESO,
    activo: true,
  },
];
const OrdersUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    // Llamamos a get by id
  });

  return (
    <div>
      <JEMBar />
      <ListOrderUser orders={ordenesPrueba} />
    </div>
  );
};

export default OrdersUser;
