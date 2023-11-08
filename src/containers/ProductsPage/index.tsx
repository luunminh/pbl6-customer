import React from 'react';
import Breadcrumbs from 'src/components/Breadcrumbs';
import Sidebar from './components/Sidebar';
import { Container, Stack } from '@mui/material';
import ProductGrid from './components/ProductGrid';

const ProductsPage = () => {
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
          <Sidebar />
          <ProductGrid />
        </Stack>
      </Container>
    </>
  );
};

export default ProductsPage;
