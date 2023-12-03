export enum PaymentMethod {
  COD = 'COD',
  MOMO = 'MOMO',
}

export enum OrderFormFields {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PHONE_NUMBER = 'phoneNumber',
  SHIPPING_ADDRESS = 'shippingAddress',
  PAYMENT_METHOD = 'paymentMethod',
}

export type OrderFormFieldsType = {
  [OrderFormFields.FIRST_NAME]: string;
  [OrderFormFields.LAST_NAME]: string;
  [OrderFormFields.PHONE_NUMBER]: string;
  [OrderFormFields.SHIPPING_ADDRESS]: string;
  [OrderFormFields.PAYMENT_METHOD]: string;
};
