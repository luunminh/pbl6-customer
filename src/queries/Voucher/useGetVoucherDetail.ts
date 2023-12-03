import { ApiKey } from '@queries/keys';
import { ApiResponseType, isEmpty, responseWrapper } from '@shared';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { VoucherApi } from '.';
import { VoucherResponse } from './type';

export function useGetVoucherDetail(
  options?: UseQueryOptions<ApiResponseType<VoucherResponse>, Error, VoucherResponse> & {
    voucherId: string;
  },
) {
  const {
    data: voucher,
    error,
    isError,
    isFetching,
    isSuccess,
  } = useQuery<ApiResponseType<VoucherResponse>, Error, VoucherResponse>(
    [ApiKey.VOUCHER, { id: options?.voucherId }],
    {
      queryFn: () => {
        return responseWrapper<ApiResponseType<VoucherResponse>>(VoucherApi.getVoucherDetail, [
          options?.voucherId,
        ]);
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !isEmpty(options?.voucherId),
      ...options,
    },
  );

  const queryClient = useQueryClient();

  const handleInvalidateVoucherDetail = () =>
    queryClient.invalidateQueries([ApiKey.VOUCHER, { id: options?.voucherId }]);

  return {
    voucher,
    error,
    isError,
    isFetching,
    isSuccess,
    handleInvalidateVoucherDetail,
  };
}
