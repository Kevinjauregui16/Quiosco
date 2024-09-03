import Logo from "../ui/Logo";
import AdminRoute from "./AdminRoute";

const adminNavigation = [
  { url: "/admin/products", text: "Productos", blank: false },
  { url: "/admin/boxCut", text: "Ventas", blank: false },
  { url: "/order/cafe", text: "Quiosco", blank: true },
  { url: "/admin/orders", text: "Ordenes en Curso", blank: true },
  { url: "/orders", text: "Ordenes Listas", blank: true },
];

export default function AdminSidebar() {
  return (
    <>
      <Logo />
      <h1 className="text-center text-xl font-semibold text-white mt-2">Administración</h1>
      <div className="space-y-3">
        <nav className="flex flex-col mt-20">
          {adminNavigation.map((link) => (
            <AdminRoute key={link.url} link={link} />
          ))}
        </nav>
      </div>
    </>
  );
}
