import {
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { QuantityOptions, cartTableHeadList } from './helpers';
import { StyledTableCell } from '@customerShared';
import { COLOR_CODE, DialogContext, DialogType, EmptyTable, Image } from '@components';
import {
  useGetCart,
  useDecreaseProductCart,
  useAddProductToCart,
  useDeleteProductCart,
  Cart,
  useDeleteCart,
} from '@queries';
import { StoreService, Toastify, formatMoney, isEmpty } from '@shared';
import LoadingContainer from '@components/LoadingContainer';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdOutlineRemove, MdOutlineRemoveCircleOutline } from 'react-icons/md';
import { useCallback, useContext } from 'react';
import { BiTrash } from 'react-icons/bi';
const CartList = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const {
    cart,
    isLoading: isFetchingCart,
    handleInvalidateCart,
  } = useGetCart({
    storeId: StoreService.getValue(),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const { addProduct: increaseProduct, isLoading: isUpdateProductQuantity } = useAddProductToCart({
    onSuccess() {
      handleInvalidateCart();
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const { decreaseProduct, isLoading: isDecreaseProductQuantity } = useDecreaseProductCart({
    onSuccess() {
      handleInvalidateCart();
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const { deleteProductCart, isLoading: isDeletingProductCart } = useDeleteProductCart({
    onSuccess() {
      Toastify.success('Deleted successfully!');
      handleInvalidateCart();
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const { deleteCart, isLoading: isRemovingCart } = useDeleteCart({
    onSuccess() {
      Toastify.success('Deleted successfully!');
      handleInvalidateCart();
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const handleChangeProductQuantity = (
    productId: string,
    quantity: string,
    type: QuantityOptions,
  ) => {
    if (type === QuantityOptions.INCREASE) {
      increaseProduct({ quantity, productId });
    }

    if (type === QuantityOptions.DECREASE) {
      decreaseProduct({ quantity, productId });
    }
  };

  const handleDeleteCart = useCallback((store = null) => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Remove all product',
      subContentText: 'Are you sure you want to remove all current products?',
      showIcon: true,
      isWarning: true,
      okText: 'Yes',
      onOk: () => {
        deleteCart({});
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTableRow = useCallback((item: Cart) => {
    const { id, product, productId, quantity, price, inOfStock, image } = item || {};

    return inOfStock ? (
      <TableRow key={id}>
        <TableCell>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Image src={image} sx={{ width: '100px', height: '80px' }} />
            <Typography>{product?.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{formatMoney(price)}</TableCell>
        <TableCell>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <IconButton
              onClick={() => {
                if (quantity === 1) {
                  deleteProductCart({ productId });
                } else handleChangeProductQuantity(productId, '1', QuantityOptions.DECREASE);
              }}
            >
              <MdOutlineRemoveCircleOutline size={25} />
            </IconButton>
            <Typography>{item?.quantity || 0}</Typography>
            <IconButton
              onClick={() =>
                handleChangeProductQuantity(item.productId, '1', QuantityOptions.INCREASE)
              }
            >
              <IoAddCircleOutline size={25} />
            </IconButton>
          </Stack>
        </TableCell>
        <TableCell>{formatMoney(item?.product?.price * item?.quantity || 0)}</TableCell>
        <TableCell>
          <Tooltip title="Remove" arrow>
            <IconButton onClick={() => deleteProductCart({ productId: item.productId })}>
              <MdOutlineRemove size={30} color={COLOR_CODE.GREY_500} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    ) : (
      <TableRow key={id}>
        <TableCell style={{ opacity: 0.5 }}>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Image src={image} sx={{ width: '100px', height: '80px' }} />
            <Typography>{product?.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell style={{ opacity: 0.5 }} />
        <TableCell style={{ opacity: 0.5 }} />
        <TableCell>
          <Typography color={COLOR_CODE.DANGER}>Out of Stock</Typography>
        </TableCell>
        <TableCell>
          <Tooltip title="Remove" arrow>
            <IconButton onClick={() => deleteProductCart({ productId: item.productId })}>
              <MdOutlineRemove size={30} color={COLOR_CODE.GREY_500} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading =
    isFetchingCart ||
    isRemovingCart ||
    isUpdateProductQuantity ||
    isDecreaseProductQuantity ||
    isDeletingProductCart;

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <Stack pb={5} gap={2}>
      <TableContainer>
        <Table>
          <TableHead>
            {cartTableHeadList.map((item) => (
              <StyledTableCell sx={{ whiteSpace: 'nowrap' }} key={item.label} width={item.width}>
                {item.label}
              </StyledTableCell>
            ))}
          </TableHead>
          <TableBody>
            {isEmpty(cart) ? (
              <TableRow>
                <TableCell colSpan={cartTableHeadList.length} align="center">
                  <EmptyTable />
                </TableCell>
              </TableRow>
            ) : (
              cart.map((item, idx) => renderTableRow(item))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography color={COLOR_CODE.GREY_600}>{`Total: ${cart?.length} ${
          cart?.length <= 1 ? 'item' : 'items'
        }`}</Typography>
        <Button
          onClick={handleDeleteCart}
          startIcon={<BiTrash size={20} color={COLOR_CODE.GREY_600} />}
          style={{ width: '210px', color: COLOR_CODE.GREY_600, fontWeight: 400, border: 'none' }}
          variant="outlined"
        >
          Remove All
        </Button>
      </Stack>
    </Stack>
  );
};

export default CartList;
