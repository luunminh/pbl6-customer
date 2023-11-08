import React from 'react';
import { Stack, Card, CardMedia, Typography, Button } from '@mui/material';
import { COLOR_CODE } from '@components';
import { BsCartPlus } from 'react-icons/bs';
import { ProductResponse } from '@queries/Product';
import { IMAGES } from '@appConfig/images';
import { formatMoney } from '@shared';

const ProductItem = ({ product }: Props) => {
  return (
    <Card sx={{ width: '300px', height: '380px', padding: '20px' }}>
      <Stack justifyContent="space-between" alignItems="center" gap={4} flexShrink={1}>
        <CardMedia
          sx={{ height: '150px', width: '150px' }}
          image={product.image || IMAGES.noImage}
        />
        <Stack spacing={1} width={'100%'}>
          <Typography variant="h4" fontWeight={700} color={COLOR_CODE.PRIMARY_500}>
            {formatMoney(product.price)}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </Typography>
          <Typography variant="h6">
            Available: {product?.productStore?.amount || product.amount} items
          </Typography>
        </Stack>
        <Button variant="contained" color="primary" fullWidth startIcon={<BsCartPlus />}>
          Add to cart
        </Button>
      </Stack>
    </Card>
  );
};

type Props = {
  product: ProductResponse;
};

export default ProductItem;
