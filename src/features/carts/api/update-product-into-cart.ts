import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationsStore } from '@/stores/notifications-store';

import { Cart } from '../types';

type UpdateProductIntoCartDTO = {
  cart: Omit<Cart, 'id'>;
};

async function updateProductFromCart({
  cart,
}: UpdateProductIntoCartDTO): Promise<Cart> {
  const carts = await axios.get<Cart[]>('/carts');

  const isInTheCart = carts.find(
      (c) => c.productId == cart.productId && c.userEmail == cart.userEmail)    

  if (!isInTheCart) {    
    return axios.post('/carts', cart);;
  }  

  isInTheCart.quantity += cart.quantity  
  return axios.put(`/carts/${isInTheCart.id}`, isInTheCart);  
}

export function useUpdateProductsFromCart() {
  const { addNotification } = useNotificationsStore();

  return useMutation({
    onMutate: async (newCartProducts: any) => {
      await queryClient.cancelQueries({
        queryKey: ['carts'],
      });

      const previousCartProducts = queryClient.getQueriesData({
        queryKey: ['carts'],
      });
      
      queryClient.setQueryData(['carts'], [...(previousCartProducts || []), newCartProducts.data])

      return { previousCartProducts };
    },

    onError: (_, __, context: any) => {
      if (context?.previousCartProducts) {
        queryClient.setQueryData(['carts'], context.previousProducts);
      }

      addNotification({
        type: 'error',
        title: 'Algo deu errado!',
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['carts'],
      });

      addNotification({
        type: 'success',
        title: 'Produto adicionado ao carrinho com sucesso',
      });
    },
    mutationFn: updateProductFromCart,
  });
}
