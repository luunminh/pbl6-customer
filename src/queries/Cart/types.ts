import { ProductResponse, ProductStore } from '@queries/Product';

export type AddCartResponse = {
  id: string;
  cartId: string;
  productId: string;
  createdAt: string;
  quantity: number;
  price: number;
  updatedAt: string;
  deletedAt: string;
};

export type AddCartPayload = {
  productId: string;
  quantity: string;
};

export type Cart = {
  id: string;
  product: ProductResponse;
  productId: string;
  quantity: number;
  price: number;
  image: string;
  inOfStock: boolean;
  productStore: ProductStore;
};

export type DeleteProductCartPayload = {
  productId: string;
};
