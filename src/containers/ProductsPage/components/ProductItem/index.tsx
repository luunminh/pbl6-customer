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

const ProductItem = ({ product }: Props) => {
  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);
  const { setDialogContent, openModal } = useContext(DialogContext);

  const productAmount = product?.productStore?.amount || product.amount;

  const { handleInvalidateCart } = useGetCart({ storeId: StoreService.getValue() });

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
      handleSelectStore();
    } else {
      addProduct({ productId: product.id, quantity: '1' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

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
    <Card sx={{ width: '300px', height: '380px', padding: '20px' }}>
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
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>
          <Typography variant="h6">Available: {productAmount} items</Typography>
        </Stack>
        <Button
          variant="contained"
          disabled={productAmount === 0 || isLoading}
          color="primary"
          fullWidth
          startIcon={<BsCartPlus />}
          onClick={handleAddToCart}
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
