import { Stack } from '@mui/material';
import { useGetAllStores } from '@queries/Store';
import { Toastify } from '@shared';
import StoreItem from '../StoreItem';
import StoreListSkeleton from './StoreListSkeleton';
import { COLOR_CODE } from '@components';

const StoreList = () => {
  const { stores, isFetching } = useGetAllStores({
    onError: (error) => Toastify.error(error?.message),
  });

  return (
    <Stack
      width="65%"
      justifyContent="center"
      gap={2}
      sx={{ backgroundColor: COLOR_CODE.PRIMARY_100, padding: '35px', borderRadius: '25px' }}
    >
      {isFetching ? (
        <StoreListSkeleton />
      ) : (
        stores.map((store) => <StoreItem key={store.id} store={store} />)
      )}
    </Stack>
  );
};

export default StoreList;
