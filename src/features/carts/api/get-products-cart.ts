import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { ExtractFnReturnType } from '@/lib/react-query'

import { Cart } from '../types'

function getProductsCart(): Promise<Cart[]> {
  return axios.get('/carts')
}

type QueryFnType = typeof getProductsCart;

export function useProductsCart() {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['carts'],
    queryFn: () => getProductsCart()
  });
}
