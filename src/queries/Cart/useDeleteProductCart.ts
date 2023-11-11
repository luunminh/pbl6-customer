import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CartApi, DeleteProductCartPayload } from '.';
import { responseWrapper } from '@shared';
// < return Data, Error, Payload Type, Context Types >
export function useDeleteProductCart(
  options?: UseMutationOptions<any, Error, DeleteProductCartPayload>,
) {
  const { mutate, isLoading } = useMutation<any, Error, DeleteProductCartPayload>({
    mutationFn: (payload: DeleteProductCartPayload) =>
      responseWrapper(CartApi.deleteProductCart, [payload]),
    ...options,
  });

  return {
    deleteProductCart: mutate,
    isLoading,
  };
}
