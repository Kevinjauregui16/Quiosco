"use client";
import useSWR from "swr";
import { OrderWithProducts } from "../../../src/types/index";
import LatestOrderItem from "../../../components/order/LatestOrderItem";
import { useState } from "react";

export default function OrdersPage() {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate);

  const url = "/order/api";
  const fetcher = () => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 7200000, //se refrecan los datos cada 2hr
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>cargando...</p>;

  const filteredOrders =
    data?.filter((order) => {
      if (!order.orderReadyAt || !selectedDate) return false;
      const orderDate = new Date(order.orderReadyAt)
        .toISOString()
        .split("T")[0];
      return orderDate === selectedDate;
    }) || [];

  // Calcular la suma de los totales
  const totalSum = filteredOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <>
      <div className="text-start">
        <label className=" text-xl font-bold" htmlFor="datePicker">
          Reporte de ventas del: {""}
        </label>
        <input
          type="date"
          id="datePicker"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded-lg"
        />
      </div>

      {filteredOrders.length ? (
        <>
          <div className="text-start my-4">
            <p className="text-lg font-semibold text-gray-500">
              Cantidad de ventas:{" "}
              <span className="text-blue-500">{filteredOrders.length}</span>
            </p>
          </div>
          <div className="text-start my-4">
            <p className="text-lg font-semibold text-gray-500">
              Total de ventas:{" "}
              <span className="text-lime-500">${totalSum.toFixed(2)}</span>
            </p>
          </div>

          <div className="overflow-x-auto pb-10 rounded-xl">
            <table className="min-w-full bg-white rounded-xl divide-y divide-gray-200">
              <thead>
                <tr className="bg-white rounded-xl text-sm">
                  <th className="px-4 py-4">Fecha</th>
                  <th className="px-4 ">Total</th>
                  <th className="px-4 ">Orden</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="text-center">
                    <td className="px-4 py-2 w-1/4">
                      {new Date(order.orderReadyAt!).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 w-1/4">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 w-1/4">
                      <LatestOrderItem order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="text-center my-10">
          No hay órdenes para la fecha seleccionada
        </p>
      )}
    </>
  );
}
