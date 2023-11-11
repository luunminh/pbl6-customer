import { useState } from 'react';
import { UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';
import { ProductListParams, ProductResponse } from './type';
import { ProductApi } from '.';

export function useGetAllProducts(
  options?: UseQueryOptions<PaginationResponseType<ProductResponse>, Error>,
) {
  const [params, setParams] = useState<ProductListParams>({});

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetAllProducts,
  } = useQuery<PaginationResponseType<ProductResponse>, Error>([ApiKey.PRODUCT, params], {
    queryFn: (query) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, ...params] = query.queryKey;
      return responseWrapper<PaginationResponseType<ProductResponse>>(
        ProductApi.getProductList,
        params,
      );
    },
    notifyOnChangeProps: ['data', 'isFetching'],
    keepPreviousData: true,
    enabled: !isEmpty(params),
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateProductList = () => queryClient.invalidateQueries([ApiKey.PRODUCT]);

  const { data: products = [], hasNext, payloadSize, totalRecords } = data || {};

  return {
    params,
    products,
    hasNext,
    payloadSize,
    totalRecords,
    error,
    isError,
    isFetching,
    onGetAllProducts,
    setParams,
    handleInvalidateProductList,
  };
}
