import { create } from 'zustand'
import { nanoid } from 'nanoid'

type Cart = {
  id: string
  productId: string
  name: string
  quantity: number
  image: string
  price: number
  userEmail: string
}

type CartStore = {
  cart: Cart[];
  loadCart: (carts: Cart[]) => void;
  addProductIntoCart: (cartProduct: Omit<Cart, 'id'>) => void;
  removeProductFromCart: (productId: string, user: string) => void;
  increaseQuantity: (productId: string, user: string) => void;
  decreaseQuantity: (productId: string, user: string) => void;  
};

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  loadCart: (carts: Cart[]) => {       
    set(() => ({ cart: carts }));
  },
  addProductIntoCart: (cartProduct: Omit<Cart, 'id'>) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex(
        (product) =>
          product.productId === cartProduct.productId &&
          product.userEmail === cartProduct.userEmail
      );
  
      if (existingProductIndex !== -1) {        
        state.cart[existingProductIndex] = {
          ...state.cart[existingProductIndex],
          quantity: state.cart[existingProductIndex].quantity + cartProduct.quantity,
        };
      } else {        
        state.cart.push({
          ...cartProduct,
          id: nanoid(),
        });
      }
  
      return { cart: state.cart };
    });
  },
  removeProductFromCart: (productId: string, user: string) => {
    set((state) => {
      const productIndex = state.cart.findIndex(
        (product) =>
          product.productId === productId && product.userEmail === user
      );
  
      if (productIndex !== -1) {
        state.cart.splice(productIndex, 1);
      }
  
      return { cart: state.cart };
    });
  },  
  increaseQuantity: (productId: string, user: string) => {
    set((state) => {
      const productIndex = state.cart.findIndex(
        (product) =>
          product.productId === productId && product.userEmail === user
      );
      
      const newQtd = Math.min(state.cart[productIndex].quantity + 1, 10);
  
      if (productIndex !== -1) {
        state.cart[productIndex] = {
          ...state.cart[productIndex],
          quantity: newQtd,
        };
      }
  
      return { cart: state.cart };
    });
  },  
  decreaseQuantity: (productId: string, user: string) => {
    set((state) => {
      const productIndex = state.cart.findIndex(
        (product) =>
          product.productId === productId && product.userEmail === user
      );
  
      if (productIndex !== -1) {
        state.cart[productIndex] = {
          ...state.cart[productIndex],
          quantity: Math.max(1, state.cart[productIndex].quantity - 1),
        };
      }
  
      return { cart: state.cart };
    });
  },
}))
