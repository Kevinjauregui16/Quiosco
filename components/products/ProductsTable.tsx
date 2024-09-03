"use client";
import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import { deleteProduct } from "@/actions/delete-product-action";
import { toast } from "react-toastify";
import { useState } from "react";
import { toggleProductStatus } from "@/actions/isActive-product-action";
import { SlClose, SlCheck } from "react-icons/sl";

type ProductsTableProps = {
  products: ProductsWithCategory;
};
export default function ProductTable({ products }: ProductsTableProps) {
  const [productList, setProductList] = useState(products);

  const handleDelete = (id: number, productName: string) => {
    const confirmToast = toast.info(
      <div>
        <span>¿Estás seguro de que deseas eliminar este producto?</span> <br />
        <p className="font-bold text-gray-500">{productName}</p>
        <button
          onClick={() => handleDeleteConfirmed(id)}
          className="text-red-400 hover:text-red-300 font-semibold ml-2"
        >
          Eliminar
        </button>
        <button
          onClick={() => toast.dismiss(confirmToast)}
          className="text-blue-400 hover:text-blue-300 ml-2"
        >
          Cancelar
        </button>
      </div>,
      {
        autoClose: 3000,
      }
    );
  };

  const handleDeleteConfirmed = async (id: number) => {
    try {
      await deleteProduct(id);
      toast.success("Producto eliminado correctamente", {
        autoClose: 2000,
        closeOnClick: true,
      });
      setProductList(productList.filter((product) => product.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Producto presente en una orden")) {
          toast.error(
            "Producto presente en una orden, intenta después de finalizar las órdenes."
          );
        } else {
          toast.error("Hubo un error al eliminar el producto");
          console.error("Error al eliminar el producto:", error);
        }
      } else {
        toast.error("Hubo un error inesperado");
        console.error("Error inesperado al eliminar el producto:", error);
      }
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    try {
      await toggleProductStatus(id, !isActive);
      toast.success(
        `Producto ${isActive ? "desactivado" : "activado"} correctamente`,
        {
          autoClose: 2000,
          closeOnClick: true,
        }
      );
      setProductList((prevList) =>
        prevList.map((product) =>
          product.id === id ? { ...product, isActive: !isActive } : product
        )
      );
    } catch (error) {
      toast.error("Hubo un error al cambiar el estado del producto");
      console.error("Error al cambiar el estado del producto:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white rounded-xl p-5 ">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Producto
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Precio
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Categoría
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {product.category.name}
                    </td>
                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 space-x-2 transition-colors flex justify-end items-center">
                      <label className="text-gray-300 font-normal">
                        {product.isActive ? "Activado" : "Desactivado"}
                      </label>
                      <button
                        className={`text-${
                          product.isActive ? "lime" : "red"
                        }-500 hover:bg-gray-100 transition-colors p-2 text-xl rounded-full`}
                        onClick={() =>
                          handleToggleStatus(product.id, product.isActive)
                        }
                      >
                        {product.isActive ? <SlCheck /> : <SlClose />}
                      </button>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-blue-500 hover:text-blue-300"
                      >
                        Editar <span className="sr-only">, {product.name}</span>
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-300"
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
