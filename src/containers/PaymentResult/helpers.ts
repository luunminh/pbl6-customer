export enum vnpParams {
  vnp_Amount = 'vnp_Amount',
  vnp_BankCode = 'vnp_BankCode',
  vnp_BankTranNo = 'vnp_BankTranNo',
  vnp_CardType = 'vnp_CardType',
  vnp_OrderInfo = 'vnp_OrderInfo',
  vnp_PayDate = 'vnp_PayDate',
  vnp_ResponseCode = 'vnp_ResponseCode',
  vnp_TmnCode = 'vnp_TmnCode',
  vnp_TransactionNo = 'vnp_TransactionNo',
  vnp_TransactionStatus = 'vnp_TransactionStatus',
  vnp_TxnRef = 'vnp_TxnRef',
  vnp_SecureHash = 'vnp_SecureHash',
}

export const getDataParams = (query: URLSearchParams) => {
  return {
    [vnpParams.vnp_Amount]: query?.get('vnp_Amount')?.trim() || null,
    [vnpParams.vnp_BankCode]: query?.get('vnp_BankCode')?.trim() || null,
    [vnpParams.vnp_BankTranNo]: query?.get('vnp_BankTranNo')?.trim() || null,
    [vnpParams.vnp_CardType]: query?.get('vnp_CardType')?.trim() || null,
    [vnpParams.vnp_OrderInfo]: query?.get('vnp_OrderInfo')?.trim() || null,
    [vnpParams.vnp_PayDate]: query?.get('vnp_PayDate')?.trim() || null,
    [vnpParams.vnp_ResponseCode]: query?.get('vnp_ResponseCode')?.trim() || null,
    [vnpParams.vnp_TmnCode]: query?.get('vnp_TmnCode')?.trim() || null,
    [vnpParams.vnp_TransactionNo]: query?.get('vnp_TransactionNo')?.trim() || null,
    [vnpParams.vnp_TransactionStatus]: query?.get('vnp_TransactionStatus')?.trim() || null,
    [vnpParams.vnp_TxnRef]: query?.get('vnp_TxnRef')?.trim() || null,
    [vnpParams.vnp_SecureHash]: query?.get('vnp_SecureHash')?.trim() || null,
  };
};
