import { COLOR_CODE, DialogContext, DialogType, Image, Loading } from '@components';
import {
  Grid,
  Stack,
  Table,
  TableHead,
  Typography,
  TableRow,
  Chip,
  TableBody,
  TableCell,
  Button,
} from '@mui/material';
import {
  OrderStatus,
  PaymentMethodTitle,
  VoucherResponse,
  VoucherType,
  useCancelOrder,
  useGetOrderDetail,
  useGetOrders,
} from '@queries';
import {
  Toastify,
  formatDate,
  formatMoney,
  formatValueOrNull,
  getFullName,
  isEmpty,
} from '@shared';
import { renderOrderCardStatus } from '../List/OrderCard/helpers';
import { MdOutlineDateRange, MdOutlineLocalShipping } from 'react-icons/md';
import { FaRegClock } from 'react-icons/fa';
import { CiCreditCard1, CiUser } from 'react-icons/ci';
import { orderTableHeadList } from './helper';
import { StyledTableCell } from '@customerShared';
import { useMemo, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@appConfig/paths';
const OrderDetail = ({ id }: Props) => {
  const navigate = useNavigate();
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const { orderDetail, isLoading, handleInvalidateOrderDetail } = useGetOrderDetail({ id });

  const { handleInvalidateOrders } = useGetOrders({});

  const { createdAt, orderStatusId, metadata, paymentMethod, orderDetails, shipping, voucher } =
    orderDetail || {};
  const { Information } = metadata || {};

  const { cancelOrder, isLoading: isCancellingOrder } = useCancelOrder({
    onSuccess() {
      Toastify.success('Your request to cancel this order has been sent!');
      handleInvalidateOrders();
      handleInvalidateOrderDetail();
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const subTotal = useMemo(
    () => orderDetails?.reduce((total, curr) => total + Number(curr.orderPrice), 0),
    [orderDetails],
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

  const total = useMemo(
    () => subTotal - getDiscount(voucher as VoucherResponse),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [voucher, subTotal],
  );

  const handleCancelOrder = useCallback(() => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      contentText: 'Cancel Order',
      subContentText: 'Are you sure you want to cancel your order?',
      showIcon: true,
      isWarning: true,
      okText: 'Yes',
      onOk: () => {
        cancelOrder({ orderId: orderDetail.id, requestType: 'cancel' });
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderDetail]);

  if (isLoading) {
    return (
      <Stack alignItems={'center'} py={4} justifyContent={'center'} width={'100vw'}>
        <Loading size="normal" variant="primary" />
      </Stack>
    );
  }
  return (
    <Stack py={2} gap={5} width={'100%'}>
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
          <Typography variant="h2">
            Order{' '}
            <span style={{ color: COLOR_CODE.PRIMARY }}>{`#${formatDate(
              createdAt,
              'DDMMYYTHHmmss',
            )}`}</span>
          </Typography>
          {renderOrderCardStatus(orderStatusId)}
        </Stack>

        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
          <MdOutlineDateRange size={18} color={COLOR_CODE.GREY_600} />
          <Typography variant="h6" mr={2}>
            {formatDate(createdAt, 'MMMM DD, YYYY')}
          </Typography>
          <FaRegClock size={18} color={COLOR_CODE.GREY_600} />
          <Typography variant="h6">{formatDate(createdAt, 'HH:mm A')}</Typography>
        </Stack>
      </Stack>
      <Grid container columnSpacing={2}>
        <Grid item xs={6}>
          <Stack
            width={'100%'}
            height={'100%'}
            py={2}
            px={'20px'}
            borderRadius={'20px'}
            border={`1.5px solid ${COLOR_CODE.GREY_200}`}
            flexDirection={'row'}
            gap={1}
            alignItems={'start'}
          >
            <CiUser fontSize={20} color={COLOR_CODE.GREY_700} />
            <Stack gap={1}>
              <Typography fontWeight={700}>Customer Information</Typography>
              <Typography>{getFullName({ ...Information })}</Typography>
              <Typography>{formatValueOrNull(Information.phoneNumber)}</Typography>
              <Typography>{formatValueOrNull(Information.address)}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack justifyContent={'space-between'} height={'100%'} gap={2}>
            <Stack
              width={'100%'}
              py={2}
              px={'20px'}
              borderRadius={'20px'}
              border={`1.5px solid ${COLOR_CODE.GREY_200}`}
              flexDirection={'row'}
              gap={1}
            >
              <CiCreditCard1 fontSize={22} color={COLOR_CODE.GREY_700} />
              <Stack gap={1}>
                <Typography fontWeight={700}>Payment method</Typography>
                <Typography>{PaymentMethodTitle[paymentMethod]}</Typography>
              </Stack>
            </Stack>
            <Stack
              width={'100%'}
              py={2}
              px={'20px'}
              borderRadius={'20px'}
              border={`1.5px solid ${COLOR_CODE.GREY_200}`}
              flexDirection={'row'}
              gap={1}
            >
              <MdOutlineLocalShipping fontSize={22} color={COLOR_CODE.GREY_700} />
              <Stack gap={1}>
                <Typography fontWeight={700}>Shipping method</Typography>
                <Typography>Standard shipping</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Stack width={'100%'} borderRadius={'20px'} border={`1.5px solid ${COLOR_CODE.GREY_200}`}>
        <Stack flexDirection={'row'} gap={2} p={3} alignItems={'center'}>
          <Typography variant="h3" fontWeight={700}>
            Order List
          </Typography>
          <Chip
            color="success"
            label={`${orderDetails.length} ${orderDetails.length > 1 ? 'items' : 'item'}`}
          />
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              {orderTableHeadList.map((item) => (
                <StyledTableCell sx={{ whiteSpace: 'nowrap' }} key={item.label} width={item.width}>
                  {item.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map(({ product, quantity }) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                    <Image
                      src={product.image}
                      sx={{ width: '44px', height: '44px', objectFit: 'contain' }}
                    />
                    <Typography>{product?.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{formatMoney(product.price)}</TableCell>
                <TableCell>{formatMoney(product.price * quantity)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>
                <Typography variant="body2">Sub Total:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{formatMoney(subTotal)}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>
                <Typography variant="body2">Shipping Fee:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{formatMoney(shipping)}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>
                <Typography variant="body2">Discount Value:</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {formatMoney(getDiscount(voucher as VoucherResponse))}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ borderBottom: 'none' }} />
              <TableCell style={{ borderBottom: 'none' }} />
              <TableCell style={{ borderBottom: 'none' }}>
                <Typography fontWeight={700}>Grand Total</Typography>
              </TableCell>
              <TableCell style={{ borderBottom: 'none' }}>
                <Typography fontWeight={700}>{formatMoney(total)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>
      <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Button
          style={{ borderRadius: '20px' }}
          variant="outlined"
          color="primary"
          onClick={() => navigate(PATHS.order)}
        >
          Back To My Orders
        </Button>
        {orderStatusId === +OrderStatus.PENDING_CONFIRM && (
          <Button
            disabled={isCancellingOrder}
            onClick={handleCancelOrder}
            variant="contained"
            color="error"
            style={{ borderRadius: '20px' }}
          >
            Cancel Order
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

type Props = {
  id: string;
};

export default OrderDetail;
