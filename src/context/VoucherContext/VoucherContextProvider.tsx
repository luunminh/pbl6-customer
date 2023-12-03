import React, { useState } from 'react';
import { VoucherContext } from './VoucherContext';
import { useGetVoucherDetail } from '@queries';

const VoucherContextProvider = ({ children }: PropsType) => {
  const [selectedVoucherId, setSelectedVoucherId] = useState<string>(null);

  const { voucher: selectedVoucher } = useGetVoucherDetail({ voucherId: selectedVoucherId });

  return (
    <VoucherContext.Provider value={{ selectedVoucher, selectedVoucherId, setSelectedVoucherId }}>
      {children}
    </VoucherContext.Provider>
  );
};

export type PropsType = {
  children: React.ReactElement;
};

export default VoucherContextProvider;
