import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { responseWrapper } from '@shared';
import { CreateOrderPayload } from './type';
import { OrderApi } from '.';

export function useCreateOrder(options?: UseMutationOptions<any, Error, CreateOrderPayload>) {
  const handleCreateOrder = (payload: CreateOrderPayload) =>
    responseWrapper(OrderApi.createOrder, [payload]);

  const { mutate: createOrder, isLoading } = useMutation<any, Error, CreateOrderPayload>({
    mutationFn: handleCreateOrder,
    ...options,
  });

  return {
    createOrder,
    isLoading,
  };
}
