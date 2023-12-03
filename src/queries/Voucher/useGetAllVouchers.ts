import { useState, useEffect } from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { Callback, PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { VoucherListParams, VoucherResponse } from './type';
import { VoucherApi } from '.';

export function useGetAllVouchers(
  options?: UseQueryOptions<PaginationResponseType<VoucherResponse>, Error> & {
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const [params, setParams] = useState<VoucherListParams>({
    skip: 0,
    order: 'endDate:asc',
    valid: true,
  });

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllVouchers,
    isSuccess,
  } = useQuery<PaginationResponseType<VoucherResponse>, Error>([ApiKey.VOUCHER, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return responseWrapper<PaginationResponseType<VoucherResponse>>(VoucherApi.getVoucherList, [
        params,
      ]);
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

  const handleInvalidateVoucherList = () => queryClient.invalidateQueries([ApiKey.VOUCHER]);

  const { data: vouchers = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    vouchers,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllVouchers,
    setParams,
    handleInvalidateVoucherList,
    params,
  };
}
