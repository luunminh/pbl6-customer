import { VoucherResponse } from "@queries";

export type VoucherContextType = {
  selectedVoucher: VoucherResponse;
  selectedVoucherId: string;
  setSelectedVoucherId: React.Dispatch<React.SetStateAction<string>>;
};
