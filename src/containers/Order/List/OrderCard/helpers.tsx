import { Chip } from '@mui/material';
import { OrderStatus, OrderStatusTitle } from '@queries';

export const renderOrderCardStatus = (status) => {
  switch (status.toString()) {
    case OrderStatus.PENDING_CONFIRM:
      return (
        <Chip
          color="warning"
          label={OrderStatusTitle[OrderStatus.PENDING_CONFIRM]}
          style={{ fontSize: 16 }}
        />
      );
    case OrderStatus.CONFIRMED:
      return (
        <Chip
          color="success"
          label={OrderStatusTitle[OrderStatus.CONFIRMED]}
          style={{ fontSize: 16 }}
        />
      );
    case OrderStatus.COMPLETED:
      return (
        <Chip
          color="primary"
          label={OrderStatusTitle[OrderStatus.CONFIRMED]}
          style={{ fontSize: 16 }}
        />
      );
    case OrderStatus.PENDING_PAYMENT:
      return (
        <Chip
          color="secondary"
          label={OrderStatusTitle[OrderStatus.PENDING_PAYMENT]}
          style={{ fontSize: 16 }}
        />
      );
    case OrderStatus.PAYMENT_CONFIRMED:
      return (
        <Chip
          color="info"
          label={OrderStatusTitle[OrderStatus.PAYMENT_CONFIRMED]}
          style={{ fontSize: 16 }}
        />
      );
    case OrderStatus.CANCELED:
      return (
        <Chip
          color="error"
          label={OrderStatusTitle[OrderStatus.CANCELED]}
          style={{ fontSize: 16 }}
        />
      );
    default:
      return <Chip label="--" style={{ fontSize: 16 }} />;
  }
};
