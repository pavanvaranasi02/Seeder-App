import React from 'react';
import { Box, styled, ThemeProvider } from '@mui/material';
import theme from '../../../theme';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import IconPath, { AuthenticationTexts } from '../../../utils/Constants';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  overflow: 'auto',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));

const LeftBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '50vh',
  backgroundColor: theme.palette.primary.purple['600'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    width: '40%',
    height: '100vh',
  },
}));

const RightBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '50vh',
  backgroundColor: theme.palette.background.elevation0,
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('sm')]: {
    width: '60%',
    height: '100vh',
    paddingTop: '155px',
  },
}));

const InnerCard = styled(Box)(({ theme }) => ({
  height: '70%',
  width: '80%',
  backgroundColor: theme.palette.primary.purple['600'],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px',
  paddingBottom: '100px',
  [theme.breakpoints.up('sm')]: {
    height: '750px',
    width: '575px',
  },
}));

const ImageBox = styled(Box)(({ theme }) => ({
  width: '80%',
  height: '80%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bottom: '20px',
  [theme.breakpoints.up('sm')]: {
    width: '300px',
    height: '450px',
    bottom: '20px',
  },
}));

const SeederLogo = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '36px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginLeft: '-300px',
  marginTop: '-45px',
  gap: '8px',
  [theme.breakpoints.up('sm')]: {
    left: '-150px',
    top: '-30px',
  },
}));

export interface AuthenticationProps {
  imageSrc?: string;
  OrganismComponent?: React.ReactNode;
  imageAlt?: string;
}

const Authentication: React.FC<AuthenticationProps> = ({
  OrganismComponent,
  imageSrc,
  imageAlt,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <LeftBox>
          <InnerCard>
            <SeederLogo>
              <Icon src={IconPath.Seeder} alt={AuthenticationTexts.SeederAlt} />
              <Typography variant="heading2">
                {AuthenticationTexts.LogoTitle}
              </Typography>
            </SeederLogo>
            <ImageBox>
              <Icon src={imageSrc} alt={imageAlt} />
            </ImageBox>
          </InnerCard>
        </LeftBox>
        <RightBox>{OrganismComponent}</RightBox>
      </Container>
    </ThemeProvider>
  );
};

export default Authentication;
