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
}
