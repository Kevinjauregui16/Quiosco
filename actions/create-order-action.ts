"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export async function createOrder(data: unknown) {
  const result = OrderSchema.safeParse(data);
  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  try {
    //fecha actual
    const now = new Date();

    // Ajuste de la fecha para la zona horaria local
    const localOffset = now.getTimezoneOffset() * 60000;
    const localDate = new Date(now.getTime() - localOffset);
    console.log("Fecha de creacion:", localDate.toISOString());

    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        method: result.data.method,
        date: localDate, // se guarda la fecha ajustada
        orderProducts: {
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}
