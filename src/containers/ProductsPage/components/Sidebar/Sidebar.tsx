import React, { useCallback, useMemo } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { COLOR_CODE } from '@components';
import { useGetInfiniteCategory } from '@queries/Category';
import { Toastify } from '@shared';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CategoryListSkeleton from './CategoryListSkeleton';
import { ProductGridQueryParams } from '../ProductGrid/type';

const Sidebar = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = useMemo(() => new URLSearchParams(search), [search]);

  const {
    categoryPages,
    isFetching,
    hasNextPage,
    fetchNextPage,
    resetCategories: showLessCategories,
  } = useGetInfiniteCategory({
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSelectCategory = useCallback((categoryList: string[], query: URLSearchParams) => {
    if (categoryList.length > 0) {
      query.delete(ProductGridQueryParams.CATEGORIES);
      categoryList.forEach((category) => {
        query.append(ProductGridQueryParams.CATEGORIES, category);
      });
    } else {
      query.delete(ProductGridQueryParams.CATEGORIES);
    }
    return navigate({ search: query.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack spacing={2} sx={{ width: '15%' }}>
      <Typography variant="h4" sx={{ fontWeight: 600, color: COLOR_CODE.GREY_800 }}>
        Categories
      </Typography>
      <Stack spacing={2}>
        {isFetching ? (
          <CategoryListSkeleton />
        ) : (
          <>
            {categoryPages
              ?.flatMap((page) => page.data)
              .map((category) => {
                const isActive = query?.get(ProductGridQueryParams.CATEGORIES) === category.id;
                return (
                  <Typography
                    key={category.id}
                    variant="h5"
                    sx={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? COLOR_CODE.PRIMARY_500 : COLOR_CODE.GREY_800,
                    }}
                  >
                    <button onClick={() => handleSelectCategory([category.id], query)}>
                      {category.name}
                    </button>
                  </Typography>
                );
              })}
            {hasNextPage ? (
              <Button
                variant="text"
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: COLOR_CODE.GREY_600,
                }}
                endIcon={<IoIosArrowDown size={'16px'} />}
                onClick={() => fetchNextPage()}
              >
                View More
              </Button>
            ) : (
              <Button
                variant="text"
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: COLOR_CODE.GREY_600,
                }}
                endIcon={<IoIosArrowUp size={'16px'} />}
                onClick={() => showLessCategories()}
              >
                View Less
              </Button>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Sidebar;
