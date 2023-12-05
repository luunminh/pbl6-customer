import { Chip } from '@mui/material';
import { OrderStatus } from '@queries';

export const renderOrderCardStatus = (status) => {
  switch (status.toString()) {
    // case OrderStatus.COMPLETED:
    //   return <Chip color="success" label="Confirmed" style={{ fontSize: 16 }} />;
    case OrderStatus.CONFIRMED:
      return <Chip color="success" label="Confirmed" style={{ fontSize: 16 }} />;
    // case OrderStatus.PAYMENT_CONFIRMED:
    //   return <Chip color="success" label="Confirmed" style={{ fontSize: 16 }} />;

    case OrderStatus.PENDING_CONFIRM:
      return <Chip color="warning" label="Pending" style={{ fontSize: 16 }} />;
    // case OrderStatus.PENDING_PAYMENT:
    //   return <Chip color="warning" label="Pending" style={{ fontSize: 16 }} />;

    case OrderStatus.CANCELED:
      return <Chip color="error" label="Cancelled" style={{ fontSize: 16 }} />;

    default:
      return <Chip color="success" label="Confirmed" style={{ fontSize: 16 }} />;
  }
};
