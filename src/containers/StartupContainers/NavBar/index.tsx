import React, { HTMLProps, useState } from 'react';
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
} from '@mui/material';
import { IoCartOutline, IoLocationOutline } from 'react-icons/io5';
import { IMAGES } from '@appConfig/images';
import { PATHS } from '@appConfig/paths';
import UserMenu from './UserMenu';
import { Image, COLOR_CODE, Select } from '@components';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import LoadingContainer from '@components/LoadingContainer';
import { IRootState } from '@redux/rootReducer';
import { storeOptions, navBarItems } from './helpers';
import SearchBar from 'src/components/SearchBar';

const Navbar: React.FC<Props> = ({ isAuthenticated }) => {
  const { profile, isLoading } = useGetProfile({});

  // TODO set in localStorage later
  const [selectedStore, setSelectedStore] = useState(storeOptions[0].value);

  const navigate = useNavigate();

  const { pathname } = useLocation();

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
              gap={8}
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
                {/* TODO: Change this Select to MuiTextField (in "readonly" state) 
              so that clicking on it opens a dialog to choose the store location. */}
                <Select
                  onChange={(name, value) => {
                    setSelectedStore(value);
                  }}
                  options={storeOptions}
                  value={selectedStore}
                  defaultValue={selectedStore}
                  placeholder="Choose a store"
                  icon={<IoLocationOutline color={COLOR_CODE.PRIMARY_500} size="18px" />}
                  isClearable={false}
                />
                <IconButton aria-label="cart" sx={{ color: COLOR_CODE.GREY_800 }}>
                  <Badge badgeContent={1} color="primary">
                    <IoCartOutline size="24px" />
                  </Badge>
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
