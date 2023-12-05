import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { CancelOrderPayload, OrderApi } from '..';
import { responseWrapper } from '@shared';
// < return Data, Error, Payload Type, Context Types >
export function useCancelOrder(options?: UseMutationOptions<any, Error, CancelOrderPayload>) {
  const { mutate, isLoading } = useMutation<any, Error, CancelOrderPayload>({
    mutationFn: (payload: CancelOrderPayload) => responseWrapper(OrderApi.cancelOrder, [payload]),
    ...options,
  });

  return {
    cancelOrder: mutate,
    isLoading,
  };
}
