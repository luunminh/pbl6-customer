import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CartApi, DeleteProductCartPayload } from '.';
import { responseWrapper } from '@shared';
// < return Data, Error, Payload Type, Context Types >
export function useDeleteCart(options?: UseMutationOptions<any, Error, any>) {
  const { mutate, isLoading } = useMutation<any, Error, any>({
    mutationFn: () => responseWrapper(CartApi.deleteCart),
    ...options,
  });

  return {
    deleteCart: mutate,
    isLoading,
  };
}
