import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, Image } from '@components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import { StoreResponse } from '@queries/Store';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaPhoneSolid } from 'react-icons/lia';
import { AiOutlineClockCircle } from 'react-icons/ai';

const StoreItem = ({ store }: Props) => {
  const storeName = `MALT Store - ${store?.address.split(',')[0]}`;

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Stack direction="row" alignItems="center" gap="10px">
          <Image src={IMAGES.logo} sx={{ height: '30px' }} />
          <Typography
            variant="body1"
            letterSpacing={0.5}
            fontWeight={600}
            color={COLOR_CODE.PRIMARY_500}
          >
            {storeName}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingX: 2 }}>
        <Stack justifyContent="center" gap={1}>
          <Stack direction="row" alignItems="center" gap={1}>
            <IoLocationOutline size={16} color={COLOR_CODE.PRIMARY_600} />
            <Typography variant="body2">{store.address}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <LiaPhoneSolid size={16} color={COLOR_CODE.PRIMARY_600} />
            <Typography variant="body2">{store.hotline}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap={1}>
            <AiOutlineClockCircle size={16} color={COLOR_CODE.PRIMARY_600} />
            <Typography variant="body2">7:00 - 23:00</Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

type Props = {
  store: StoreResponse;
};

export default StoreItem;
