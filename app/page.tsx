import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Hola Mundo Next.js</h1>
      <Link href="/order/cafe" className="text-amber-500 text-2xl">Ir a quiosco</Link>
    </>
  );
}
