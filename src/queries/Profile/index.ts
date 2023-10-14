import profileApi from './profileApi';

export * from './type';
export * from './useChangePassword';
export * from './useUpdateProfile';
export * from './useGetProfile';
export * from './useRequestChangePassword';

export const ProfileApi = profileApi.create();
