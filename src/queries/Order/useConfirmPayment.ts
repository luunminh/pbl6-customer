import { responseWrapper } from '@shared';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { OrderApi } from '.';
import { ConfirmPaymentPayload } from './type';

export function useConfirmPayment(
  options?: UseMutationOptions<any, Error, ConfirmPaymentPayload> & {
    orderId: string;
  },
) {
  const handleConfirmPayment = (payload: ConfirmPaymentPayload) =>
    responseWrapper(OrderApi.confirmPayment, [options?.orderId, payload]);

  const { mutate: confirmPayment, isLoading } = useMutation<any, Error, ConfirmPaymentPayload>({
    mutationFn: handleConfirmPayment,
    ...options,
  });

  return {
    confirmPayment,
    isLoading,
  };
}
