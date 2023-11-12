import { COLOR_CODE } from '@components';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { useGetCart } from '@queries';
import { StoreService, formatMoney } from '@shared';
import { BiSolidDiscount } from 'react-icons/bi';
import { useMemo } from 'react';

const OrderSummary = () => {
  const { cart } = useGetCart({
    storeId: StoreService.getValue(),
  });

  const subTotal = useMemo(
    () =>
      cart
        ?.filter((product) => product.inOfStock)
        .reduce((total, curProduct) => total + curProduct.price, 0),
    [cart],
  );

  return (
    <>
      <Stack
        p={3}
        gap={3}
        bgcolor={COLOR_CODE.GREY_50}
        sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
      >
        <Typography fontSize={22} fontWeight={700}>
          Order Summary
        </Typography>
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Typography>Subtotal</Typography>
          <Typography>{formatMoney(subTotal)}</Typography>
        </Stack>
        <Divider />
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Typography>Shipping</Typography>
          <Typography>{formatMoney(5000)}</Typography>
        </Stack>
        <Divider />
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Typography>Discount</Typography>
          <Typography>{formatMoney(0)}</Typography>
        </Stack>
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Stack
            flexDirection={'row'}
            justifyContent={'space-between'}
            gap={2}
            alignItems={'center'}
          >
            <BiSolidDiscount color={COLOR_CODE.PRIMARY} size={25} />
            <Typography>Voucher Code</Typography>
          </Stack>
          <Button variant="outlined" color="primary" style={{ backgroundColor: COLOR_CODE.WHITE }}>
            Choose a voucher
          </Button>
        </Stack>
      </Stack>
      <Stack
        p={3}
        gap={3}
        bgcolor={COLOR_CODE.GREY_100}
        sx={{ borderBottomRightRadius: 12, borderBottomLeftRadius: 12 }}
      >
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Typography fontSize={22} fontWeight={700}>
            Total
          </Typography>
          <Typography fontSize={22} fontWeight={700} color={COLOR_CODE.PRIMARY}>
            {formatMoney(subTotal + 5000)}
          </Typography>
        </Stack>
        <Button color="primary" variant="contained" sx={{ padding: 2 }}>
          CHECK OUT
        </Button>
      </Stack>
    </>
  );
};

export default OrderSummary;
