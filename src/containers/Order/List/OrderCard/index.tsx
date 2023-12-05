import { COLOR_CODE, Image } from '@components';
import { Button, Card, Stack, Typography } from '@mui/material';
import { GetOrdersResponse } from '@queries';
import { formatDate, formatMoney } from '@shared';
import { renderOrderCardStatus } from './helpers';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@appConfig/paths';

const OrderCard = ({ record }: Props) => {
  const navigate = useNavigate();

  const { createdAt, orderDetails, orderStatusId } = record || {};
  return (
    <Card sx={{ height: '480px', padding: '24px', borderRadius: '12px' }}>
      <Stack gap={3}>
        <Stack justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'}>
          <Typography
            fontWeight={600}
            bgcolor={COLOR_CODE.PRIMARY_200}
            borderRadius={5}
            px={2}
            py={1}
          >
            Order ID:{' '}
            <span style={{ color: COLOR_CODE.PRIMARY, fontWeight: 400 }}>{`#${formatDate(
              createdAt,
              'DDMMYYTHHmmss',
            )}`}</span>
          </Typography>
          {renderOrderCardStatus(orderStatusId)}
        </Stack>
        <Stack height={'300px'}>
          {orderDetails.slice(0, 2).map(({ id, product, quantity, orderPrice }, idx) => (
            <Stack
              key={id}
              flexDirection={'row'}
              alignItems={'center'}
              gap={3}
              pt={3}
              borderTop={`1px solid ${COLOR_CODE.GREY_200}`}
            >
              <Image
                src={product.image}
                sx={{ height: '150px', width: '150px', objectFit: 'contain' }}
              />
              <Stack
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
              >
                <Stack gap={1}>
                  <Typography maxWidth={'220px'} variant="h4" fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">Quantity: {quantity}</Typography>
                </Stack>
                <Typography color={COLOR_CODE.PRIMARY}>{formatMoney(+orderPrice)}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <Stack alignItems={'end'}>
          <Button
            variant="outlined"
            style={{ borderRadius: '20px' }}
            onClick={() => navigate(`${PATHS.order}/${record.id}`)}
          >
            View Order Detail
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

type Props = {
  record: GetOrdersResponse;
};
export default OrderCard;
