import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import { COLOR_CODE } from '@components';

const StoreSkeleton = () => {
  return (
    <Skeleton
      variant="text"
      animation="wave"
      width="100%"
      height="40px"
      sx={{
        backgroundColor: COLOR_CODE.GREY_200,
        borderRadius: '8px',
      }}
    />
  );
};
const StoreListSkeleton = () => {
  return (
    <Stack spacing={1}>
      <StoreSkeleton />
      <StoreSkeleton />
      <StoreSkeleton />
    </Stack>
  );
};

export default StoreListSkeleton;
