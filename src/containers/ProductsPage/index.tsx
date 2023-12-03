import React from 'react';
import { Breadcrumbs } from 'src/components';
import { Sidebar, ProductGrid, ProductDetail } from './components';
import { Container, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { isEmpty } from '@shared';

const ProductsPage = () => {
  const { id } = useParams();

  return (
    <>
      <Breadcrumbs />
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Stack
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          padding="24px"
          gap={3}
        >
          {isEmpty(id) ? (
            <>
              <Sidebar />
              <ProductGrid />
            </>
          ) : (
            <ProductDetail id={id} />
          )}
        </Stack>
      </Container>
    </>
  );
};

export default ProductsPage;
