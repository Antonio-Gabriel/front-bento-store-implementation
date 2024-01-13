'use client';

import { useProducts } from '../api/get-products';

import { useCartStore } from '@/stores/cart-store'
import { FormatRealPrice } from '@/utils/format-price';
import { ProductCard } from './Product/Card/ProductCard';
import { ProductCardSkeleton } from './Product/Card/Product-Card-Skeleton';
import { useUpdateProductsFromCart } from '@/features/carts/api/update-product-into-cart'

import { Product } from '../types';
import { useState } from 'react';

export function ProductsList() {
  const products = useProducts();  
  const { mutateAsync } = useUpdateProductsFromCart()

  const [productToLoad, setProductToLoad] = useState<string>()

  const { addProductIntoCart } = useCartStore(store => store)

  async function handleAddProductIntoCart(product: Product) {
    const payload = {
      name: product.title,
      productId: product.id,
      price: product.price,
      image: product.image,
      quantity: 1,
      userEmail: 'herlanderbento19@gmail.com',
    }
    
    addProductIntoCart(payload);
    setProductToLoad(payload.productId)
    
    await mutateAsync({
      cart: payload
    })

    setProductToLoad("")
  }

  return (
    <>
      {products.isLoading && <ProductCardSkeleton />}
      {Array.isArray(products.data) &&
        products.data.map((product) => (
          <ProductCard
            key={product.id}
            className="col-span-1"
            image={product.image}
            rate={product.rate}
            title={product.title}
            description={product.description}
            price={FormatRealPrice(product.price)}
            addProductIntoCart={() => {
              handleAddProductIntoCart(product);
            }}
            isPending={productToLoad == product.id ? true : false}
          />
        ))}
      
      {!products.isLoading && products.data?.length == 0 && (
        <p>Without product</p>
      )}
    </>
  );
}
