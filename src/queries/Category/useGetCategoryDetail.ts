import { ApiResponseType, Callback, isEmpty, responseWrapper } from '@shared';
import { QueryFunction, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiKey } from '../keys';
import { CategoryDetail } from './type';
import { CategoryApi } from '.';

export function useGetCategoryDetail(
  options?: UseQueryOptions<ApiResponseType<CategoryDetail>, Error, CategoryDetail> & {
    id: string;
    onSuccessCallback?: Callback;
    onErrorCallback?: Callback;
  },
) {
  const handleGetCategoryDetail: QueryFunction<ApiResponseType<CategoryDetail>> = () =>
    responseWrapper<ApiResponseType<CategoryDetail>>(CategoryApi.getCategoryDetail, [options.id]);

  const {
    data,
    error,
    isError,
    isRefetching: isLoading,
    isSuccess,
  } = useQuery<ApiResponseType<CategoryDetail>, Error, CategoryDetail>(
    [ApiKey.CATEGORY, options.id],
    {
      queryFn: handleGetCategoryDetail,
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !isEmpty(options.id),
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

  const handleInvalidateCategoryDetail = () =>
    queryClient.invalidateQueries([ApiKey.CATEGORY, options.id]);

  return {
    categoryDetail: data,
    isError,
    error,
    isLoading: isLoading,
    isSuccess,
    handleInvalidateCategoryDetail,
  };
}
