"use client";

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const AddToOrder = useStore((state) => state.addToOrder);
  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-700 text-white w-full p-3 mt-4 uppercase font-bold cursor-pointer rounded-xl"
      onClick={() => AddToOrder(product)}
    >
      Agregar
    </button>
  );
}
