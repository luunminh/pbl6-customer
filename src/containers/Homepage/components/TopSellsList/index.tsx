import { Grid } from '@mui/material';
import { useGetTopSells } from '@queries';
import { StoreService } from '@shared';
import { useEffect } from 'react';
import TopSellsItem from '../TopSellsItem';

const TopSellsList = () => {
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
        <Grid item xs={2.4} key={product.product.id}>
          <TopSellsItem product={product.product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopSellsList;
