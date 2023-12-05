export enum OrderStatus {
  PENDING_CONFIRM = '1',
  CONFIRMED = '2',
  CANCELED = '6',
  // COMPLETED = 3,
  // PENDING_PAYMENT = 4,
  // PAYMENT_CONFIRMED = 5,
}

export enum PaymentMethod {
  COD = 'COD',
  MOMO = 'MOMO',
}

export const PaymentMethodTitle = {
  [PaymentMethod.COD]: 'Cash on Delivery (COD)',
  [PaymentMethod.MOMO]: 'Momo',
};

export const RequestStatusTitle = {
  all: 'All',

  [OrderStatus.PENDING_CONFIRM]: 'Pending',
  // [OrderStatus.PENDING_PAYMENT]: 'Pending',

  [OrderStatus.CONFIRMED]: 'Confirmed',
  // [OrderStatus.COMPLETED]: 'Confirmed',
  // [OrderStatus.PAYMENT_CONFIRMED]: 'Confirmed',

  [OrderStatus.CANCELED]: 'Cancelled',
};

export type ProductStoresType = {
  productStoreId: string;
  quantity: number;
};

export type ContactType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
};

export interface CreateOrderPayload {
  productStores: ProductStoresType[];
  shippingFee: number;
  voucherId: string;
  contact: ContactType;
  paymentMethod: string;
}

// ******************** ORDER LIST ********************

export type GetOrdersResponse = {
  id: string;
  total: number;
  shipping: number;
  user: User;
  voucher?: Voucher;
  orderStatusId: number | string;
  paymentMethod: string;
  orderDetails: OrderDetail[];
  metadata: OrderMetaData;
  createdAt: string;
  subTotal: number;
  discountValue: number;
};

type OrderDetail = {
  id: string;
  quantity: number;
  orderPrice: string;
  productStoreId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  product: Product;
};

type Product = {
  id: string;
  amount: string;
  categoryId: string;
  createdAt: string;
  deletedAt: string;
  description: string;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
};

type User = { id: string; firstName: string; lastName: string };

type Voucher = {
  id: string;
  code: string;
  minValueOrder: number;
  discountValue: number;
  type: string;
  createdAt: string;
};

type OrderMetaData = {
  Information: OrderInformation;
};

type OrderInformation = {
  address: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
};

// ******************** ORDER DETAIL ********************

export interface GetOrderDetailResponse extends GetOrdersResponse {}

// ******************** CANCEL ORDER ********************

export type CancelOrderPayload = {
  orderId: string;
  requestType: 'cancel';
};
