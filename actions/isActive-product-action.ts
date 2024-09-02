"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleProductStatus(id: number, isActive: boolean) {
  await prisma.product.update({
    where: {
      id,
    },
    data: {
      isActive,
    },
  });

  revalidatePath("/admin/products");
}
