import { COLOR_CODE } from '@components';
import { Button } from '@mui/material';
import { OrderStatus, OrderStatusTitle } from '@queries';
import { Callback, isEmpty } from '@shared';

export const renderOrderStatusOptions = (activeStatus, setActiveStatus: Callback) => {
  const statuses = Object.values(OrderStatus);
  return ['all', ...statuses].map((status, idx) => {
    return (
      <Button
        variant="text"
        key={`btn__order-status--${idx}`}
        style={{
          fontWeight: 400,
          color:
            status === activeStatus || (isEmpty(activeStatus) && status === 'all')
              ? COLOR_CODE.PRIMARY
              : COLOR_CODE.BLACK,
        }}
        onClick={() => setActiveStatus(status)}
      >
        {OrderStatusTitle[status]}
      </Button>
    );
  });
};

export const getInitialGridState = (query: URLSearchParams) => {
  let sortOrder;
  if (query?.get('order')?.includes(':')) {
    const sortOrderSplit = query?.get('order')?.split(':');
    if (sortOrderSplit.length === 2 && ['asc', 'desc'].includes(sortOrderSplit[1])) {
      sortOrder = {
        name: sortOrderSplit[0],
        direction: sortOrderSplit[1],
      };
    }
  }

  return {
    sortOrder,
    itemsPerPage: query?.has('itemsPerPage')
      ? Number(query.get('itemsPerPage'))
      : ORDER_LIST_ITEMS_PER_PAGE,
    page: query?.has('page') ? Number(query.get('page')) : 0,
    orderStatusId: query?.get('orderStatusId'),
  };
};

export const ORDER_LIST_ITEMS_PER_PAGE = 4;
