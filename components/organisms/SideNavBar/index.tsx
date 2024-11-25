import React, { useState } from 'react';
import { Card, Stack } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';
import Typography from '../../atoms/Typography';
import CustomButton from '../../atoms/Button';
import IconPath from '../../../utils/Constants';

export interface SideNavprops {
  activeIndex?: number | null;
  id?: string;
  handlePage?: () => void;
}

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: '100vh',
  minHeight: '450px',
  overflowY: 'auto',
  overflowX: 'auto',
  padding: theme.spacing(8, 6),
  backgroundColor: theme.palette.background.elevation1,
  '@media (max-width: 960px)': {
    width: '100%',
    height: '100vh',
  },
}));

const LogoStack = styled(Stack)({
  width: '100%',
  maxWidth: '210px',
  height: '36px',
  alignItems: 'center',
  flexDirection: 'row',
});

const StyledLogo = styled('img')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: '29.88px',
  height: 'auto',
  marginRight: theme.spacing(2),
}));

const MenuStack = styled(Stack)({
  marginTop: '40px',
});

const ButtonStack = styled(Stack)<{ active?: string }>(({ theme, active }) => ({
  width: '100%',
  height: '49px',
  backgroundColor:
    active === 'true' ? theme.palette.background.elevation2 : 'transparent',
  borderRadius: '12px',
  cursor: 'pointer',
  padding: theme.spacing(2),
  '& img': {
    filter: active === 'true' ? 'invert(80%) brightness(1.2)' : 'none',
    width: '16px',
    height: 'auto',
  },
  flexDirection: 'row',
}));

const StyledButton = styled(CustomButton)<{ active?: string }>(
  ({ theme, active }) => ({
    color:
      active === 'true'
        ? theme.palette.text.highEmphasis
        : theme.palette.text.lowEmphasis,
    backgroundColor: 'transparent !important',
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
    '& span': {
      display: 'none',
    },
    marginLeft: theme.spacing(2),
  })
);

const FooterStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  paddingBottom: '100px',
  padding: theme.spacing(3),
  '& img': {
    width: '16px',
    height: 'auto',
  },
  '@media (max-width: 600px)': {
    marginTop: theme.spacing(8),
  },
}));

const SideNavBar: React.FC<SideNavprops> = ({
  activeIndex = null,
  id,
  handlePage = () => {},
}) => {
  const [activeButton, setActiveButton] = useState<number | null>(activeIndex);

  const menuItems = [
    { id: 1, src: IconPath.HomeIcon, alt: 'HomeIcon', children: 'Home' },
    {
      id: 2,
      src: IconPath.CashIcon,
      alt: 'CashIcon',
      children: 'Cash Acceleration',
    },
  ];

  const handleMenuClick = (index: number) => {
    setActiveButton(index);
    if (activeIndex !== index) {
      handlePage();
    }
  };

  return (
    <StyledCard id={id}>
      <div>
        <LogoStack>
          <StyledLogo src={IconPath.seeder} alt="Seeder Logo" />
          <Typography variant="heading2">Seeder</Typography>
        </LogoStack>
        <MenuStack>
          {menuItems.map((item) => (
            <ButtonStack
              key={item.id}
              active={(activeButton === item.id).toString()}
              onClick={() => {
                handleMenuClick(item.id);
              }}
            >
              <img src={item.src} alt={item.alt} />
              <StyledButton
                variant="text"
                active={(activeButton === item.id).toString()}
              >
                {item.children}
              </StyledButton>
            </ButtonStack>
          ))}
        </MenuStack>
      </div>
      <FooterStack>
        <img src={IconPath.FlashIcon} alt="FlashIcon" />
        <StyledButton variant="text">Watch how to</StyledButton>
      </FooterStack>
    </StyledCard>
  );
};

export default SideNavBar;
