"use client"

import Link from "next/link";

import { useCartStore } from '@/stores/cart-store'
import { Product } from '@/features/products/types'
import { ProductsList } from '@/features/products/components/ProductsList'

export default function Products() {
  const { cart, addProductIntoCart } = useCartStore(store => store)
    
  function handleAddProductIntoCart(product: Product) {    
    addProductIntoCart({
      name: product.title,
      productId: product.id,
      price: product.price,
      quantity: 1,
      userEmail: "herlanderbento19@gmail.com"
    })    
    console.log(cart)
  }

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
        <ProductsList handleAddProductIntoCart={handleAddProductIntoCart} />        
      </div>
    </div>
  );
}
