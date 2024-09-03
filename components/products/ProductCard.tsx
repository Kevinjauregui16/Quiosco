import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);
  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-all rounded-2xl h-full mt-4">
      <Image
        className="rounded-t-2xl max-h-[500px] object-contain"
        width={400}
        height={500}
        src={imagePath}
        alt={`Imagen platillo ${product.name}`}
        quality={75}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold"> {product.name} </h3>
        <p className=" font-bold text-2xl mt-2 text-lime-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
}
