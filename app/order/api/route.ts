import { prisma } from "@/src/lib/prisma";


export const dynamic = 'force-dynamic'

export async function GET() {
  const orders = await prisma.order.findMany({
    take: 999,
    where: {
      orderReadyAt: {
        not: null,
      },
    },
    orderBy: {
      orderReadyAt: "desc",
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return Response.json(orders);
}
//api de la que se obtienen las ordenes para boxCut