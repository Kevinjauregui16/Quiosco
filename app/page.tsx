export default function Home() {
  const linkClasses =
    "bg-amber-400 hover:bg-amber-300 transition-all px-2 rounded-lg text-2xl";

  const links = [
    { href: "/order/cafe", text: "Ir a Quiosco" },
    { href: "/admin/orders", text: "Ir a Administrar Ordenes" },
    { href: "/orders", text: "Ir a Ordenes Listas" },
    { href: "/admin/products", text: "Ir a Administrar Productos" },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-white space-y-2">
      <img className="size-1/4" src="/home.png" alt="Image home" />
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
