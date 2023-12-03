import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/users',
  PROFILE = 'users/profile',
  AUTH = '/auth',
  CATEGORY = '/category',
  PRODUCT = '/product',
  STORE = '/store',
  CART = '/cart',
  VOUCHER = '/voucher',
  ORDER = '/order',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
