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
      className="bg-blue-500 hover:bg-lime-500 transition-colors text-white w-full p-3 mt-4 uppercase font-bold cursor-pointer rounded-xl"
      onClick={() => AddToOrder(product)}
    >
      Agregar
    </button>
  );
}
