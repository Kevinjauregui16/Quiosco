import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-xl bg-gray-50 px-4 py-6 sm:p-6 shadow-xl lg:mt-0 lg:p-8 space-y-4"
    >
      <p className="text-2xl font-bold text-gray-900">Cliente: {order.name}</p>
      <p className="text-lg font-medium text-gray-900">Productos Ordenados:</p>
      <dl className="mt-6 space-y-4">
        {order.orderProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center gap-r border-t border-gray-200 pt-4"
          >
            <dt className="flex items-center text-sm text-gray-600">
              <span className="font-black">({product.quantity})</span>
            </dt>
            <dd className="text-sm font-medium text-gray-900 ml-1">
              {product.product.name}
            </dd>
          </div>
        ))}

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className="text-base font-medium text-gray-900">
            Total a Pagar:
          </dt>
          <dd className="font-medium text-lime-500 text-lg">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrder}>
        <input type="hidden" value={order.id} name="order_id" />
        <input
          type="submit"
          className="bg-blue-500 hover:bg-lime-500 transition-colors text-white rounded-xl w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="Marcar Orden Completada"
        />
      </form>
    </section>
  );
}
