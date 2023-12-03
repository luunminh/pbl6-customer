import { TableParams } from '@components';

export type VoucherListParams = TableParams & {
  valid?: boolean;
};

export enum VoucherType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

export type MetadataType = {
  users: string[];
};

export interface VoucherResponse {
  id: string;
  code: string;
  description: string;
  minValueOrder: number;
  type: string;
  discountValue: number;
  quantity: number;
  metadata: MetadataType;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
