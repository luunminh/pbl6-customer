import { COLOR_CODE } from '@components';
import { TableCell, styled, tableCellClasses } from '@mui/material';
import { StoreResponse } from '@queries/Store';
import { StoreService } from '@shared';

const getSelectedStoreLocation = (stores: StoreResponse[], storeId: string = null) => {
  const selectedStoreId = storeId || StoreService.getValue();
  return stores.find((store) => store.id === selectedStoreId)?.address;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: COLOR_CODE.GREY_50,
    color: COLOR_CODE.GREY_800,
    whiteSpace: 'nowrap',
    fontWeight: '700',
    fontSize: 16,
  },
}));

export { getSelectedStoreLocation, StyledTableCell };
