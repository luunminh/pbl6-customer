import { UserProfileType, UserRole, isCustomerPortal } from '@components';
import { useGetProfile } from '@queries/Profile/useGetProfile';
import { setAuthenticated, setCurrentRole, setProfile } from '@redux/auth/authSlice';
import { IRootState } from '@redux/store';
import { AuthService, Toastify } from '@shared';
import { connect } from 'react-redux';
const AuthContainer: React.FC<Props> = ({
  isAuthenticated,
  onSetAuth,
  onSetCurrentRole,
  onSetProfile,
}) => {
  const { profile: myProfile } = useGetProfile({
    onSuccessCallback: (data) => {
      handleCheckRole(data);
    },
    onErrorCallback: () => {
      Toastify.error('Failed to get profile. Please try to login again!');
      clearAuth();
    },
  });

  const handleCheckRole = (profile: UserProfileType = myProfile) => {
    if (isCustomerPortal(profile?.userRoles)) {
      onSetAuth(true);
      onSetProfile(profile);
      onSetCurrentRole(profile.userRoles.find((role) => role.roleId === UserRole.USER).roleId);
    } else {
      Toastify.error("You don't have permission to access this page!");
      clearAuth();
    }
  };

  const clearAuth = () => {
    onSetAuth(false);
    onSetCurrentRole(null);
    onSetProfile(null);
    AuthService.clearToken();
  };

  return null;
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onSetAuth: setAuthenticated,
  onSetCurrentRole: setCurrentRole,
  onSetProfile: setProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
