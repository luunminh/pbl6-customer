import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { ApiResponseType, Callback, responseWrapper } from '@shared';
import { GetOrderDetailResponse, OrderApi } from '.';

export function useGetOrderDetail(
  options?: UseQueryOptions<
    ApiResponseType<GetOrderDetailResponse>,
    Error,
    GetOrderDetailResponse
  > & {
    id: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetOrderDetail: QueryFunction<ApiResponseType<GetOrderDetailResponse>> = () =>
    responseWrapper<ApiResponseType<GetOrderDetailResponse>>(OrderApi.getOrderDetail, [options.id]);

  const {
    data,
    error,
    isError,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<GetOrderDetailResponse>, Error, GetOrderDetailResponse>(
    [ApiKey.ORDER, options.id],
    {
      queryFn: handleGetOrderDetail,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!options.id,
      ...options,
    },
  );

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

  const handleInvalidateOrderDetail = () =>
    queryClient.invalidateQueries([ApiKey.ORDER, options.id]);

  return {
    orderDetail: data,
    isError,
    error,
    isLoading,
    isSuccess,
    handleInvalidateOrderDetail,
  };
}
