import { useProducts } from '../api/get-products'

import { useCartStore } from '@/stores/cart-store'
import { FormatRealPrice } from '@/utils/format-price'
import { ProductCard } from './Product/Card/ProductCard'
import { ProductCardSkeleton } from './Product/Card/Product-Card-Skeleton'

import { Product } from '../types'

export function ProductsList() {
  const products = useProducts()
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
    <>
      {products.isLoading && <ProductCardSkeleton /> }

      {products.data?.map(product => (
        <ProductCard 
          key={product.id}
          className="col-span-1"
          image={product.image}
          rate={product.rate}
          title={product.title}
          description={product.description}
          price={FormatRealPrice(product.price)}
          addProductIntoCart={() => {
            handleAddProductIntoCart(product)
          }}
        />
      ))}

      {!products.isLoading && products.data?.length == 0 && <p>Without product</p> }
    </>
  )
}
