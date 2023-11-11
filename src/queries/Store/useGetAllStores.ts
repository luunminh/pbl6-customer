import { useState, useEffect } from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { Callback, PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { StoreListParams, StoreResponse } from './type';
import { StoreApi } from '.';

export function useGetAllStores(
  options?: UseQueryOptions<PaginationResponseType<StoreResponse>, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const [params, setParams] = useState<StoreListParams>({ skip: 0 });

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllStores,
    isSuccess,
  } = useQuery<PaginationResponseType<StoreResponse>, Error>([ApiKey.STORE, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<StoreResponse>>(StoreApi.getStoreList, params);
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
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

  const handleInvalidateStoreList = () => queryClient.invalidateQueries([ApiKey.STORE]);

  const { data: stores = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    stores,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllStores,
    setParams,
    handleInvalidateStoreList,
    params,
  };
}
