import { IMAGES } from '@appConfig/images';
import { Image } from '@components';
import { Skeleton, Stack } from '@mui/material';

export const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  700: { items: 3 },
  950: { items: 5 },
  1250: { items: 6 },
};

export const fetchingItems = [
  <Stack gap={2} key={'1'} alignItems={'center'} justifyContent={'center'}>
    <Image src={IMAGES.noImage} style={{ width: '100px', height: '100px' }} />
    <Skeleton variant="text" />
  </Stack>,
  <Stack gap={2} key={'2'} alignItems={'center'} justifyContent={'center'}>
    <Image src={IMAGES.noImage} style={{ width: '100px', height: '100px' }} />
    <Skeleton variant="text" />
  </Stack>,
  <Stack gap={2} key={'3'} alignItems={'center'} justifyContent={'center'}>
    <Image src={IMAGES.noImage} style={{ width: '100px', height: '100px' }} />
    <Skeleton variant="text" />
  </Stack>,
  <Stack gap={2} key={'4'} alignItems={'center'} justifyContent={'center'}>
    <Image src={IMAGES.noImage} style={{ width: '100px', height: '100px' }} />
    <Skeleton variant="text" />
  </Stack>,
  <Stack gap={2} key={'5'} alignItems={'center'} justifyContent={'center'}>
    <Image src={IMAGES.noImage} style={{ width: '100px', height: '100px' }} />
    <Skeleton variant="text" />
  </Stack>,
];
