"use client";
import useSWR from "swr";
import { OrderWithProducts } from "../../../src/types/index";
import LatestOrderItem from "../../../components/order/LatestOrderItem";
import React from "react";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>cargando...</p>;

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const filteredOrders =
    data?.filter(
      (order) => order.orderReadyAt && new Date(order.orderReadyAt) >= oneDayAgo
    ) || [];

  // Calcular la suma de los totales
  const totalSum = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  // Obtener la fecha actual en formato legible
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <h1 className="text-start mt-20 text-3xl font-bold">
        Órdenes del {currentDate}
      </h1>

      {filteredOrders.length ? (
        <>
          <div className="text-start my-4">
            <p className="text-xl font-semibold">
              Cantidad Órdenes: ({filteredOrders.length})
            </p>
          </div>
          <div className="text-start my-4">
            <p className="text-xl font-semibold">
              Total de Órdenes:{" "}
              <span className="text-lime-500">${totalSum.toFixed(2)}</span>
            </p>
          </div>

          <div className="overflow-x-auto pb-10">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Fecha</th>
                  <th className="px-4 py-2 border">Total</th>
                  <th className="px-4 py-2 border">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 text-center">
                    <td className="px-4 py-2 border w-1/4">
                      {new Date(order.orderReadyAt!).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-2 border w-1/4">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 border w-1/4">
                      <LatestOrderItem order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center my-10">No hay ordenes del último día</p>
      )}
    </>
  );
}

///admin/boxCut