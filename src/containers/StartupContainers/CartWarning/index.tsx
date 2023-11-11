import { PATHS } from '@appConfig/paths';
import { COLOR_CODE } from '@components';
import { memo, useContext } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { IoWarningOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { DialogContext } from '@components';
const CartWarning = () => {
  const { closeModal } = useContext(DialogContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    closeModal();
    navigate(PATHS.signIn);
  };

  return (
    <>
      <Stack
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', rowGap: '20px' }}
      >
        <Box
          sx={{
            backgroundColor: COLOR_CODE.PRIMARY_200,
            borderRadius: '50%',
            height: '80px',
            width: '80px',
            position: 'relative',
          }}
        >
          <IoWarningOutline
            size="50px"
            color={COLOR_CODE.PRIMARY}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
        <Typography variant="h3" textAlign={'center'} fontWeight={'500'}>
          Please Login to access this feature !!!
        </Typography>
        <Button fullWidth variant="outlined" onClick={handleLogin}>
          Login Now
        </Button>
      </Stack>
    </>
  );
};

export default memo(CartWarning);
