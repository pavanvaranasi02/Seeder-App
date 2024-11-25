import React from 'react';
import { Menu, MenuItem, styled, Box } from '@mui/material';
import Avatar from '../../atoms/Avatar/index';
import IconPath from '../../../utils/Constants/index';
import Divider from '../../atoms/Divider/index';
import theme from '../../../theme/index';
import Icon from '../../atoms/Icon/index';
import Typography from '../../atoms/Typography/index';

export interface ProfileCardProps {
  onLogout: () => void;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
}

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '250px',
    height: '310px',
    borderRadius: '12px',
    gap: 8,
    backgroundColor: '#262529',
    paddingLeft: '20px',
    paddingRight: '20px',
    border: '1px solid',
    borderColor: theme.palette.Borders.lowEmphasis,
  },
  '& .MuiMenuItem-root': {
    backgroundColor: 'inherit',
  },
  '& .MuiMenuItem-root:active': {
    backgroundColor: 'inherit',
  },
}));

const HeaderMenuItem = styled(MenuItem)({
  height: '74px',
  width: '210px',
  borderRadius: '12px',
  gap: '12px',
  padding: '16px',
});

const OtherMenuItem = styled(MenuItem)({
  width: '210px',
  height: '49px',
  borderRadius: '12px',
  padding: '16px',
  gap: '12px',
});

const FirstStyledBox = styled(Box)({
  width: '178px',
  height: '17px',
});

const SecondStyledBox = styled(Box)({
  width: '150px',
  height: '17px',
  display: 'flex',
  alignItems: 'center',
});

const EditProfileBox = styled(Box)({
  width: '126px',
  height: '42px',
  display: 'flex',
  flexDirection: 'column',
});

const StyledAvatar = {
  height: '40px',
  width: '40px',
  borderRadius: '12px',
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  anchorEl,
  handleClose,
  onLogout,
}) => {
  return (
    <Box>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <HeaderMenuItem onClick={handleClose}>
          <Avatar src={IconPath.avatarImg} variant="rounded" style={StyledAvatar} />
          <EditProfileBox>
            <Typography variant="heading3" color={theme.palette.text.highEmphasis}>
              Kane Cooper
            </Typography>
            <Typography variant="button2" color="#B4A9FF">
              Edit Profile
            </Typography>
          </EditProfileBox>
        </HeaderMenuItem>

        <Divider orientation="horizontal" />

        <OtherMenuItem onClick={handleClose}>
          <FirstStyledBox>
            <Typography variant="button2" color={theme.palette.text.lowEmphasis}>
              Manage Subscriptions
            </Typography>
          </FirstStyledBox>
        </OtherMenuItem>

        <OtherMenuItem onClick={handleClose}>
          <FirstStyledBox>
            <Typography variant="button2" color={theme.palette.text.lowEmphasis}>
              Help
            </Typography>
          </FirstStyledBox>
        </OtherMenuItem>

        <Divider orientation="horizontal" />

        <OtherMenuItem onClick={handleClose}>
          <Icon src={IconPath.settings} alt="Settings" />
          <SecondStyledBox>
            <Typography variant="button2" color={theme.palette.text.lowEmphasis}>
              Settings
            </Typography>
          </SecondStyledBox>
        </OtherMenuItem>

        <OtherMenuItem onClick={()=>{
          onLogout();
          handleClose();
        }}>
          <Icon src={IconPath.logout} alt="Log Out" />
          <SecondStyledBox>
            <Typography variant="button2" color={theme.palette.customColors.logout}>
              Log Out
            </Typography>
          </SecondStyledBox>
        </OtherMenuItem>
      </StyledMenu>
    </Box>
  );
};

export default ProfileCard;
