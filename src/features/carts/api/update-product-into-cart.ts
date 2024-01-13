import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationsStore } from '@/stores/notifications-store';

import { Cart } from '../types';

type UpdateProductIntoCartDTO = {
  cart: Cart[];
};

async function updateProductFromCart({
  cart,
}: UpdateProductIntoCartDTO): Promise<Cart> {
  return axios.post('/carts', JSON.stringify({ ...cart }));
}

export function useUpdateProductsFromCart() {
  const { addNotification } = useNotificationsStore();

  return useMutation({
    onMutate: async (newCartProduct: any) => {
      await queryClient.cancelQueries({
        queryKey: ['carts'],
      });

      const previousCartProducts = queryClient.getQueriesData({
        queryKey: ['carts'],
      });

      queryClient.setQueryData(
        ['carts'],
        [...(previousCartProducts || []), newCartProduct.data]
      );
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
