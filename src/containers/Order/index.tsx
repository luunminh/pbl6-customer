import { Breadcrumbs } from 'src/components';
import OrderList from './List';
import { Box, Container, Stack } from '@mui/material';
import { COLOR_CODE } from '@components';
import { useParams } from 'react-router-dom';
import { isEmpty } from '@shared';
import OrderDetail from './Detail';

const OrderPage = () => {
  const { id } = useParams();

  return (
    <Box bgcolor={isEmpty(id) ? COLOR_CODE.GREY_50 : COLOR_CODE.WHITE} width={'100vw'}>
      {isEmpty(id) && <Breadcrumbs />}
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
