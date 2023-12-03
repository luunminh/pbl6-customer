import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, DialogContext, DialogType, Loading } from '@components';
import { getSelectedStoreLocation } from '@customerShared';
import { Avatar, Button, Card, Divider, Stack, Typography } from '@mui/material';
import { useGetAllStores } from '@queries';
import { StoreService, isEmpty } from '@shared';
import { useState, useContext, useCallback } from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { IoInformationCircle } from 'react-icons/io5';

const SelectStoreModal = () => {
  const { openModal, closeModal, setDialogContent } = useContext(DialogContext);
  const { stores, isFetching } = useGetAllStores();

  const [selectedStore, setSelectedStore] = useState(StoreService.getValue);

  const handleSaveLocationStore = () => {
    StoreService.setValue(selectedStore);
    window.location.reload();
    closeModal();
  };

  const handleShowWarningModal = useCallback(() => {
    if (!isEmpty(StoreService.getValue())) {
      setDialogContent({
        type: DialogType.YESNO_DIALOG,
        title: '',
        contentText: 'Change your Location',
        subContentText:
          'Some products may not be available in your new location. Do you want to continue?',
        showIcon: true,
        icon: <IoInformationCircle />,
        isWarning: false,
        okText: 'Continue',
        maxWidth: 'sm',
        onOk: handleSaveLocationStore,
      });
      return openModal();
    }
    return handleSaveLocationStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore]);

  const handleRenderBody = !isFetching ? (
    <Stack height={'330px'} overflow={'auto'} style={{ overflowX: 'hidden' }} gap={2}>
      {stores.map((store, idx) => (
        <Card
          key={idx}
          onClick={() => setSelectedStore(store.id)}
          sx={{
            px: 2,
            py: 4,
            gap: 1,
            display: 'flex',
            borderRadius: 2,
            boxShadow: 'none',
            alignItems: 'center',
            bgcolor: `${selectedStore === store.id ? COLOR_CODE.PRIMARY_200 : COLOR_CODE.WHITE}`,
          }}
        >
          <Avatar src={IMAGES.bigLogo} sx={{ width: 30, height: 30 }} />
          <Stack>
            <Typography fontWeight={600}>MALT Store</Typography>
            <Typography>{`Address: ${store.address}`}</Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  ) : (
    <Loading size="normal" variant="primary" />
  );

  return (
    <Stack gap={1}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
        <IoLocationOutline color={COLOR_CODE.PRIMARY_500} size={18} />
        <Typography variant="h5" fontWeight={700} color={COLOR_CODE.PRIMARY}>
          {!isEmpty(selectedStore)
            ? `Current store: ${getSelectedStoreLocation(stores, selectedStore)}`
            : 'Select a store'}
        </Typography>
      </Stack>
      <Divider sx={{ mt: 1 }} />
      {handleRenderBody}
      <Stack
        bgcolor={COLOR_CODE.WHITE}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        pt={2}
      >
        <Button onClick={closeModal} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleShowWarningModal} variant="contained" color="primary">
          Apply
        </Button>
      </Stack>
    </Stack>
  );
};

export default SelectStoreModal;
