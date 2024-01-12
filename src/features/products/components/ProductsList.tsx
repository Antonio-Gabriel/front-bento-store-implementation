import { useProducts } from '../api/get-products'

import { FormatRealPrice } from '@/utils/format-price'
import { ProductCard } from './Product/Card/ProductCard'
import { ProductCardSkeleton } from './Product/Card/Product-Card-Skeleton'

import { Product } from '../types'

type ProductsHandlers = {
  handleAddProductIntoCart: (product: Product) => void;
}

export function ProductsList({ handleAddProductIntoCart }: ProductsHandlers) {
  const products = useProducts()  

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
