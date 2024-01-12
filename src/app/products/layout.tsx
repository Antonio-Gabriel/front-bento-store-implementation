"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header/Header";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="w-full relative flex flex-col gap-y-10">      
      {pathname != "/products/register" ? <Header /> : <></>}
      <div
        className={`sm:px-4 lg:px-44 ${
          pathname == "/products/register" && "!px-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
