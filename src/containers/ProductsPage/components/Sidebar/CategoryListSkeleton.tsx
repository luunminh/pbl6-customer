import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import { COLOR_CODE } from '@components';

const CategorySkeleton = () => {
  return (
    <Skeleton
      variant="text"
      animation="wave"
      sx={{ fontSize: '16px', backgroundColor: COLOR_CODE.GREY_200 }}
    />
  );
};
const CategoryListSkeleton = () => {
  return (
    <Stack spacing={1}>
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
      <CategorySkeleton />
    </Stack>
  );
};

export default CategoryListSkeleton;
