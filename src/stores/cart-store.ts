import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { useProductsCart } from '@/features/carts/api/get-products-cart'
import { useUpdateProductsFromCart } from '@/features/carts/api/update-product-into-cart'

type Cart = {
  id: string
  productId: string
  name: string
  quantity: number
  price: number
  userEmail: string
}

type CartStore = {
  cart: Cart[];
  addProductIntoCart: (cartProduct: Omit<Cart, 'id'>) => void;
  removeProductFromCart: (productId: string, user: string) => void;
  increaseQuantity: (productId: string, user: string) => void;
  decreaseQuantity: (productId: string, user: string) => void;
  fetchCartData: () => Promise<void>;
  updateProductIntoCart: (cartData?: Cart[]) => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addProductIntoCart: (cartProduct: Omit<Cart, 'id'>) => {
    set((state) => {
      const isProductInCart = state.cart.some(
        (product) =>
          product.productId === cartProduct.productId &&
          product.userEmail === cartProduct.userEmail
      );

      const updatedCart = [...state.cart];

      if (isProductInCart) {
        state.cart = state.cart.map((product) => {
          if (
            product.productId === cartProduct.productId &&
            product.userEmail === cartProduct.userEmail
          ) {
            return {
              ...product,
              quantity: product.quantity + cartProduct.quantity,
            };
          }
          return product;
        });
      } else {
        updatedCart.push({
          ...cartProduct,
          id: nanoid(),
        });
      }

      set({ cart: updatedCart });
      useCartStore.getState().updateProductIntoCart(updatedCart)
      return { cart: updatedCart };     
    });    
  },
  removeProductFromCart: (productId: string, user: string) => {
    set((state) => {
      state.cart = state.cart.filter(
        (product) =>
          !(product.productId === productId && product.userEmail === user)
      );
      return { cart: state.cart };
    });
  },
  increaseQuantity: (productId: string, user: string) => {
    set((state) => {
      state.cart = state.cart.map((product) => {
        if (
          product.productId === productId &&
          product.userEmail === user
        ) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });

      return { cart: state.cart };
    });
  },
  decreaseQuantity: (productId: string, user: string) => {
    set((state) => {
      state.cart = state.cart.map((product) => {
        if (
          product.productId === productId &&
          product.userEmail === user
        ) {
          return {
            ...product,
            quantity: Math.max(1, product.quantity - 1),
          };
        }
        return product;
      });

      return { cart: state.cart };
    });
  },
  fetchCartData: async () => {
    const { data } = await useProductsCart()
    set({ cart: data || [] });
  },
  updateProductIntoCart: async (cartData?: Cart[]) => {
    const { mutateAsync, isSuccess } = useUpdateProductsFromCart()
    await mutateAsync({
      cart: cartData || useCartStore.getState().cart
    })

    if(isSuccess) {
      useCartStore.getState().fetchCartData()
    }
  }
}))
