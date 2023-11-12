import { Button, Grid, Stack } from '@mui/material';
import { Container } from '@mui/material';
import CartList from './List';
import Breadcrumbs from 'src/components/Breadcrumbs';
import OrderSummary from './OrderSummary';
import { PATHS } from '@appConfig/paths';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { COLOR_CODE } from '@components';

const Cart = () => {
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumbs />
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Stack pt={5} pl={3}>
          <Button
            onClick={() => navigate(PATHS.products)}
            startIcon={<BsArrowLeft size={12} color={COLOR_CODE.GREY_600} />}
            style={{ width: '210px', color: COLOR_CODE.GREY_600, fontWeight: 400, border: 'none' }}
            variant="outlined"
          >
            Continue shopping
          </Button>
        </Stack>
        <Grid container padding={3} spacing={4}>
          <Grid item xs={8}>
            <CartList />
          </Grid>
          <Grid item xs={4}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Cart;
