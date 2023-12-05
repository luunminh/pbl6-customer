import { PaginationResponseType, responseWrapper, Callback } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { TableParams } from '@components';
import { GetOrdersResponse, OrderApi } from '.';
import { ApiKey } from '@queries/keys';

export function useGetOrders(
  options?: UseQueryOptions<PaginationResponseType<GetOrdersResponse>, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const [params, setParams] = useState<TableParams>({ order: 'createdAt:asc' });
  const { data, error, isSuccess, isError, isFetching } = useQuery<
    PaginationResponseType<GetOrdersResponse>,
    Error
  >([ApiKey.ORDER, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<GetOrdersResponse>>(OrderApi.getOrders, params);
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

  const { data: orders = [], totalRecords } = data || {};

  const queryClient = useQueryClient();

  const handleInvalidateOrders = () => queryClient.invalidateQueries([ApiKey.VOUCHER]);

  return {
    orders,
    totalRecords,
    error,
    isSuccess,
    isFetching,
    setParams,
    handleInvalidateOrders,
  };
}
