import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, DialogContext, DialogType, Image, Loading } from '@components';
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAddProductToCart, useGetCart, useGetProductDetail } from '@queries';
import { StoreService, Toastify, formatMoney, isEmpty } from '@shared';
import { BsCart2 } from 'react-icons/bs';
import { useCallback, useContext, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoRemoveOutline } from 'react-icons/io5';
import { IRootState } from '@redux/store';
import { useSelector } from 'react-redux';
import { SelectStoreModal } from 'src/containers/StartupContainers';
import { PATHS } from '@appConfig/paths';
import { useNavigate } from 'react-router-dom';

const ProductDetail = ({ id }: Props) => {
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  const { setDialogContent, openModal, closeModal } = useContext(DialogContext);

  const isAuthenticated = useSelector((state: IRootState) => state.auth.isAuthenticated);

  const { addProduct, isLoading: isAddingToCart } = useAddProductToCart({
    onSuccess() {
      Toastify.success('Added successfully to your cart!');
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const { cart } = useGetCart({
    storeId: StoreService.getValue(),
  });

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

  const { productDetail, isLoading: isFetchingProduct } = useGetProductDetail({
    id,
    storeId: StoreService.getValue(),
  });

  const { name, image, amount, description, price } = productDetail || {};

  const isProductExistInCart =
    cart?.find(({ product }) => product.id === id)?.quantity + quantity > amount;

  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      setDialogContent({
        type: DialogType.YESNO_DIALOG,
        maxWidth: 'xs',
        contentText: 'Login Required',
        subContentText: 'You have to login to access this feature!',
        showIcon: true,
        okText: 'Login now',
        onOk: () => {
          navigate(PATHS.signIn);
          closeModal();
        },
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
          'This product is already in your cart. You cannot add more because it exceeds the available stock.',
        showIcon: true,
        isWarning: true,
        okText: 'Got it',
        onOk: () => {
          closeModal();
        },
      });
      openModal();
    } else addProduct({ productId: id, quantity: quantity.toString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, quantity, id, isProductExistInCart]);

  const isDisabled = amount === 0 || quantity > amount;

  if (isFetchingProduct) {
    return (
      <Stack alignItems={'center'} py={4} justifyContent={'center'} width={'100vw'}>
        <Loading size="normal" variant="primary" />
      </Stack>
    );
  }

  return (
    <Container>
      <Grid container pt={'100px'} pb={'50px'} spacing={10}>
        <Grid item xs={6}>
          <Image src={image || IMAGES.noImage} sx={{ width: '560px' }} />
        </Grid>
        <Grid item xs={6}>
          <Stack justifyItems={'center'} gap={3}>
            <Stack gap={'28px'}>
              <Stack spacing={2}>
                <Typography fontSize={38} color={COLOR_CODE.GREY_800} fontWeight={700}>
                  {name}
                </Typography>
                {isDisabled && (
                  <Typography color={COLOR_CODE.RED_500}>
                    This product is currently out of stock at the selected store, or the quantity
                    you want to add to cart exceeds the available stock.
                  </Typography>
                )}
              </Stack>
              <Stack gap={1}>
                <Typography fontSize={38} color={COLOR_CODE.PRIMARY} fontWeight={700}>
                  {formatMoney(price)}
                </Typography>
                <Typography>
                  Available: <strong>{`${amount} ${amount <= 1 ? 'item' : 'items'}`}</strong>
                </Typography>
              </Stack>
            </Stack>
            <Divider variant="fullWidth" />
            <Stack flexDirection={'row'} alignItems={'center'} gap={2.5} py={3}>
              <Tooltip title={'Decrease'} arrow>
                <IconButton
                  disabled={quantity === 1}
                  style={{
                    backgroundColor: quantity === 1 ? COLOR_CODE.GREY_200 : COLOR_CODE.GREY_100,
                  }}
                  onClick={() => setQuantity((prev) => prev - 1)}
                >
                  <IoRemoveOutline size={28} color={COLOR_CODE.GREY_400} />
                </IconButton>
              </Tooltip>
              <Typography variant="h2">{quantity}</Typography>
              <Tooltip title={quantity === amount ? 'Maximum product quantity' : 'Increase'} arrow>
                <span>
                  <IconButton
                    disabled={quantity === amount}
                    style={{
                      backgroundColor:
                        quantity !== amount ? COLOR_CODE.PRIMARY : COLOR_CODE.GREY_200,
                    }}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <AiOutlinePlus size={28} color={COLOR_CODE.WHITE} />
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={handleAddToCart}
              disabled={isDisabled || isAddingToCart}
              startIcon={<BsCart2 size={18} />}
              style={{ padding: '18px', fontSize: 18, fontWeight: 500 }}
            >
              Add to Cart
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack gap={3}>
        <Typography variant="h2" color={COLOR_CODE.PRIMARY}>
          Description
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Stack>
    </Container>
  );
};

type Props = {
  id: string;
};

export default ProductDetail;
