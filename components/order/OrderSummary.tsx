"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo, useState } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  const clearOrder = useStore((state) => state.clearOrder);
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      method: paymentMethod,
      order,
    };
    const result = OrderSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }
    toast.success("Pedido Realizado Correctamente");
    console.log(data);
    clearOrder();
  };

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-xl text-center font-bold">Productos:</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El pedido esta vacio</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
          <p className="text-2xl mt-20 text-center">
            Total a pagar: {""}
            <span className="font-bold text-lime-500">
              {formatCurrency(total)}
            </span>
          </p>
          <p className="text-center mt-2 text-gray-500">Metodo de pago:</p>
          <form action={handleCreateOrder} className="w-full space-y-5">
            <div className="flex justify-evenly items-center mt-1 ">
              <label className="bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer py-1 px-4 m-auto rounded-xl">
                <input
                  className="mx-2"
                  type="radio"
                  name="paymentMethod"
                  value="EFECTIVO"
                  checked={paymentMethod === "EFECTIVO"}
                  onChange={() => setPaymentMethod("EFECTIVO")}
                />
                Efectivo
              </label>
              <label className="bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer py-1 px-4 m-auto rounded-xl">
                <input
                  className="mx-2"
                  type="radio"
                  name="paymentMethod"
                  value="TARJETA"
                  checked={paymentMethod === "TARJETA"}
                  onChange={() => setPaymentMethod("TARJETA")}
                />
                Tarjeta
              </label>
            </div>
            <input
              type="text"
              placeholder="Nombre del cliente"
              className="bg-white border border-gray-100 p-2 w-full rounded-md"
              name="name"
            />
            <input
              type="submit"
              className="py-2 uppercase text-white bg-blue-500 hover:bg-lime-500 transition-colors hover:opacity-70 w-full text-center cursor-pointer font-bold rounded-xl"
              value="Confirmar pedido"
            />
          </form>
        </div>
      )}
    </aside>
  );
}
