import { Grid, Stack, Typography } from '@mui/material';
import { OrderStatus, useGetOrders } from '@queries';
import { useState } from 'react';
import { ORDER_LIST_ITEMS_PER_PAGE, getInitialGridState, renderRequestStatus } from './helpers';
import { Toastify, isEmpty } from '@shared';
import { EmptyTable, Loading, TableQueryParams } from '@components';
import { CustomPagination } from 'src/components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import OrderCard from './OrderCard';

const OrderList = () => {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>(null);

  const navigate = useNavigate();

  const { search } = useLocation();

  const query = new URLSearchParams(search);

  const currentState = getInitialGridState(query);

  const { orders, setParams, isFetching, totalRecords } = useGetOrders({
    onErrorCallback(error) {
      Toastify.error(error?.message);
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const getActionParams = useCallback(
    (currentState, query: URLSearchParams) => {
      const itemsPerPage = currentState?.itemsPerPage;
      const page = currentState?.page;
      const searchText = currentState?.searchText;
      const orderStatusId = currentState?.orderStatusId;

      let orderParam = null;
      if (!isEmpty(currentState?.sortOrder?.name) && !isEmpty(currentState?.sortOrder?.direction)) {
        orderParam = `${currentState?.sortOrder?.name}:${currentState?.sortOrder?.direction}`;
      }

      const params = {
        skip: page * itemsPerPage,
        take: itemsPerPage,
        order: orderParam,
        search: searchText,
        orderStatusId: orderStatusId,
      };

      return params;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleTriggerAction = () => {
    const params = getActionParams(currentState, query);
    setParams(params);
  };

  const setStatusParams = useCallback(
    (value) => {
      setActiveStatus(value);
      if (isEmpty(value) || value === 'all') {
        query.delete('orderStatusId');
      } else {
        query.set('orderStatusId', value);
      }
      return navigate({ search: query.toString() });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query],
  );

  useEffect(() => {
    handleTriggerAction();
    setActiveStatus((query.get('orderStatusId') || null) as OrderStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const renderData =
    orders.length > 0 ? (
      <>
        <Grid container columnSpacing={4} rowSpacing={4}>
          {orders.map((order) => (
            <Grid item xs={6} key={order.id}>
              <OrderCard record={order} />
            </Grid>
          ))}
        </Grid>
        <CustomPagination
          count={totalRecords}
          page={Number(query.get(TableQueryParams._PAGE) || 0)}
          itemsPerPage={ORDER_LIST_ITEMS_PER_PAGE}
        />
      </>
    ) : (
      <EmptyTable />
    );

  if (isFetching) {
    return (
      <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
        <Loading variant="primary" />
      </Stack>
    );
  }

  return (
    <Stack py={'26px'} gap={5} width={'100%'}>
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="h2">My Orders</Typography>
        <Stack flexDirection={'row'} gap={0.5}>
          {renderRequestStatus(activeStatus, setStatusParams)}
        </Stack>
      </Stack>
      {renderData}
    </Stack>
  );
};

export default OrderList;
