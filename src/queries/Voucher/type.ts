import { TableParams } from '@components';

export type VoucherListParams = TableParams & {
  valid?: boolean;
};

export enum VoucherType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export interface VoucherResponse {
  id: string;
  code: string;
  description: string;
  minValueOrder: number;
  type: string;
  discountValue: number;
  quantity: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
