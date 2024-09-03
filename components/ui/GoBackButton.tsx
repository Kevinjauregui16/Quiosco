"use client"
import { useRouter } from "next/navigation";

export default function GoBackButton() {
    const router =useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="bg-blue-500 hover:bg-blue-400 transition-colors w-full lg:w-auto text-xl text-white font-bold rounded-xl px-10 py-3 text-center"
    >
      Volver
    </button>
  );
}
