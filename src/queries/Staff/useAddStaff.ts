import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { AddStaffPayload } from './type';
import { StaffApi } from '.';
import { responseWrapper } from '@shared';
import { ApiKey } from '@queries/keys';

export function useAddStaff(options?: UseMutationOptions<any, Error, AddStaffPayload>) {
  const handleAddStaff = (payload: AddStaffPayload) =>
    responseWrapper(StaffApi.addStaff, [payload]);

  const { mutate: addStaff, isLoading } = useMutation<any, Error, AddStaffPayload>({
    mutationFn: handleAddStaff,
    onSuccess: () => {},
    ...options,
  });

  const queryClient = useQueryClient();

  const handleInvalidateStaffList = () => queryClient.invalidateQueries([ApiKey._USERS_LIST]);

  return {
    addStaff,
    isLoading,
    handleInvalidateStaffList,
  };
}
