import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { ApiResponseType, Callback, responseWrapper } from '@shared';
import { Cart } from './types';
import { CartApi } from '.';

export function useGetCart(
  options?: UseQueryOptions<ApiResponseType<Cart[]>, Error, Cart[]> & {
    storeId: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetCartList: QueryFunction<ApiResponseType<Cart[]>> = () =>
    responseWrapper<ApiResponseType<Cart[]>>(CartApi.getCartList, [options.storeId]);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<Cart[]>, Error, Cart[]>([ApiKey.CART, options.storeId], {
    queryFn: handleGetCartList,
    notifyOnChangeProps: ['data', 'isFetching'],
    ...options,
  });

  useEffect(() => {
    if (data && isSuccess) {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  useEffect(() => {
    if (isError) {
      if (options?.onErrorCallback) {
        options.onErrorCallback(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  const queryClient = useQueryClient();

  const handleInvalidateCart = () => queryClient.invalidateQueries([ApiKey.CART, options.storeId]);

  return {
    cart: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateCart,
  };
}
