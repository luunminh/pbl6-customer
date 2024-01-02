import { Button, Grid, Stack, useMediaQuery } from '@mui/material';
import { Container } from '@mui/material';
import CartList from './List';
import { PATHS } from '@appConfig/paths';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { COLOR_CODE } from '@components';
import { Breadcrumbs } from 'src/components';
import OrderSummary from './OrderSummary';

const Cart = () => {
  const navigate = useNavigate();

  const isMobileScreen = useMediaQuery('(max-width: 767px)');

  return (
    <>
      <Breadcrumbs />
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Stack pt={5} pl={3} alignItems="flex-start">
          <Button
            startIcon={<BsArrowLeft size={14} />}
            sx={{
              textTransform: 'none',
              color: COLOR_CODE.GREY_600,
              fontWeight: 500,
              fontSize: 16,
              paddingX: 1,
            }}
            onClick={() => navigate(PATHS.products)}
          >
            Continue shopping
          </Button>
        </Stack>
        <Grid container pt={3} paddingX={3} spacing={4}>
          <Grid item xs={isMobileScreen ? 12 : 8}>
            <CartList />
          </Grid>
          <Grid item xs={isMobileScreen ? 12 : 4}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
