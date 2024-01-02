import { Grid, useMediaQuery } from '@mui/material';
import { useGetTopSells } from '@queries';
import { StoreService } from '@shared';
import { useEffect } from 'react';
import TopSellsItem from '../TopSellsItem';

const TopSellsList = () => {
  const isMobileScreen = useMediaQuery('(max-width: 767px)');

  const { topSells, setParams } = useGetTopSells();

  const storeId = StoreService.getValue();

  useEffect(() => {
    if (storeId) {
      setParams({ storeId: storeId });
    } else {
      setParams({ storeId: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  return (
    <Grid container columnSpacing={2} rowSpacing={4}>
      {topSells?.slice(0, 10)?.map((product) => (
        <Grid item xs={isMobileScreen ? 6 : 2.4} key={product.product.id}>
          <TopSellsItem product={product.product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopSellsList;
