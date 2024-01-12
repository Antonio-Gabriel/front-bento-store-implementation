"use client"

import { illustration } from "@/assets";
import Link from "next/link";
import Image from "next/image";

import { FiChevronLeft } from "react-icons/fi";

import { CreateProduct } from '@/features/products/components/CreateProduct'

export default function RegisterProduct() {
  return (
    <div className="flex w-full h-screen">
      <div className="flex-1 sm:px-4 lg:px-8 flex-center">
        <div className="flex flex-col gap-y-6 w-96">
          <h2 className="text-2xl font-bold">Registrar Produto</h2>

          <Link href="/products" className="flex items-center gap-x-3">
            <FiChevronLeft />
            <span className="text-sm underline">Voltar</span>
          </Link>

          <CreateProduct />
        </div>
      </div>
      <div className="flex-1 max-w-4xl bg-card bg-opacity-50 sm:hidden lg:flex items-center justify-center">
        <Image src={illustration} alt="" className="w-96" />
      </div>
    </div>
  );
}
