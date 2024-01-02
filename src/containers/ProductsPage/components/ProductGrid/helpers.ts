import { productGrid } from './type';

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
    searchText: query?.get('search')?.trim(),
    sortOrder,
    itemsPerPage: query?.has('itemsPerPage')
      ? Number(query.get('itemsPerPage'))
      : productGrid.ITEMS_PER_PAGE,
    page: query?.has('page') ? Number(query.get('page')) : 0,
    categories: query?.has('categories') ? query.getAll('categories') : [],
  };
};

export const sortPriceOptions = [
  {
    label: 'Ascending price',
    value: 'price:asc',
  },
  {
    label: 'Descending price',
    value: 'price:desc',
  },
];
