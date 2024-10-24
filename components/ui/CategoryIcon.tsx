"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();
  return (
    <Link href={`/order/${category.slug}`}>
      <div
        className={`${
          category.slug === params.category
            ? "bg-white rounded-r-full shadow-xl text-blue-500"
            : "text-white"
        }
        flex items-center gap-4 p-2`}
      >
        <div className="w-16 h-16 relative">
          <Image
            fill
            src={`/icon_${category.slug}.svg`}
            alt="imagen categoria"
          />
        </div>
        <p className="text-xl font-bold">{category.name}</p>
      </div>
    </Link>
  );
}
