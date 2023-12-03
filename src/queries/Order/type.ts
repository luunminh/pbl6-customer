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
