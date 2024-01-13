import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationsStore } from '@/stores/notifications-store';

import { Cart } from '../types';

type UpdateProductQuantityDTO = {
  productId: string;
  userEmail: string;
  quantity: number;
};

async function updateProductQuantity({
  productId,
  quantity,
  userEmail
}: UpdateProductQuantityDTO): Promise<Cart> {

  const { addNotification } = useNotificationsStore();

  const carts = await axios.get<Cart[]>('/carts');

  const cartItem = carts.find(
    (c: Cart) => c.productId === productId && c.userEmail === userEmail
  )

  if (!cartItem) {
    addNotification({
      type: 'error',
      title: 'Produto não encontrado',
    });    
  }

  const newQuantity = Math.max(1, Math.min(quantity, 10));

  cartItem.quantity = newQuantity;

  return axios.put(`/carts/${cartItem.id}`, cartItem);
}

export function useUpdateProductQuantity() {  
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

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['carts'],
      });     
    },
    mutationFn: updateProductQuantity,
  });
}
