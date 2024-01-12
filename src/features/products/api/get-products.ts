import { useQuery } from '@tanstack/react-query'

import { axios } from '@/lib/axios'
import { ExtractFnReturnType } from '@/lib/react-query'

import { Product } from '../types'

function getProducts(): Promise<Product[]> {
  return axios.get('/products')
}

type QueryFnType = typeof getProducts;

export function useProducts() {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['products'],
    queryFn: () => getProducts()
  });
}
