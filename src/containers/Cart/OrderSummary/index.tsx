import { COLOR_CODE } from '@components';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { formatMoney } from '@shared';
import { BiSolidDiscount } from 'react-icons/bi';
const OrderSummary = () => {
  return (
    <>
      <Stack bgcolor={COLOR_CODE.GREY_50} p={3} gap={3} borderRadius={2}>
        <Typography fontSize={22} fontWeight={700}>
          Order Summary
        </Typography>
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Typography>Subtotal</Typography>
          <Typography>{formatMoney(150000)}</Typography>
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
        sx={{ borderBottomRightRadius: 2, borderBottomLeftRadius: 2 }}
      >
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
          <Typography fontSize={22} fontWeight={700}>
            Total
          </Typography>
          <Typography fontSize={22} fontWeight={700} color={COLOR_CODE.PRIMARY}>
            {formatMoney(150000)}
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
