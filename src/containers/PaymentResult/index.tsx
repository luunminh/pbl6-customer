import { PATHS } from '@appConfig/paths';
import { COLOR_CODE } from '@components';
import { Box, Button, Container, Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import { PaymentMethod, PaymentMethodTitle, useConfirmPayment } from '@queries';
import { formatDate, formatMoney } from '@shared';
import { useEffect, useMemo, useState } from 'react';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDataParams } from './helpers';

const PaymentResult = () => {
  const isMobileScreen = useMediaQuery('(max-width: 767px)');

  const navigate = useNavigate();

  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const [seconds, setSeconds] = useState(300);

  const dataParams = getDataParams(query);

  const isSuccessPayment = dataParams.vnp_ResponseCode === '00';

  useEffect(() => {
    if (isSuccessPayment) {
      if (seconds === 0) {
        handleClickComplete();
        return;
      }
      const timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, isSuccessPayment]);

  const formatTimer = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const { confirmPayment, isLoading: isSubmitting } = useConfirmPayment({
    orderId: dataParams.vnp_OrderInfo.split(':')[1].trim(),
  });

  const handleClickComplete = () => {
    confirmPayment({
      amount: dataParams.vnp_Amount / 100,
      bankCode: dataParams.vnp_BankCode,
      cardType: dataParams.vnp_CardType,
      orderInfo: dataParams.vnp_OrderInfo,
      transactionNumber: dataParams.vnp_TransactionNo,
    });
    navigate(PATHS.root);
  };

  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Stack
        width="100%"
        padding="24px"
        gap={3}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            backgroundColor: COLOR_CODE[isSuccessPayment ? 'SUCCESS_BG' : 'RED_200'],
            borderRadius: '50%',
            height: '100px',
            width: '100px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              color: COLOR_CODE[isSuccessPayment ? 'SUCCESS' : 'RED_500'],
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {isSuccessPayment ? <IoCheckmarkCircle size={90} /> : <IoCloseCircle size={90} />}
          </Box>
        </Box>
        <Typography
          fontSize={22}
          fontWeight={600}
          color={COLOR_CODE[isSuccessPayment ? 'SUCCESS' : 'RED_500']}
        >
          {isSuccessPayment ? 'Payment Success' : 'Payment Failed'}
        </Typography>
        <Typography fontSize={16} fontWeight={500} color={COLOR_CODE.GREY_500} textAlign="center">
          {isSuccessPayment
            ? 'Your payment has been successfully processed. Transaction details are included below.'
            : 'Your transaction has failed due to some reason. Please try again.'}
        </Typography>
        {isSuccessPayment ? (
          <>
            <Stack
              width={isMobileScreen ? '100%' : '50%'}
              gap={2}
              sx={{ padding: 3, borderRadius: '18px', backgroundColor: COLOR_CODE.GREY_50 }}
            >
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography>Transaction Number</Typography>
                <Typography textAlign="right">{dataParams.vnp_TransactionNo}</Typography>
              </Stack>
              <Divider />
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography>Payment Date</Typography>
                <Typography textAlign="right">
                  {formatDate(dataParams.vnp_PayDate, 'DD MMM YYYY, HH:mm A')}
                </Typography>
              </Stack>
              <Divider />
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography>Payment Method</Typography>
                <Typography textAlign="right">
                  {PaymentMethodTitle[PaymentMethod.BANKING]}
                </Typography>
              </Stack>
              <Divider />
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography>Bank</Typography>
                <Typography textAlign="right">{dataParams.vnp_BankCode}</Typography>
              </Stack>
              <Divider />
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography>Transaction Information</Typography>
                <Typography textAlign="right">Thanh toan don hang cua MALT Store</Typography>
              </Stack>
              <Divider />
              <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography fontSize={16} fontWeight={600}>
                  Total Amount
                </Typography>
                <Typography
                  fontSize={16}
                  fontWeight={600}
                  color={COLOR_CODE.PRIMARY_500}
                  textAlign="right"
                >
                  {formatMoney(dataParams.vnp_Amount / 100)}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              width={isMobileScreen ? '100%' : '38%'}
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Typography
                fontSize={14}
                fontWeight={500}
                color={COLOR_CODE.GREY_500}
                textAlign="center"
              >
                {`You will be automatically redirected to the homepage after ${formatTimer()}, or you can click the button below to complete your order.`}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: 18, textTransform: 'none' }}
                type="button"
                disabled={isSubmitting}
                onClick={handleClickComplete}
              >
                Complete
              </Button>
            </Stack>
          </>
        ) : (
          <Button
            variant="contained"
            color="error"
            type="button"
            onClick={() => navigate(PATHS.root)}
            sx={{ fontSize: '18px', textTransform: 'none' }}
          >
            Try Again
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default PaymentResult;
