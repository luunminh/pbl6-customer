import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { TbSortAscending, TbSortDescending } from 'react-icons/tb';
import { COLOR_CODE, Image, Loading, Select } from '@components';
import { ProductListParams, useGetAllProducts } from '@queries/Product';
import { IMAGES } from '@appConfig/images';
import { isEmpty } from '@shared';
import CustomPagination from '../CustomPagination';
import ProductItem from '../ProductItem';
import { getInitialGridState, sortPriceOptions } from './helpers';
import { ProductGridQueryParams, productGrid } from './type';

const ProductGrid = () => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const [selectedSortValue, setSelectedSortValue] = useState('');

  useEffect(() => {
    handleTriggerAction();
    setSelectedSortValue(query.get(ProductGridQueryParams.ORDER) || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const currentState = getInitialGridState(query);

  const getActionParams = useCallback(
    (currentState, query: URLSearchParams) => {
      const itemsPerPage = currentState?.itemsPerPage;
      const page = currentState?.page;
      const searchText = currentState?.searchText;
      const categories = currentState?.categories;

      let orderParam = null;
      if (!isEmpty(currentState?.sortOrder?.name) && !isEmpty(currentState?.sortOrder?.direction)) {
        orderParam = `${currentState?.sortOrder?.name}:${currentState?.sortOrder?.direction}`;
      }

      const params = {
        skip: page * itemsPerPage,
        take: itemsPerPage,
        order: orderParam,
        search: searchText,
        categories: categories,
      };

      return params;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const setSortParam = useCallback((sortValue: string, query: URLSearchParams) => {
    if (!isEmpty(sortValue)) {
      query.set(ProductGridQueryParams.ORDER, sortValue);
    } else {
      query.delete(ProductGridQueryParams.ORDER);
    }
    return navigate({ search: query.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTriggerAction = () => {
    const params = getActionParams(currentState, query);
    handleGetProductList(params);
  };

  const { products, totalRecords, setParams, isFetching } = useGetAllProducts();

  const handleGetProductList = (params: ProductListParams) => {
    setParams({ ...params });
  };

  if (isFetching) {
    return (
      <Stack width={'85%'} alignItems={'center'} justifyContent={'center'}>
        <Loading variant="primary" />
      </Stack>
    );
  }

  return (
    <Stack width={'85%'} gap={5} justifyContent={'center'}>
      {products?.length > 0 ? (
        <>
          <Stack alignSelf={'end'}>
            <Select
              onChange={(name, value) => {
                setSelectedSortValue(value);
                setSortParam(value, query);
              }}
              options={sortPriceOptions}
              value={selectedSortValue}
              placeholder="Sort by Price"
              alignEnd
              icon={
                selectedSortValue?.includes('asc') ? (
                  <TbSortAscending color={COLOR_CODE.PRIMARY_500} size="18px" />
                ) : selectedSortValue?.includes('desc') ? (
                  <TbSortDescending color={COLOR_CODE.PRIMARY_500} size="18px" />
                ) : null
              }
            />
          </Stack>
          <Grid container columnSpacing={2} rowSpacing={4}>
            {products.map((product) => (
              <Grid item xs={3} key={product.id}>
                <ProductItem product={product} />
              </Grid>
            ))}
          </Grid>
          <CustomPagination
            count={totalRecords}
            page={Number(query.get(ProductGridQueryParams.PAGE) || 0)}
            itemsPerPage={productGrid.ITEMS_PER_PAGE}
          />
        </>
      ) : (
        <Stack alignItems={'center'} spacing={1}>
          <Image
            src={IMAGES.noResultsFound}
            style={{ width: '200px', height: '200px', alignSelf: 'center' }}
          />
          <Typography variant="body1" fontWeight={600}>
            No Results Found
          </Typography>
          <Typography variant="body2">We couldn't find what you're looking for...</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default ProductGrid;
