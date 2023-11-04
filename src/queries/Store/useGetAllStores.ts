import { StoreResponse } from './type';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiKey } from '@queries/keys';
import { StoreApi } from '.';
import { ApiResponseType, responseWrapper } from '@shared';

export function useGetAllStores(
  options?: UseQueryOptions<ApiResponseType<StoreResponse>, Error, StoreResponse>,
) {
  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllStores,
  } = useQuery<ApiResponseType<StoreResponse>, Error, StoreResponse>([ApiKey.STORE], {
    queryFn: () => responseWrapper<ApiResponseType<StoreResponse>>(StoreApi.getStoreList),
    notifyOnChangeProps: ['data', 'isFetching'],
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateStores = () => queryClient.invalidateQueries([ApiKey.STORE]);

  return { data, error, isError, isFetching, onGetAllStores, handleInvalidateStores };
}
