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
import { COLOR_CODE, DialogContext, DialogType, EmptyTable, Image, Loading } from '@components';
import {
  useGetCart,
  useDecreaseProductCart,
  useAddProductToCart,
  useDeleteProductCart,
  Cart,
  useDeleteCart,
} from '@queries';
import { StoreService, Toastify, formatMoney, isEmpty } from '@shared';
import { IoAddCircle, IoRemoveCircleOutline } from 'react-icons/io5';
import { useCallback, useContext, useMemo } from 'react';
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

  const cartTotalItems = useMemo(
    () =>
      cart
        ?.filter((product) => product.inOfStock)
        .reduce((total, curProduct) => total + curProduct.quantity, 0),
    [cart],
  );

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
      subContentText: 'Are you sure you want to remove all current products in your cart?',
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
    const {
      id,
      product,
      productId,
      quantity,
      price: totalPrice,
      inOfStock,
      image,
      productStore,
    } = item || {};

    return inOfStock ? (
      <TableRow key={id}>
        <TableCell>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Image src={image} sx={{ width: '100px', height: '80px' }} />
            <Typography>{product?.name}</Typography>
          </Stack>
        </TableCell>
        <TableCell>{formatMoney(product.price)}</TableCell>
        <TableCell>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Tooltip
              title={`${quantity === 1 ? 'Remove this product from your cart' : 'Decrease'}`}
              arrow
            >
              <IconButton
                onClick={() => {
                  if (quantity === 1) {
                    deleteProductCart({ productId });
                  } else handleChangeProductQuantity(productId, '1', QuantityOptions.DECREASE);
                }}
              >
                <IoRemoveCircleOutline size={25} />
              </IconButton>
            </Tooltip>

            <Typography>{quantity || 0}</Typography>
            <Tooltip
              title={`${
                quantity === productStore.amount ? 'Maximum available product quantity' : 'Increase'
              }`}
              arrow
            >
              <span>
                <IconButton
                  disabled={quantity === productStore.amount}
                  onClick={() =>
                    handleChangeProductQuantity(item.productId, '1', QuantityOptions.INCREASE)
                  }
                >
                  <IoAddCircle
                    size={25}
                    color={
                      quantity === productStore.amount
                        ? COLOR_CODE.GREY_200
                        : COLOR_CODE.PRIMARY_500
                    }
                  />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </TableCell>
        <TableCell>{formatMoney(totalPrice || 0)}</TableCell>
        <TableCell>
          <Tooltip title="Remove" arrow>
            <IconButton onClick={() => deleteProductCart({ productId: item.productId })}>
              <BiTrash size={20} color={COLOR_CODE.GREY_600} />
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
          <Typography color={COLOR_CODE.DANGER}>Out of stock</Typography>
        </TableCell>
        <TableCell>
          <Tooltip title="Remove" arrow>
            <IconButton onClick={() => deleteProductCart({ productId: item.productId })}>
              <BiTrash size={20} color={COLOR_CODE.DANGER} />
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
    return (
      <Stack alignItems={'center'} mt={6}>
        <Loading size="normal" variant="primary" />;
      </Stack>
    );
  }

  return (
    <Stack pb={5} gap={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {cartTableHeadList.map((item) => (
                <StyledTableCell sx={{ whiteSpace: 'nowrap' }} key={item.label} width={item.width}>
                  {item.label}
                </StyledTableCell>
              ))}
            </TableRow>
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
        <Typography color={COLOR_CODE.GREY_600}>{`Total: ${cartTotalItems || 0} ${
          isEmpty(cartTotalItems) || cartTotalItems <= 1 ? 'item' : 'items'
        }`}</Typography>
        <Button
          startIcon={<BiTrash size={18} />}
          sx={{
            textTransform: 'none',
            color: COLOR_CODE.GREY_600,
            fontWeight: 500,
            fontSize: 16,
            paddingX: 1,
          }}
          onClick={handleDeleteCart}
        >
          Remove all
        </Button>
      </Stack>
    </Stack>
  );
};

export default CartList;
