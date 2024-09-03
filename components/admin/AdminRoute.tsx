"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

export default function AdminRoute({ link }: AdminRouteProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.url);

  return (
    <Link
      className={`${
        isActive
          ? "bg-white w-[95%] rounded-r-full text-blue-500 shadow-xl"
          : "text-white"
      } font-bold text-xl p-4`}
      href={link.url}
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  );
}
