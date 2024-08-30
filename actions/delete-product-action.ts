"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: number) {
  const orders = await prisma.orderProducts.findMany({
    where: { productId: id },
  });

  if (orders.length > 0) {
    throw new Error(
      "Producto presente en una orden, intenta después de finalizar las órdenes."
    );
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/products");
}
