import { TableParams } from '@components/common/Table';

export type ProductListParams = TableParams;

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
}

export interface ProductResponse {
  id: string;
  name: string;
  description: string;
  amount: number;
  price: number;
  category: CategoryResponse;
  createdAt: string;
  updatedAt: string;
  image: string;
  productStore?: ProductStore;
}

export type ProductStore = {
  id: string;
  productId: string;
  storeId: string;
  amount: number;
  expirtyDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type ProductDetailParams = {
  id: string;
  storeId: string;
};
