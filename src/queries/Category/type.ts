import { TableParams } from '@components/common/Table';

export type CategoryListParams = TableParams;

export type CountType = {
  products: number;
};

export interface CategoryListResponse {
  id: string;
  name: string;
  description: string;
  _count: CountType;
  createdAt: string;
}
