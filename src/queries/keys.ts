import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/users',
  PROFILE = 'users/profile',
  _USERS_LIST = '/admin/users',
  ADD_STAFF = '/admin/cashiers',
  AUTH = '/auth',
  CATEGORY = '/category',
  PRODUCT = '/product',
  STORE = '/store',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
