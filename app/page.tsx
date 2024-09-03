import Image from "next/image";

export default function Home() {
  const linkClasses =
    "bg-blue-500 hover:bg-blue-400 transition-all px-4 rounded-lg text-2xl";

  const links = [
    { href: "/order/cafe", text: "Ir a Quiosco" },
    // { href: "/admin/orders", text: "Ir a Administrar Ordenes" },
    // { href: "/orders", text: "Ir a Ordenes Listas" },
    { href: "/admin/products", text: "Ir a panel de administrador" },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-white space-y-2">
      <div className="flex justify-center items-center">
         <Image src="/logoApp.png" alt="Image home" width={550} height={550}/>
      </div>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={linkClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.text}
        </a>
      ))}
    </div>
  );
}
