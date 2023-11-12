import { TableParams } from '@components/common/Table';
import { ProductResponse } from '@queries/Product';

export type CategoryListParams = TableParams;

export type CountType = {
  products: number;
};

export interface CategoryListResponse {
  id: string;
  name: string;
  image: string;
  description: string;
  _count: CountType;
  createdAt: string;
}

export type CategoryDetail = {
  id: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  products: ProductResponse[];
};
