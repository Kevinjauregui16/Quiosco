-- CreateEnum
CREATE TYPE "PayMethod" AS ENUM ('EFECTIVO', 'TARJETA');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "method" "PayMethod" NOT NULL DEFAULT 'EFECTIVO';
