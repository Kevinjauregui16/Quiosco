"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

export async function completeOrder(formData: FormData) {
  const data = {
    orderId: formData.get("order_id"),
  };
  const result = OrderIdSchema.safeParse(data);

  if (result.success) {
    try {
      const now = new Date();

      const localOffset = now.getTimezoneOffset() * 60000;
      const localDate = new Date(now.getTime() - localOffset);

      console.log("Fecha de orden completada", localDate.toISOString());

      await prisma.order.update({
        where: {
          id: result.data.orderId,
        },
        data: {
          status: true,
          orderReadyAt: localDate,
        },
      });
      revalidatePath("/admin/orders");
    } catch (error) {
      console.log(error);
    }
  }
}
