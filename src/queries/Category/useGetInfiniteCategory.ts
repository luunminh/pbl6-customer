import { PaginationResponseType, isEmpty, responseWrapper } from '@shared';
import { UseInfiniteQueryOptions, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { CategoryListResponse, CategoryListParams } from './type';
import { useMemo, useState } from 'react';
import { ApiKey } from '@queries/keys';
import { CategoryApi } from '.';

export function useGetInfiniteCategory(
  options?: UseInfiniteQueryOptions<PaginationResponseType<CategoryListResponse>, Error>,
) {
  const [params, setParams] = useState<CategoryListParams>({});

  const takeAmount = 7;

  const {
    data,
    error,
    isError,
    isFetching,
    refetch: onGetInfiniteCategory,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<PaginationResponseType<CategoryListResponse>, Error>(
    [ApiKey.CATEGORY, 'infinite'],
    {
      queryFn: (props): Promise<PaginationResponseType<CategoryListResponse>> => {
        const { pageParam = { take: takeAmount, skip: 0 } } = props;
        return responseWrapper<PaginationResponseType<CategoryListResponse>>(
          CategoryApi.getCategoryList,
          [{ ...pageParam, ...params, order: 'name:asc' }],
        );
      },
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.data?.length < takeAmount) return undefined;
        return {
          take: takeAmount,
          skip: allPages.length * takeAmount,
        };
      },
      notifyOnChangeProps: ['data', 'isFetching'],
      enabled: !!params,
      ...options,
    },
  );

  const categoryPages = useMemo(() => {
    if (isEmpty(data?.pages)) return [];
    return data.pages;
  }, [data]);

  const hasNext = useMemo(() => {
    if (isEmpty(data?.pages)) return null;
    return data.pages[data.pages.length - 1]?.hasNext;
  }, [data]);

  const queryClient = useQueryClient();

  const handleInvalidateCategories = () =>
    queryClient.invalidateQueries([ApiKey.CATEGORY, 'infinite']);

  const resetCategories = () => queryClient.resetQueries([ApiKey.CATEGORY, 'infinite']);

  return {
    categoryPages,
    hasNext,
    error,
    isError,
    isFetching,
    onGetInfiniteCategory,
    setParams,
    hasNextPage,
    fetchNextPage,
    handleInvalidateCategories,
    resetCategories,
  };
}
