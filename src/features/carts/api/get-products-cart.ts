import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { ExtractFnReturnType } from '@/lib/react-query'

import { Cart } from '../types'

function getProductsCart(): Promise<Cart[]> {
  return axios.get('/cart')
}

type QueryFnType = typeof getProductsCart;

export function useProductsCart() {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['products-cart'],
    queryFn: () => getProductsCart()
  });
}
