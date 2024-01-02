export const getDataParams = (query: URLSearchParams) => {
  return {
    vnp_Amount: query?.has('vnp_Amount') ? Number(query.get('vnp_Amount')) : 0,
    vnp_BankCode: query?.get('vnp_BankCode')?.trim() || null,
    vnp_BankTranNo: query?.get('vnp_BankTranNo')?.trim() || null,
    vnp_CardType: query?.get('vnp_CardType')?.trim() || null,
    vnp_OrderInfo: query?.get('vnp_OrderInfo')?.trim() || null,
    vnp_PayDate: query?.get('vnp_PayDate')?.trim() || null,
    vnp_ResponseCode: query?.get('vnp_ResponseCode')?.trim() || null,
    vnp_TransactionNo: query?.get('vnp_TransactionNo')?.trim() || null,
  };
};
