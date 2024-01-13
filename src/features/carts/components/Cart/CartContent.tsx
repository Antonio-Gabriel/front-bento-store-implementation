"use client"

import { useCartStore } from '@/stores/cart-store'
import { FormatRealPrice } from '@/utils/format-price'

import { Separator } from '@radix-ui/react-separator';
import { CartProduct } from '@/features/carts/components/CartProduct/CartProduct';
import { useUpdateProductQuantity } from '@/features/carts/api/update-product-quantity'


export function CartContent({ className }: { className?: string }) {  
  const { 
    cart: carts, 
    increaseQuantity, 
    decreaseQuantity 
  } = useCartStore(store => store)      
  const { mutateAsync } = useUpdateProductQuantity()

  const cartTotal = carts?.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);

  async function handleIncreateQuantity(productId: string, userEmail: string, quantity: number) {    
    increaseQuantity(productId, userEmail)
    // await mutateAsync({
    //   productId,
    //   userEmail,
    //   quantity
    // })
  }

  function handleDecreaseQuantity(productId: string, userEmail: string, quantity: number) {    
    decreaseQuantity(productId, userEmail)
  }

  return (
    <div
      className={`flex flex-col flex-1 sm:px-4 lg:px-0 gap-8 w-full ${className} overflow-y-auto`}
    >      

      {Array.isArray(carts) && 
        carts?.map((cart) => (
          <CartProduct
            key={cart.id}
            image={cart.image}
            title={cart.name}
            quantity={cart.quantity}
            price={FormatRealPrice(cart.price)}
            increaseQuantity={() => {
              handleIncreateQuantity(cart.productId, cart.userEmail, cart.quantity)
            }}
            decreaseQuantity={() => {
              handleDecreaseQuantity(cart.productId, cart.userEmail, cart.quantity)
            }}
          />      
        )) 
      }      

      <div className="w-full flex flex-col  gap-y-4">
        <Separator orientation="horizontal" className="bg-border h-[2px]" />
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">{FormatRealPrice(cartTotal)}</span>
        </div>
      </div>
    </div>
  );
}
