import { useMutation } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { queryClient } from '@/lib/react-query'
import { useNotificationsStore } from '@/stores/notifications-store'

import { Product } from '../types'

type CreateProductDTO = {
  data: {
    title: string
    price: number
    image: string
    rate: number
    description: string
  }
}

async function createProduct({ data }: CreateProductDTO): Promise<Product> {
  return axios.post('/products', { ...data })
}

export function useCreateProject() {
  const { addNotification } = useNotificationsStore()

  return useMutation({
    onMutate: async (newProduct: any) => {
      await queryClient.cancelQueries({
        queryKey: ['products']
      })

      const previousProducts = queryClient.getQueriesData<Product[]>({
        queryKey: ['products']
      })

      queryClient.setQueryData(['products'], [...(previousProducts || []), newProduct.data])
      return { previousProducts }
    },

    onError: (_, __, context: any ) => {
      if(context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts)
      }

      addNotification({
        type: 'error',
        title: 'Algo deu errado!'
      })
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products']
      })
      addNotification({
        type: 'success',
        title: 'Produto registrado com sucesso'
      })
    },
    mutationFn: createProduct
  })
}
