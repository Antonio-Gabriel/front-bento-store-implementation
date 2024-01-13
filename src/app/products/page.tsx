"use client"

import Link from 'next/link';

import { useEffect } from 'react';

import { useCartStore } from '@/stores/cart-store'
import { useProductsCart } from '@/features/carts/api/get-products-cart'
import { ProductsList } from '@/features/products/components/ProductsList';

export default function Products() {
  const { data } = useProductsCart()
  const { loadCart } = useCartStore(store => store)

  useEffect(() => {
    if (data && data.length > 0) {      
      loadCart(data);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-y-12 mb-8">
      <div className="flex justify-between sm:flex-wrap  gap-8 w-full items-center">
        <div className="flex flex-col gap-y-3">
          <h1 className="font-bold sm:text-xl lg:text-3xl">Produtos</h1>
          <p className="text-sm text-muted leading-relaxed max-w-lg">
            Adicione os produtos que deseja comprar ao seu carrinho
          </p>
        </div>

        <Link
          href="/products/register"
          className="hover:bg-primary sm:w-full md:w-auto text-center font-medium hover:brightness-75 transition-all px-6 py-3 text-sm rounded-md bg-primary duration-150"
        >
          Registrar
        </Link>
      </div>

      <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductsList />
      </div>
    </div>
  );
}
