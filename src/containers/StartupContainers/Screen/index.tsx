import { IRootState } from '@redux/rootReducer';
import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import { Stack, useMediaQuery } from '@mui/material';
import { NAVBAR_HEIGHT } from '@appConfig/constants';
import { useLocation } from 'react-router-dom';
import { PATHS } from '@appConfig/paths';
const Navbar = React.lazy(() => import('../NavBar'));
const Footer = React.lazy(() => import('../Footer'));

const Screen: React.FC<Props> = ({ isAuthenticated, children }) => {
  const { pathname } = useLocation();

  const isInHome =
    !pathname.includes(PATHS.signIn) &&
    !pathname.includes(PATHS.createAccount) &&
    !pathname.includes(PATHS.forgotPassword) &&
    !pathname.includes(PATHS.resetPassword);

  const isMobileScreen = useMediaQuery('(max-width: 767px)');

  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      sx={{
        paddingTop: isInHome ? `${NAVBAR_HEIGHT}px` : '0',
        overflowX: isMobileScreen && 'hidden',
      }}
    >
      {isInHome && <Navbar isAuthenticated={isAuthenticated} />}
      {children}
      {isInHome && <Footer />}
    </Stack>
  );
};

type Props = ReturnType<typeof mapStateToProps> & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, undefined)(Screen);
