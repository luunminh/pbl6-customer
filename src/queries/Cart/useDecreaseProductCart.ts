import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AddCartPayload, CartApi } from '.';

// < return Data, Error, Payload Type, Context Types >
export function useDecreaseProductCart(options?: UseMutationOptions<any, Error, AddCartPayload>) {
  const { mutate, isLoading, isSuccess } = useMutation<any, Error, AddCartPayload>({
    mutationFn: (payload: AddCartPayload) =>
      responseWrapper(CartApi.decreaseProductCart, [payload]),
    ...options,
  });

  return {
    decreaseProduct: mutate,
    isLoading,
    isDecreaseSuccess: isSuccess,
  };
}
