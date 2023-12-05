import { ERROR_MESSAGES, phoneRegExp } from '@shared';
import * as yup from 'yup';
import { OrderFormFieldsType } from './type';
import { PaymentMethod } from '@queries';

export const initialOrderFormValues: OrderFormFieldsType = {
  firstName: null,
  lastName: null,
  phoneNumber: null,
  shippingAddress: null,
  paymentMethod: PaymentMethod.COD,
};

export const orderFormValidationSchema = yup.object({
  firstName: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  lastName: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, ERROR_MESSAGES.INVALID_DATA)
    .min(10, 'Phone number must have a minimum of 10 digits')
    .max(11, 'Phone number have a maximum of 11 digits')
    .nullable()
    .required(ERROR_MESSAGES.FIELD_REQUIRED),
  shippingAddress: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
  paymentMethod: yup.string().nullable().required(ERROR_MESSAGES.FIELD_REQUIRED),
});
