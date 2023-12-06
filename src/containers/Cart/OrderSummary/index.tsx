import { PATHS } from '@appConfig/paths';
import { COLOR_CODE, DialogContext, DialogType } from '@components';
import { Button, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { VoucherResponse, VoucherType, useGetCart } from '@queries';
import { StoreService, formatMoney, isEmpty } from '@shared';
import { useCallback, useContext, useMemo } from 'react';
import { BiSolidDiscount } from 'react-icons/bi';
import { MdOutlineClear } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { ChooseVoucherDialog } from 'src/components';
import { VoucherContext } from 'src/context';

const OrderSummary = () => {
  const navigate = useNavigate();

  const { setDialogContent, openModal } = useContext(DialogContext);

  const { selectedVoucher, setSelectedVoucherId } = useContext(VoucherContext);

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

  const getDiscount = (voucher: VoucherResponse): number => {
    if (!isEmpty(voucher)) {
      if (voucher.type === VoucherType.FIXED) {
        return voucher.discountValue;
      } else {
        return (voucher.discountValue * subTotal) / 100;
      }
    } else {
      return 0;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const total = useMemo(() => subTotal - getDiscount(selectedVoucher), [selectedVoucher, subTotal]);

  const handleOpenVoucherDialog = useCallback((subTotal) => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Choose a voucher',
      data: <ChooseVoucherDialog subTotal={subTotal} />,
      maxWidth: 'md',
    });

    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCartContainOutOfStockProduct = cart?.some((product) => !product.inOfStock);

  return (
    <>
      <Stack
        p={3}
        gap={3}
        bgcolor={COLOR_CODE.GREY_50}
        sx={{ borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}
      >
        <Typography fontSize={22} fontWeight={600}>
          Order Summary
        </Typography>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography>Subtotal</Typography>
          <Typography>{formatMoney(subTotal || 0)}</Typography>
        </Stack>
        <Divider />
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography>Discount</Typography>
          <Typography>{formatMoney(getDiscount(selectedVoucher))}</Typography>
        </Stack>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={'10px'}>
          <Stack flexGrow={1} flexDirection="row" gap={1} alignItems="center">
            <BiSolidDiscount color={COLOR_CODE.PRIMARY} size={24} />
            <Typography
              flexGrow={1}
              sx={{
                color: !isEmpty(selectedVoucher) ? COLOR_CODE.PRIMARY_500 : COLOR_CODE.GREY_500,
              }}
            >
              {selectedVoucher?.code || 'No selected voucher'}
            </Typography>
            {!isEmpty(selectedVoucher) && (
              <IconButton
                sx={{
                  color: COLOR_CODE.GREY_500,
                  ':hover': {
                    color: COLOR_CODE.GREY_700,
                  },
                }}
                onClick={() => setSelectedVoucherId(null)}
              >
                <MdOutlineClear size={18} />
              </IconButton>
            )}
          </Stack>
          <Button
            variant="outlined"
            color="primary"
            sx={{ textTransform: 'none', backgroundColor: COLOR_CODE.WHITE }}
            disabled={isEmpty(cart)}
            onClick={() => handleOpenVoucherDialog(subTotal)}
          >
            Choose a voucher
          </Button>
        </Stack>
      </Stack>
      <Stack
        p={3}
        gap={3}
        bgcolor={COLOR_CODE.GREY_100}
        sx={{ borderBottomRightRadius: '6px', borderBottomLeftRadius: '6px' }}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography fontSize={22} fontWeight={600}>
            Total
          </Typography>
          <Typography fontSize={22} fontWeight={600} color={COLOR_CODE.PRIMARY}>
            {formatMoney(total)}
          </Typography>
        </Stack>
        <Tooltip
          title={
            isEmpty(cart) || isCartContainOutOfStockProduct
              ? 'Some products in your cart are out of stock or your cart is empty!'
              : ''
          }
          arrow
        >
          <span style={{ width: '100%' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: 18 }}
              disabled={isEmpty(cart) || isCartContainOutOfStockProduct}
              onClick={() => navigate(PATHS.payment)}
              fullWidth
            >
              Check out
            </Button>
          </span>
        </Tooltip>
      </Stack>
    </>
  );
};

export default OrderSummary;
