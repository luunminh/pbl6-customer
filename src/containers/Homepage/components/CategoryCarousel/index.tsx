import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import { COLOR_CODE, Image } from '@components';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { useGetAllCategories } from '@queries';
import { Toastify } from '@shared';
import { useEffect, useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ProductGridQueryParams } from 'src/containers/ProductsPage/components/ProductGrid/type';
import { fetchingItems, responsive } from './helpers';
import './styles.scss';

const CategoryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [itemsInSlide, setItemsInSlide] = useState<number | null>(null);

  const carousel = useRef<AliceCarousel>(null);

  useEffect(() => {
    setItemsInSlide(carousel?.current?.state?.itemsInSlide || null);
  }, [carousel?.current?.state?.itemsInSlide]);

  const { categories, totalRecords, isFetching } = useGetAllCategories({
    onError: (error) => Toastify.error(error?.message),
  });

  const handleClickPrevious = () => {
    setActiveIndex((prev) => prev - 1);
    carousel?.current?.slidePrev();
  };

  const handleClickNext = () => {
    setActiveIndex((prev) => prev + 1);
    carousel?.current?.slideNext();
  };

  const hasPrevious = activeIndex > 0;

  const hasNext = activeIndex < totalRecords - itemsInSlide;

  const items = categories?.map((category) => {
    return (
      <Link
        to={`${PATHS.products}?${ProductGridQueryParams.CATEGORIES}=${category.id}`}
        key={category.id}
      >
        <Stack
          gap={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            padding: '20px',
            ':hover': { backgroundColor: COLOR_CODE.PRIMARY_100, borderRadius: '20px' },
          }}
        >
          <Image
            src={category.image || IMAGES.noImage}
            style={{ width: '100px', height: '100px' }}
          />
          <Typography>{category.name}</Typography>
        </Stack>
      </Link>
    );
  });

  return (
    <Stack width="100%" direction="row" alignItems="center" justifyContent="center">
      {hasPrevious && (
        <Tooltip title="Previous" arrow>
          <IconButton
            sx={{
              color: COLOR_CODE.GREY_600,
              ':hover': { backgroundColor: COLOR_CODE.PRIMARY_100 },
            }}
            onClick={handleClickPrevious}
          >
            <IoChevronBackOutline size={20} />
          </IconButton>
        </Tooltip>
      )}
      <AliceCarousel
        activeIndex={activeIndex}
        disableButtonsControls
        disableDotsControls
        items={isFetching ? fetchingItems : items}
        responsive={responsive}
        controlsStrategy="responsive"
        ref={carousel}
      />
      {hasNext && (
        <Tooltip title="Next" arrow>
          <IconButton
            sx={{
              color: COLOR_CODE.GREY_600,
              ':hover': { backgroundColor: COLOR_CODE.PRIMARY_100 },
            }}
            onClick={handleClickNext}
          >
            <IoChevronForwardOutline size={20} />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
};

export default CategoryCarousel;
