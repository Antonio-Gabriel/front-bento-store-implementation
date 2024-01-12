import { AxiosError } from 'axios'
import { 
  QueryClient, 
  UseQueryOptions, 
  UseMutationOptions, 
  DefaultOptions 
} from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
  queries: {    
    refetchOnWindowFocus: false,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  ReturnType<FnType> extends Promise<infer T> ? T : never;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;
  