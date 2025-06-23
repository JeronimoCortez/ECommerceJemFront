import React, { useEffect, useState } from "react";
import JEMBar from "../../components/ui/JEMBar/JEMBar";
import ListOrderUser from "../../components/ui/ListOrderUser/ListOrderUser";
import { userStore } from "../../store/userStore";
import { OrderService } from "../../services/orderServices";
import { IOrdenCompra } from "../../types/IOrdenCompra";

const OrdersUser = () => {
  const { userActive } = userStore();
  const orderService = new OrderService();
  const [ordersUser, setOrdersUser] = useState<IOrdenCompra[] | undefined>();

  useEffect(() => {
    const fetchOrders = async () => {
      if (userActive) {
        const orders = await orderService.getOrdersByUser(userActive.id);
        setOrdersUser(orders);
      }
    };

    fetchOrders();
  }, [userActive]);

  return (
    <div>
      <JEMBar />
      <ListOrderUser orders={ordersUser} />
    </div>
  );
};

export default OrdersUser;
