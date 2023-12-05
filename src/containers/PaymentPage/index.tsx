import { SHIPPING_FEE } from '@appConfig/constants';
import { PATHS } from '@appConfig/paths';
import { COLOR_CODE, DialogContext, DialogType, MuiInput, MuiTextField } from '@components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  FormLabel,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import {
  Cart,
  ProductStoresType,
  useCreateOrder,
  useDeleteCart,
  useGetCart,
  useGetProfile,
} from '@queries';
import { getDatabase, ref, set } from 'firebase/database';
import { firebaseApp } from 'src/firebase';
import { getRandomId } from '@shared';
import { StoreService, Toastify, formatMoney, getErrorMessage, isEmpty } from '@shared';
import { useFormik } from 'formik';
import { useCallback, useContext, useMemo } from 'react';
import { BsArrowLeft, BsCashCoin } from 'react-icons/bs';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from 'src/components';
import { VoucherContext } from 'src/context';
import { OrderSummary } from './components';
import { initialOrderFormValues, orderFormValidationSchema } from './helpers';
import { OrderFormFields, OrderFormFieldsType } from './type';
import { PaymentMethod } from '@queries';

const PaymentPage = () => {
  const navigate = useNavigate();

  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);

  const { selectedVoucherId, setSelectedVoucherId } = useContext(VoucherContext);

  const { profile } = useGetProfile({
    onErrorCallback: (error) => Toastify.error(error?.message),
  });

  const { cart, handleInvalidateCart } = useGetCart({
    storeId: StoreService.getValue(),
  });

  const isCartContainOutOfStockProduct = cart.some((product) => !product.inOfStock);

  const { deleteCart } = useDeleteCart({
    onSuccess: () => {
      handleInvalidateCart();
    },
    onError: (error) => {
      Toastify.error(error?.message);
    },
  });

  const getProductStore = (itemInCart: Cart): ProductStoresType => {
    return {
      productStoreId: itemInCart?.productStore?.id,
      quantity: itemInCart?.quantity,
    };
  };

  const getInitialCategoryFormValues = useMemo((): OrderFormFieldsType => {
    if (!isEmpty(profile)) {
      return {
        ...initialOrderFormValues,
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phone,
        shippingAddress: profile.address,
      };
    }
    return { ...initialOrderFormValues };
  }, [profile]);

  const { createOrder, isLoading: isCreatingOrder } = useCreateOrder({
    onSuccess: () => {
      openSuccessDialog();
      deleteCart({});
      setSelectedVoucherId(null);
      handleSendRequestMsg();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSendRequestMsg = () => {
    const db = ref(getDatabase(firebaseApp), '/REQUEST_ORDER');
    set(db, getRandomId()).then(() => console.log('REQUEST_ORDER'));
  };

  const openSuccessDialog = useCallback(() => {
    setDialogContent({
      type: DialogType.YESNO_DIALOG,
      maxWidth: 'xs',
      hideCloseButton: true,
      contentText: 'Thank you for your order',
      subContentText: 'We have received your order request. We will process your request soon!',
      showIcon: true,
      icon: <IoCheckmarkCircle />,
      okText: 'Go to My Orders',
      cancelText: 'Back to Home',
      onOk: () => {
        // change to path my orders later
        navigate(PATHS.order);
        closeModal();
      },
      onCancel: () => {
        navigate(PATHS.root);
        closeModal();
      },
    });
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlaceOrder = (formValues: OrderFormFieldsType) => {
    if (!isCartContainOutOfStockProduct && !isEmpty(cart)) {
      const { firstName, lastName, shippingAddress, phoneNumber, paymentMethod } = formValues;
      createOrder({
        contact: {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          address: shippingAddress,
        },
        productStores: cart?.flatMap((itemInCart) => getProductStore(itemInCart)),
        voucherId: selectedVoucherId,
        shippingFee: SHIPPING_FEE,
        paymentMethod: paymentMethod,
      });
    }
  };

  const { values, errors, touched, getFieldProps, setFieldValue, handleSubmit } =
    useFormik<OrderFormFieldsType>({
      initialValues: getInitialCategoryFormValues,
      onSubmit: () => {
        handlePlaceOrder(values);
      },
      validationSchema: orderFormValidationSchema,
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const renderCustomerInfo = () => {
    return (
      <Accordion defaultExpanded sx={{ width: '100%', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ bgcolor: COLOR_CODE.GREY_50, borderRadius: '6px' }}
        >
          <Typography variant="h5" color={COLOR_CODE.GREY_700}>
            Customer Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 2 }}>
          <Stack justifyContent="center" gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <MuiTextField
                    required
                    fullWidth
                    size="small"
                    label="First name"
                    placeholder="First name"
                    disabled={isCreatingOrder}
                    errorMessage={getFieldErrorMessage(OrderFormFields.FIRST_NAME)}
                    {...getFieldProps(OrderFormFields.FIRST_NAME)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiTextField
                    required
                    fullWidth
                    size="small"
                    label="Last name"
                    placeholder="Last name"
                    disabled={isCreatingOrder}
                    errorMessage={getFieldErrorMessage(OrderFormFields.LAST_NAME)}
                    {...getFieldProps(OrderFormFields.LAST_NAME)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MuiTextField
                    required
                    fullWidth
                    size="small"
                    label="Phone number"
                    placeholder="Phone number"
                    disabled={isCreatingOrder}
                    errorMessage={getFieldErrorMessage(OrderFormFields.PHONE_NUMBER)}
                    {...getFieldProps(OrderFormFields.PHONE_NUMBER)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MuiTextField
                    required
                    fullWidth
                    size="small"
                    label="Shipping address"
                    placeholder="Shipping address"
                    errorMessage={getFieldErrorMessage(OrderFormFields.SHIPPING_ADDRESS)}
                    {...getFieldProps(OrderFormFields.SHIPPING_ADDRESS)}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderShippingOption = () => {
    return (
      <Accordion defaultExpanded sx={{ width: '100%', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ bgcolor: COLOR_CODE.GREY_50, borderRadius: '6px' }}
        >
          <Typography variant="h5" color={COLOR_CODE.GREY_700}>
            Shipping Option
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 2 }}>
          <Stack justifyContent="center" gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                  <MuiInput
                    required
                    fullWidth
                    size="small"
                    label="Shipping method"
                    placeholder="Shipping method"
                    value="Standard shipping (1 - 3 days)"
                    disabled={isCreatingOrder}
                    readOnly
                    InputProps={{
                      startAdornment: (
                        <MdOutlineRadioButtonChecked
                          size={20}
                          style={{ color: COLOR_CODE.PRIMARY_500, marginRight: '8px' }}
                        />
                      ),
                      endAdornment: formatMoney(SHIPPING_FEE),
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderPaymentOption = () => {
    return (
      <Accordion defaultExpanded sx={{ width: '100%', boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ bgcolor: COLOR_CODE.GREY_50, borderRadius: '6px' }}
        >
          <Typography variant="h5" color={COLOR_CODE.GREY_700}>
            Payment Option
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 2 }}>
          <Stack justifyContent="center" gap={1}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                  <FormLabel id="label-payment-method">
                    Payment method <span className="text-red-500 font-bold text-md">*</span>
                  </FormLabel>
                </Grid>
                <Grid item xs={6}>
                  <Stack
                    width="100%"
                    padding={3}
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    sx={{
                      border: `1.5px solid ${
                        values?.paymentMethod === PaymentMethod.COD
                          ? COLOR_CODE.PRIMARY_500
                          : COLOR_CODE.GREY_300
                      }`,
                      borderRadius: '20px',
                    }}
                    component="button"
                    disabled={isCreatingOrder}
                    onClick={() => {
                      setFieldValue(OrderFormFields.PAYMENT_METHOD, PaymentMethod.COD);
                    }}
                  >
                    <BsCashCoin
                      size={40}
                      color={
                        values?.paymentMethod === PaymentMethod.COD
                          ? COLOR_CODE.PRIMARY_500
                          : COLOR_CODE.GREY_500
                      }
                    />
                    <Typography
                      fontSize={14}
                      fontWeight={values?.paymentMethod === PaymentMethod.COD ? 600 : 500}
                      color={
                        values?.paymentMethod === PaymentMethod.COD
                          ? COLOR_CODE.PRIMARY_500
                          : COLOR_CODE.GREY_500
                      }
                    >
                      Cash On Delivery
                    </Typography>
                  </Stack>
                </Grid>
                {/* todo: momo wallet */}
                {/* <Grid item xs={6}>
                  <Stack
                    width="100%"
                    padding={3}
                    justifyContent="center"
                    alignItems="center"
                    gap={2}
                    sx={{
                      border: `1.5px solid ${
                        values?.paymentMethod === PaymentMethod.MOMO
                          ? COLOR_CODE.PRIMARY_500
                          : COLOR_CODE.GREY_300
                      }`,
                      borderRadius: '20px',
                    }}
                    component="button"
                    disabled={isCreatingOrder}
                    onClick={() => {
                      setFieldValue(OrderFormFields.PAYMENT_METHOD, PaymentMethod.MOMO);
                    }}
                  >
                    <Image src={IMAGES.momoIcon} sx={{ width: '40px', height: '40px' }} />
                    <Typography
                      fontSize={14}
                      fontWeight={values?.paymentMethod === PaymentMethod.MOMO ? 600 : 500}
                      color={
                        values?.paymentMethod === PaymentMethod.MOMO
                          ? COLOR_CODE.PRIMARY_500
                          : COLOR_CODE.GREY_500
                      }
                    >
                      MoMo E-Wallet
                    </Typography>
                  </Stack>
                </Grid> */}
              </Grid>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <>
      <Breadcrumbs />
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <form onSubmit={handleSubmit}>
          <Stack width="100%" alignItems="flex-start" pt={5} paddingX={3} gap={3}>
            <Button
              startIcon={<BsArrowLeft size={14} />}
              sx={{
                textTransform: 'none',
                color: COLOR_CODE.GREY_600,
                fontWeight: 500,
                fontSize: 16,
                paddingX: 1,
              }}
              onClick={() => navigate(PATHS.cart)}
            >
              Back to Cart
            </Button>
            <Stack width="100%" direction="row" gap={3}>
              <Stack width="70%" alignItems="flex-start" gap={2}>
                {renderCustomerInfo()}
                {renderShippingOption()}
                {renderPaymentOption()}
              </Stack>
              <OrderSummary isDisabled={isEmpty(cart) || isCartContainOutOfStockProduct} />
            </Stack>
          </Stack>
        </form>
      </Container>
    </>
  );
};

export default PaymentPage;
