import React from 'react';
import { Box, Stack, ThemeProvider, styled, useTheme } from '@mui/material';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import theme from '../../../theme';
import IconPath from '../../../utils/Constants';

const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.elevation0,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '460px',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '100%',
  },
  overflow: 'auto',
}));

const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  gap: '16px',
  marginBottom: '40px',
  [theme.breakpoints.down('sm')]: {
    gap: '12px',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '60px',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.white['500'],
    opacity: 0.56,
  },
}));

export interface ChangePasswordProps {
  password: string;
  changePassword: string;
  handlePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  helperText?:string,
  changePasswordError?: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  password,
  changePassword,
  handlePassword,
  handleChangePassword,
  handleFormSubmit,
  helperText,
  changePasswordError,
}) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <StyledStack>
          <Typography variant="title" color={theme.palette.text.highEmphasis}>
            Change Password
          </Typography>
        </StyledStack>

        <StyledForm onSubmit={handleFormSubmit}>
          <StyledStack>
            <TextField
              startSrc={IconPath.Lock}
              startAlt="Password Icon"
              endSrc={IconPath.Eye}
              endAlt="Eye Icon"
              value={password}
              onChange={handlePassword}
              InputProps={{ type: 'password' }}
              placeholder=""
            />
            <TextField
              startSrc={IconPath.Lock}
              startAlt="Change Password Icon"
              value={changePassword}
              onChange={handleChangePassword}
              InputProps={{ type: 'password' }}
              placeholder=""
              helperText={changePasswordError ?? helperText}
            />
            <Typography variant="body2" color={theme.palette.text.lowEmphasis}>
              Password must contain at least 7 letters and 1 number
            </Typography>
          </StyledStack>
          <StyledButton
            variant="contained"
            backgroundColor={theme.palette.primary.main}
            type="submit"
            disableRipple
            disabled={changePassword===''|| password===''
            }
          >
            Change Password
          </StyledButton>
        </StyledForm>
      </FormContainer>
    </ThemeProvider>
  );
};

export default ChangePassword;

