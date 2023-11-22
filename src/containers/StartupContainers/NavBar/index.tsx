import React, { HTMLProps, useContext, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
  Container,
  Tooltip,
} from '@mui/material';
import { IoCartOutline, IoLocationOutline } from 'react-icons/io5';
import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import UserMenu from './UserMenu';
import { Image, COLOR_CODE, DialogContext, DialogType } from '@components';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import LoadingContainer from '@components/LoadingContainer';
import { IRootState } from '@redux/rootReducer';
import { navBarItems } from './helpers';
import SearchBar from 'src/components/SearchBar';
import { useGetAllStores } from '@queries/Store';
import { StoreService, isEmpty } from '@shared';
import { getSelectedStoreLocation } from '@customerShared';
import { useCallback } from 'react';
import SelectStoreModal from '../SelectStoreModal';
import { useGetCart } from '@queries';

const Navbar: React.FC<Props> = ({ isAuthenticated }) => {
  const { openModal, setDialogContent } = useContext(DialogContext);

  const { profile, isLoading } = useGetProfile({});

  const { stores } = useGetAllStores();

  const { cart } = useGetCart({
    storeId: StoreService.getValue(),
  });

  const cartTotalItems = useMemo(
    () =>
      cart
        ?.filter((product) => product.inOfStock)
        .reduce((total, curProduct) => total + curProduct.quantity, 0),
    [cart],
  );

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleSelectStore = useCallback(() => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Choose a store location',
      data: <SelectStoreModal />,
      maxWidth: 'md',
    });

    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <AppBar
        variant="elevation"
        elevation={0}
        position="fixed"
        style={{ background: COLOR_CODE.WHITE }}
      >
        <Container maxWidth="xl" style={{ padding: 0 }}>
          <Toolbar variant="regular">
            <Stack
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              gap={5}
            >
              <Stack direction="row" justifyItems="center" alignItems="center" gap={1}>
                <Link to={PATHS.root} className="is-flex">
                  <Image src={IMAGES.logo} sx={{ height: '30px' }} />
                </Link>
                <Typography sx={{ fontSize: 24, color: COLOR_CODE.PRIMARY_500, fontWeight: 700 }}>
                  <Link to={PATHS.root} className="is-flex">
                    MALT
                  </Link>
                </Typography>
              </Stack>
              <Stack direction="row" flexGrow={1}>
                <SearchBar placeholder="Search for items..." />
              </Stack>
              <Stack direction="row" justifyItems="flex-end" alignItems="center" gap={5}>
                <Tooltip title="Click to choose a store" arrow>
                  <Button
                    onClick={handleSelectStore}
                    sx={{
                      fontSize: 14,
                      borderRadius: 2,
                      textTransform: 'initial',
                      border: `1px solid ${COLOR_CODE.GREY_300}`,
                      fontWeight: 500,
                    }}
                    startIcon={<IoLocationOutline color={COLOR_CODE.PRIMARY_500} size={18} />}
                  >
                    {!isEmpty(getSelectedStoreLocation(stores))
                      ? getSelectedStoreLocation(stores)
                      : 'Select a store'}
                  </Button>
                </Tooltip>
                <IconButton
                  aria-label="cart"
                  sx={{ color: COLOR_CODE.GREY_800 }}
                  onClick={() => navigate(PATHS.cart)}
                >
                  {
                    <Badge
                      badgeContent={(isAuthenticated && cartTotalItems) || '0'}
                      color="primary"
                    >
                      <IoCartOutline size="24px" />
                    </Badge>
                  }
                </IconButton>
                {isAuthenticated ? (
                  <UserMenu profile={profile} />
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        navigate(PATHS.signIn);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(PATHS.createAccount);
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Toolbar>
          <Toolbar variant="regular">
            <Stack
              width="100%"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              gap={8}
            >
              {navBarItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Button
                    key={item.path}
                    startIcon={isActive ? item.activeIcon : item.icon}
                    onClick={() => {
                      navigate(item.path);
                    }}
                    sx={isActive ? { color: COLOR_CODE.PRIMARY_500 } : {}}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

type Props = ReturnType<typeof mapStateToProps> & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default Navbar;
