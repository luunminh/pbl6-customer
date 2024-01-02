import {
  CustomDropdown,
  DialogContext,
  DialogType,
  DropdownItem,
  RoleTitle,
  UserProfileType,
} from '@components';
import { EmailVerify } from '@components/ChangePassword/EmailVerify';
import { Avatar, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import { setAuthenticated, setCurrentRole, setProfile } from '@redux/auth/authSlice';
import { AuthService, getFullName } from '@shared';
import * as React from 'react';
import { AiOutlineLock, AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { LuClipboardList } from 'react-icons/lu';
import { TfiAngleDown } from 'react-icons/tfi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'src/appConfig/paths';
import { COLOR_CODE } from 'src/modules/components/configs/theme';
import { getShortName } from './helpers';

const UserMenu: React.FC<Props> = ({ profile }) => {
  const isMobileScreen = useMediaQuery('(max-width: 767px)');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal, closeModal, setDialogContent } = React.useContext(DialogContext);

  const handleLogOut = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Log out',
      data: (
        <Stack gap={2}>
          <Typography fontSize={16} fontWeight={500}>
            Are you sure you want to log out?
          </Typography>
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            pt={2}
          >
            <Button onClick={closeModal} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button onClick={logout} variant="contained" color="primary">
              Log out
            </Button>
          </Stack>
        </Stack>
      ),
      maxWidth: 'xs',
    });
    openModal();
  };

  const logout = () => {
    dispatch(setAuthenticated(false));
    dispatch(setCurrentRole(null));
    dispatch(setProfile(null));
    AuthService.clearToken();
    closeModal();
    navigate(PATHS.root);
  };

  const handleChangePassword = () => {
    setDialogContent({
      type: DialogType.CONTENT_DIALOG,
      title: 'Request Change Password',
      data: <EmailVerify />,
      maxWidth: 'sm',
    });
    openModal();
  };

  const menuOptions: DropdownItem[] = React.useMemo(
    () => [
      {
        label: 'My Profile',
        onClick: () => {
          navigate(PATHS.profile);
        },
        icon: <AiOutlineUser size={18} />,
      },
      {
        label: 'My Orders',
        onClick: () => {
          navigate(PATHS.order);
        },
        icon: <LuClipboardList size={18} />,
      },
      {
        label: 'Change Password',
        onClick: () => {
          handleChangePassword();
        },
        icon: <AiOutlineLock size={18} />,
      },
      {
        label: 'Log Out',
        onClick: () => {
          handleLogOut();
        },
        icon: <IoLogOutOutline size={18} />,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <CustomDropdown
      flexPosition="flex-end"
      label={
        <Stack
          flexDirection="row"
          alignItems="center"
          spacing={1}
          gap={2}
          sx={{
            cursor: 'pointer',
            p: 1,
            '&:hover': {
              bgcolor: COLOR_CODE.GREY_100,
              borderRadius: 1,
            },
          }}
        >
          <Avatar
            sx={{ width: 34, height: 34, bgcolor: COLOR_CODE.PRIMARY, fontSize: 13 }}
            src={profile.avatarUrl}
          >
            {getShortName({ ...profile })}
          </Avatar>
          {!isMobileScreen && (
            <Stack alignItems={'start'}>
              <Stack flexDirection={'row'} gap={2} alignItems={'center'}>
                <Typography variant="h6" whiteSpace={'nowrap'}>
                  {getFullName({ ...profile })}
                </Typography>
                <TfiAngleDown color={COLOR_CODE.GREY_500} size={11} />
              </Stack>
              <Typography fontSize={12} color={COLOR_CODE.GREY_600}>
                {RoleTitle[profile.userRoles[0].roleId]}
              </Typography>
            </Stack>
          )}
        </Stack>
      }
      items={menuOptions}
    />
  );
};

type Props = {
  profile: UserProfileType;
};

export default UserMenu;
