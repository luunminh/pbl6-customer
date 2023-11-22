import { IMAGES } from '@appConfig/images';
import { COLOR_CODE, Image } from '@components';
import { Container, Divider, Stack, Typography } from '@mui/material';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { IoLocationOutline, IoMailOutline } from 'react-icons/io5';
import { LiaPhoneSolid } from 'react-icons/lia';

const Footer = () => {
  return (
    <Container maxWidth="xl" style={{ padding: 0 }}>
      <Stack width="100%" justifyContent="space-between" mt={5} mb={2} paddingX="24px" gap={2}>
        <Divider sx={{ borderColor: COLOR_CODE.GREY_300 }} />
        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
          <Stack width="80%" gap={2}>
            <Stack direction="row" alignItems="center" gap="10px">
              <Image src={IMAGES.logo} sx={{ height: '30px' }} />
              <Typography fontSize={18} fontWeight={600} color={COLOR_CODE.PRIMARY_500}>
                MALT
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="10px">
              <IoLocationOutline size={16} color={COLOR_CODE.PRIMARY_500} />
              <Typography fontSize={14}>
                488 Tôn Đức Thắng, P. Hòa Khánh Nam, Q. Liên Chiểu, TP. Đà Nẵng
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="10px">
              <LiaPhoneSolid size={16} color={COLOR_CODE.PRIMARY_500} />
              <Typography fontSize={14}>02368989196</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="10px">
              <IoMailOutline size={16} color={COLOR_CODE.PRIMARY_500} />
              <Typography fontSize={14}>maltstore@gmail.com</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap="10px">
              <AiOutlineClockCircle size={16} color={COLOR_CODE.PRIMARY_500} />
              <Typography fontSize={14}>7:00 - 23:00</Typography>
            </Stack>
          </Stack>
          <Stack width="20%" gap="6px" alignItems="center">
            <Image
              src={IMAGES.thankFulIcon}
              sx={{ width: '100px', height: '80px', objectFit: 'contain' }}
            />
            <Typography
              fontSize={14}
              fontWeight={600}
              color={COLOR_CODE.GREY_700}
              textAlign="center"
            >
              Thank You For Choosing Us!
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ borderColor: COLOR_CODE.GREY_300 }} />
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography fontSize={14}>&copy; 2023, All rights reserved</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;
