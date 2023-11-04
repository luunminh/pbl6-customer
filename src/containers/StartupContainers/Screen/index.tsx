import { IRootState } from '@redux/rootReducer';
import React, { HTMLProps } from 'react';
import { connect } from 'react-redux';
import { Stack } from '@mui/material';
import { NAVBAR_HEIGHT } from '@appConfig/constants';
import { useLocation } from 'react-router-dom';
import { PATHS } from '@appConfig/paths';
const Navbar = React.lazy(() => import('../NavBar'));

const Screen: React.FC<Props> = ({ isAuthenticated, children }) => {
  const { pathname } = useLocation();

  const isInHome = !pathname.includes(PATHS.signIn) && !pathname.includes(PATHS.createAccount);

  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      gap={3}
      sx={isInHome ? { paddingTop: `${NAVBAR_HEIGHT}px` } : {}}
    >
      {isInHome && <Navbar isAuthenticated={isAuthenticated} />}
      <Stack width="100%">{children}</Stack>
    </Stack>
  );
};

type Props = ReturnType<typeof mapStateToProps> & HTMLProps<HTMLDivElement>;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, undefined)(Screen);
