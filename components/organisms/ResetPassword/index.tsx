import React, { useState } from 'react';
import TypographyButton from '../../molecules/TypographyButton/index';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import { Box, ThemeProvider, styled } from '@mui/material';
import theme from '../../../theme/index';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.elevation0,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'start',
  gap: theme.spacing(4),
  overflow: 'auto',
  width: '100%',
  maxWidth: '454px',
  height: 'auto',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    gap: theme.spacing(2),
    maxWidth: '100%',
  },
}));

const StyledButton = styled(Button)<{ isEnabled: boolean }>(({ theme, isEnabled }) => ({
  width: '100%',
  height: '60px',
  opacity: isEnabled ? 1 : 0.56,
  pointerEvents: isEnabled ? 'auto' : 'none',
  backgroundColor: theme.palette.primary.purple[500],
  [theme.breakpoints.down('sm')]: {
    height: '50px',
  },
}));

export const TypographyBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '54px',
  padding: 0,
  display: 'flex',
  maxWidth: '434px',
  flexDirection: 'column',
  marginBottom: theme.spacing(4),
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

export interface ResetCardProps {
  title?: string;
  description?: string;
  placeholder?: string;
  startSrc?: string;
  buttonLabel?: string;
  onButtonClick?: (value: string) => void;
  validateInput?: (value: string ) => boolean;
  onLoginButtonClick?: () => void; 
  helperText?:string
}

const ResetPassword: React.FC<ResetCardProps> = ({
  title,
  description,
  placeholder,
  startSrc,
  buttonLabel,
  onButtonClick = (value: string) => {}, 
  validateInput,
  onLoginButtonClick = () => {}, 
  helperText,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (validateInput) {
      setIsButtonEnabled(validateInput(value));
    }
  };

  const handleClick = () => {
    onButtonClick(inputValue); 
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledBox>
        <Typography variant='title' color={theme.palette.text.highEmphasis}>
          {title}
        </Typography>
        <TypographyBox>
          <Typography variant='heading3' color={theme.palette.text.mediumEmphasis}>
            {description}
          </Typography>
        </TypographyBox>
        <TextField
          placeholder={placeholder}
          startSrc={startSrc}
          value={inputValue}
          onChange={handleInputChange}
          helperText={helperText}
        />
        <StyledButton
          variant="contained"
          isEnabled={isButtonEnabled}
          onClick={handleClick}
          disableRipple
        >
          {buttonLabel}
        </StyledButton>
        <TypographyButton
          title="Go back to "
          titleVariant="body1"
          titleColor={theme.palette.text.lowEmphasis}
          buttonLabel="Login"
          onButtonClick={onLoginButtonClick}
        />
      </StyledBox>
    </ThemeProvider>
  );
};

export default ResetPassword;
