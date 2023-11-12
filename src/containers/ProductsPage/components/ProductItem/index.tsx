import React, { useCallback, useContext } from 'react';
import { Stack, Card, CardMedia, Typography, Button, Tooltip } from '@mui/material';
import { COLOR_CODE, DialogType } from '@components';
import { BsCartPlus } from 'react-icons/bs';
import { ProductResponse } from '@queries/Product';
import { IMAGES } from '@appConfig/images';
import { StoreService, Toastify, formatMoney, isEmpty } from '@shared';
import { useSelector } from 'react-redux';
import { IRootState } from '@redux/store';
import { DialogContext } from '@components';
import { CartWarning, SelectStoreModal } from 'src/containers/StartupContainers';
import { useAddProductToCart, useGetCart } from '@queries/Cart';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@appConfig/paths';

const ProductItem = ({ product }: Props) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);
  const navigate = useNavigate();

  const productAmount = product?.productStore?.amount || product.amount;

  const { cart, handleInvalidateCart } = useGetCart({ storeId: StoreService.getValue() });

  const isProductExistInCart =
    cart.find(({ product: cartProduct }) => cartProduct.id === product.id)?.quantity + 1 >
    productAmount;

  const { addProduct, isLoading } = useAddProductToCart({
    onSuccess() {
      Toastify.success('Added successfully to your cart!');
      handleInvalidateCart();
    },
    onError(error) {
      Toastify.success(error.message);
    },
  });

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      setDialogContent({
        type: DialogType.CONTENT_DIALOG,
        title: 'Warning',
        data: <CartWarning />,
        maxWidth: 'xs',
      });
      return openModal();
    }

    if (isEmpty(StoreService.getValue())) {
      return handleSelectStore();
    }

    if (isProductExistInCart) {
      setDialogContent({
        type: DialogType.YESNO_DIALOG,
        maxWidth: 'xs',
        contentText: '',
        subContentText:
          'This product is already in your cart. You cannot add more quantity to the product as it would exceed the available stock.',
        showIcon: true,
        isWarning: true,
        okText: 'Got it',
        onOk: () => {
          closeModal();
        },
      });
      openModal();
    } else addProduct({ productId: product.id, quantity: '1' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isProductExistInCart, product]);

  const handleSelectStore = useCallback(() => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Choose a store location',
      data: <SelectStoreModal />,
      maxWidth: 'md',
    });

    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      sx={{ width: '300px', height: '380px', padding: '20px' }}
      onClick={() => navigate(`${PATHS.products}/${product.id}`)}
    >
      <Stack justifyContent="space-between" alignItems="center" gap={4} flexShrink={1}>
        <CardMedia
          sx={{ height: '150px', width: '150px' }}
          image={product.image || IMAGES.noImage}
        />
        <Stack spacing={1} width={'100%'}>
          <Typography variant="h4" fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
            {formatMoney(product.price)}
          </Typography>
          <Tooltip title={product.name} arrow>
            <Typography
              variant="h5"
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>
          <Typography variant="h6">Available: {productAmount} items</Typography>
        </Stack>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<BsCartPlus />}
          disabled={productAmount === 0 || isLoading}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
        >
          Add to cart
        </Button>
      </Stack>
    </Card>
  );
};

type Props = {
  product: ProductResponse;
};

export default ProductItem;
