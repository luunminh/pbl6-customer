import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, DialogContext, Image } from '@components';
import { Button, Card, Divider, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { VoucherResponse, VoucherType, useGetAllVouchers } from '@queries';
import { Toastify, formatMoney, getDate, isEmpty } from '@shared';
import { useContext, useState } from 'react';
import { BsTicketPerforated } from 'react-icons/bs';
import { TbDiscount2 } from 'react-icons/tb';
import { SearchBar } from 'src/components';
import { VoucherContext } from 'src/context';

const ChooseVoucherDialog = ({ total }: PropsType) => {
  const { closeModal } = useContext(DialogContext);

  const { selectedVoucherId, setSelectedVoucherId } = useContext(VoucherContext);

  const [voucherId, setVoucherId] = useState<string>(selectedVoucherId || null);

  const [errorMsg, setErrorMsg] = useState<string>(null);

  const { vouchers, params, setParams } = useGetAllVouchers({
    onError: (error) => Toastify.error(error?.message),
  });

  const handleSearchVoucher = (searchValue: string) => {
    setParams({ ...params, search: searchValue });
  };

  const handleChangeVoucher = (event) => {
    setVoucherId(event.target.value);
    setErrorMsg('');
  };

  const handleApplyVoucher = () => {
    if (!isEmpty(voucherId)) {
      setSelectedVoucherId(voucherId);
      closeModal();
    } else {
      setErrorMsg('Please choose a voucher');
    }
  };

  const getVoucherDescription = (voucher: VoucherResponse) => {
    return `Discount ${
      voucher.type === VoucherType.FIXED
        ? formatMoney(voucher.discountValue)
        : `${voucher.discountValue}%`
    } for orders with a minimum total value of ${formatMoney(voucher.minValueOrder)}`;
  };

  return (
    <Stack justifyContent="space-between" gap={2}>
      <Stack direction="row" justifyContent="space-between" gap={2}>
        <Stack direction="row" gap="12px" alignItems="center">
          <BsTicketPerforated size={18} color={COLOR_CODE.PRIMARY_500} />
          <Typography fontSize={16}>Voucher code</Typography>
        </Stack>
        <Stack flexGrow={1}>
          <SearchBar placeholder="Enter a voucher code..." onSearch={handleSearchVoucher} />
        </Stack>
      </Stack>
      <Divider />
      <RadioGroup onChange={handleChangeVoucher} value={voucherId}>
        <Stack width="100%" gap={2}>
          {vouchers?.length > 0 ? (
            vouchers
              ?.filter((voucher) => voucher.quantity > 0)
              ?.map((voucher) => {
                return (
                  <Card
                    key={voucher.id}
                    sx={{
                      borderRadius: '10px',
                      boxShadow: '2px 3px 6px 0px rgba(207, 212, 217, 0.5)',
                      ':hover': {
                        boxShadow: '2px 3px 6px 0px rgba(207, 212, 217, 0.5)',
                      },
                      opacity: total < voucher.minValueOrder ? 0.6 : 1,
                    }}
                  >
                    <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
                      <Stack
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                        sx={{
                          width: '15%',
                          padding: 3,
                          backgroundColor: COLOR_CODE.PRIMARY_500,
                          borderRight: `2px dotted ${COLOR_CODE.GREY_300}`,
                        }}
                      >
                        <TbDiscount2 size={32} color={COLOR_CODE.WHITE} />
                        <Typography fontSize={16} fontWeight={600} color={COLOR_CODE.WHITE}>
                          MALT
                        </Typography>
                      </Stack>
                      <Stack
                        flexGrow={1}
                        justifyContent="space-between"
                        gap={1}
                        sx={{ padding: 1 }}
                      >
                        <Typography fontWeight={600}>{voucher.code}</Typography>
                        <Typography fontSize={14}>{getVoucherDescription(voucher)}</Typography>
                        <Typography fontSize={14}>
                          Date: {getDate(voucher.startDate)} - {getDate(voucher.endDate)}
                        </Typography>
                      </Stack>
                      <Radio
                        value={voucher.id}
                        size="small"
                        disableRipple
                        sx={{ padding: 5 }}
                        disabled={total < voucher.minValueOrder}
                      />
                    </Stack>
                  </Card>
                );
              })
          ) : (
            <Stack alignItems={'center'} spacing={1}>
              <Image
                src={IMAGES.notFound}
                style={{ width: '100px', height: '100px', alignSelf: 'center' }}
              />
              <Typography variant="body1" color={COLOR_CODE.GREY_700} fontWeight={600}>
                No Results Found
              </Typography>
              <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                We couldn't find what you're looking for...
              </Typography>
            </Stack>
          )}
        </Stack>
      </RadioGroup>
      {!isEmpty(errorMsg) && (
        <Typography color={COLOR_CODE.DANGER} fontSize={14}>
          {errorMsg}
        </Typography>
      )}
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginTop={1}
      >
        <Button variant="outlined" color="inherit" onClick={closeModal}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit" onClick={handleApplyVoucher}>
          Apply
        </Button>
      </Stack>
    </Stack>
  );
};

type PropsType = {
  total: number;
};

export default ChooseVoucherDialog;
