import React from 'react';
import { Box, ThemeProvider, styled } from '@mui/material';
import  Typography,{ TypoProps } from '../../atoms/Typography/index';
import Button from '../../atoms/Button/index';
import theme from '../../../theme/index';

export interface TypographyButtonProps {
  title: string;
  titleVariant: TypoProps['variant'];
  titleColor?: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.elevation0,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '270px',
  height:'27px',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '270px',
    paddingTop: '10px',
    paddingBottom: '10px',  
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent !important',
  '&:hover': {
    backgroundColor: 'transparent !important',
  },
  '&.MuiButton-root': {
    backgroundColor: 'transparent !important',
  }
}));

const TypographyButton: React.FC<TypographyButtonProps> = ({
  title,
  titleVariant,
  titleColor,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Typography variant={titleVariant} color={titleColor}>
          {title}
        </Typography>
        <StyledButton disableRipple onClick={onButtonClick}>
          {buttonLabel}
        </StyledButton>
      </StyledBox>
    </ThemeProvider>
  );
};

export default TypographyButton;
