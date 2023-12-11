import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, Image } from '@components';
import { Container, Stack, Typography } from '@mui/material';
import CategoryCarousel from './components/CategoryCarousel';
import TopSellsList from './components/TopSellsList';

const Homepage = () => {
  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Stack width="100%" gap={5} paddingX="24px">
        <Image src={IMAGES.banner} />
        <Typography variant="h3" fontWeight={600} color={COLOR_CODE.GREY_800}>
          Explore Categories
        </Typography>
        <CategoryCarousel />
        <Typography variant="h3" fontWeight={600} color={COLOR_CODE.GREY_800}>
          Top Sells
        </Typography>
        <TopSellsList />
      </Stack>
    </Container>
  );
};

export default Homepage;
