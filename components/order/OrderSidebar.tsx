import { prisma } from "@/src/lib/prisma";
import CategoryIcon from "../ui/CategoryIcon";
import Logo from "../ui/Logo";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();
  return (
    <aside className="md:w-72 md:h-screen bg-blue-500 rounded-r-3xl">
      <Logo />
      <h1 className="text-center text-xl font-semibold text-white mt-2">Quiosco</h1>
      <nav className="mt-10">
        {categories.map((category) => (
          <CategoryIcon key={category.id} category={category} />
        ))}
      </nav>
    </aside>
  );
}
