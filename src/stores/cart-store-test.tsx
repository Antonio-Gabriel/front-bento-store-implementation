import { useProductsCart } from '@/features/carts/api/get-products-cart';
import { useUpdateProductsFromCart } from '@/features/carts/api/update-product-into-cart';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

type Cart = {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  userEmail: string;
};

type CartStore = {
  cart: Cart[];
  addProductIntoCart: (cartProduct: Omit<Cart, 'id'>) => void;
  removeProductFromCart: (productId: string, user: string) => void;
  increaseQuantity: (productId: string, user: string) => void;
  decreaseQuantity: (productId: string, user: string) => void;
  fetchCartData: () => Promise<void>;
  updateProductIntoCart: (cartData?: Cart[]) => Promise<void>;
};

export const useCartStores = (): CartStore => {
  const [cart, setCart] = useState<Cart[]>([]);
  const productsCartQuery = useProductsCart();
  const updateProductsFromCartMutation = useUpdateProductsFromCart();

  useEffect(() => {
    if (productsCartQuery.data) {
      setCart(productsCartQuery.data);
    }
  }, [productsCartQuery.data]);

  const addProductIntoCart = async (cartProduct: Omit<Cart, 'id'>) => {
    const isProductInCart = cart.some(
      (product) =>
        product.productId === cartProduct.productId &&
        product.userEmail === cartProduct.userEmail
    );

    if (isProductInCart) {
      const updatedCart = cart.map((product) => {
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

      setCart(updatedCart);
      await updateProductIntoCart(updatedCart);
    } else {
      const updatedCart = [
        ...cart,
        {
          ...cartProduct,
          id: uuidv4(),
        },
      ];

      setCart(updatedCart);
      await updateProductIntoCart(updatedCart);
    }
  };

  const removeProductFromCart = (productId: string, user: string) => {
    const updatedCart = cart.filter(
      (product) =>
        !(product.productId === productId && product.userEmail === user)
    );
    setCart(updatedCart);
  };

  const increaseQuantity = (productId: string, user: string) => {
    const updatedCart = cart.map((product) => {
      if (product.productId === productId && product.userEmail === user) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId: string, user: string) => {
    const updatedCart = cart.map((product) => {
      if (product.productId === productId && product.userEmail === user) {
        return {
          ...product,
          quantity: Math.max(1, product.quantity - 1),
        };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const fetchCartData = async () => {
    await productsCartQuery.refetch();
  };

  const updateProductIntoCart = async (cartData?: Cart[]) => {
    await updateProductsFromCartMutation.mutateAsync({
      cart: cartData ?? cart,
    });

    await fetchCartData();
  };

  return {
    cart,
    addProductIntoCart,
    removeProductFromCart,
    increaseQuantity,
    decreaseQuantity,
    fetchCartData,
    updateProductIntoCart,
  };
};
