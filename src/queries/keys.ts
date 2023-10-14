import { UseQueryOptions } from '@tanstack/react-query';

export enum ApiKey {
  USERS = '/users',
  PROFILE = 'users/profile',
  _USERS_LIST = '/admin/users',
  ADD_STAFF = '/admin/cashiers',
  AUTH = '/auth',
}

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
