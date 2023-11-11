import React from 'react';
import Breadcrumbs from 'src/components/Breadcrumbs';
import { Container, Stack, Typography } from '@mui/material';
import { COLOR_CODE, Image } from '@components';
import { IMAGES } from '@appConfig/images';
import StoreList from './components/StoreList';

const StoresPage = () => {
  return (
    <>
      <Breadcrumbs />
      <Container maxWidth="xl" style={{ padding: 0 }}>
        <Stack width="100%" justifyContent="space-between" paddingX={3} paddingY={6} gap={10}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Image
              src={IMAGES.storeImage}
              style={{ width: '55%', objectFit: 'cover', borderRadius: '10px' }}
            />
            <Stack alignItems="center">
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  lineHeight: 2,
                  textAlign: 'center',
                  color: COLOR_CODE.PRIMARY_500,
                }}
              >
                MALT Store - A place for your convenience
              </Typography>
              <Typography variant="h5" sx={{ lineHeight: 2, textAlign: 'center', fontWeight: 500 }}>
                Step into our convenience store, your one-stop destination for all your daily needs.
                From fresh produce to household staples, our shelves are stocked with care and
                convenience in mind. Join us for a hassle-free shopping experience, where every
                visit feels like a warm welcome.
              </Typography>
            </Stack>
          </Stack>
          <Stack alignItems="center" justifyContent="space-between" gap={5}>
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 2,
                textAlign: 'center',
                color: COLOR_CODE.PRIMARY_500,
                border: `2px solid ${COLOR_CODE.PRIMARY_500}`,
                borderRadius: '25px',
                padding: '0px 20px',
              }}
            >
              Our Stores
            </Typography>
            <StoreList />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default StoresPage;
