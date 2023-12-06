import { COLOR_CODE } from '@components';
import { Box, Container, Stack } from '@mui/material';
import { isEmpty } from '@shared';
import { useParams } from 'react-router-dom';
import OrderDetail from './Detail';
import OrderList from './List';

const OrderPage = () => {
  const { id } = useParams();

  return (
    <Box bgcolor={isEmpty(id) ? COLOR_CODE.GREY_50 : COLOR_CODE.WHITE} width={'100vw'}>
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Stack
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          padding="24px"
          gap={3}
        >
          {isEmpty(id) ? <OrderList /> : <OrderDetail id={id} />}
        </Stack>
      </Container>
    </Box>
  );
};

export default OrderPage;
