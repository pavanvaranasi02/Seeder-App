import React from 'react';
import { Box, Stack, ThemeProvider, styled } from '@mui/material';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';
import CustomButton from '../../atoms/Button';
import Divider from '../../atoms/Divider';
import { SocialLogin } from '../../molecules/SocialLogin';
import TypographyButton from '../../molecules/TypographyButton';
import theme from '../../../theme';
import IconPath, { LoginFormTexts } from '../../../utils/Constants';

export const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.elevation0,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '470px',
  height: 'auto',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    maxWidth: '100%',
  },
}));

export const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  overflow: 'auto',
});

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  gap: '16px',
  marginBottom: '40px',
  [theme.breakpoints.down('sm')]: {
    gap: '12px',
  },
}));

export const StyledSocialStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  margin: theme.spacing(5, 0),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  },
}));

export const StyledButton = styled(CustomButton)(({ theme }) => ({
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
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const StyledTextButton = styled(CustomButton)(() => ({
  alignSelf: 'flex-start',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(5),
}));

export const StyledDividerStack = styled(Stack)(() => ({
  width: '100%',
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(5),
}));

export const StyledBox = styled(Box)(() => ({
  alignSelf: 'flex-start',
}));

export interface LoginFormProps {
  email?: string;
  password?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onForgotPasswordClick?: () => void;
  onContinueClick?: () => void;
  onGoogleLoginClick?: () => void;
  onStripeLoginClick?: () => void;
  onXeroLoginClick?: () => void;
  onSignUpClick?: () => void;
  isButtonDisabled?: boolean;
  error?: string;
}

export interface SocialLoginStackProps {
  onGoogleClick?: () => void;
  onStripeClick?: () => void;
  onXeroClick?: () => void;
}

export const SocialLoginStack: React.FC<SocialLoginStackProps> = ({
  onGoogleClick,
  onStripeClick,
  onXeroClick,
}) => (
  <StyledSocialStack>
    <SocialLogin
      src={IconPath.google}
      alt={LoginFormTexts.Google}
      variant="button"
      onClick={onGoogleClick}
    >
      {LoginFormTexts.Google}
    </SocialLogin>
    <SocialLogin
      src={IconPath.stripe}
      alt={LoginFormTexts.Stripe}
      variant="button"
      onClick={onStripeClick}
    >
      {LoginFormTexts.Stripe}
    </SocialLogin>
    <SocialLogin
      src={IconPath.xero}
      alt={LoginFormTexts.Xero}
      variant="button"
      onClick={onXeroClick}
    >
      {LoginFormTexts.Xero}
    </SocialLogin>
  </StyledSocialStack>
);

const LoginForm: React.FC<LoginFormProps> = ({
  email = '',
  password = '',
  onForgotPasswordClick,
  onContinueClick,
  onGoogleLoginClick,
  onStripeLoginClick,
  onXeroLoginClick,
  onSubmit = () => {},
  onSignUpClick = () => {},
  onEmailChange = () => {},
  onPasswordChange = () => {},
  isButtonDisabled = true,
  error = '',
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <StyledStack>
          <Typography variant="title" color="text.primary">
            {LoginFormTexts.LoginTitle}
          </Typography>
          <Typography variant="heading3" color="text.lowEmphasis">
            {LoginFormTexts.LoginHeading}
          </Typography>
        </StyledStack>

        <StyledForm onSubmit={onSubmit}>
          <StyledStack>
            <TextField
              placeholder={LoginFormTexts.EmailPlaceHolder}
              startSrc={IconPath.Email}
              startAlt={LoginFormTexts.EmailAlt}
              value={email}
              onChange={onEmailChange}
              error={!!error} 
              // helperText={error}  
            />
            <TextField
              placeholder={LoginFormTexts.PasswordPlaceHolder}
              startSrc={IconPath.Lock}
              startAlt={LoginFormTexts.PasswordAlt}
              endSrc={IconPath.Eye}
              endAlt={LoginFormTexts.EyeAlt}
              value={password}
              onChange={onPasswordChange}
              InputProps={{ type: 'password' }}
              error={!!error} 
              helperText={error}  
            />
          </StyledStack>
          <StyledTextButton
            variant="text"
            backgroundColor="none"
            onClick={onForgotPasswordClick}
            disableRipple
          >
            {LoginFormTexts.ForgotPassword}
          </StyledTextButton>
          <StyledButton
            variant="contained"
            backgroundColor={theme.palette.primary.main}
            type="submit"
            disabled={isButtonDisabled}
            onClick={onContinueClick}
            disableRipple
          >
            {LoginFormTexts.Continue}
          </StyledButton>
          <StyledDividerStack>
            <Divider orientation="horizontal" variant="middle">
              {LoginFormTexts.Or}
            </Divider>
          </StyledDividerStack>
          <SocialLoginStack
            onGoogleClick={onGoogleLoginClick}
            onStripeClick={onStripeLoginClick}
            onXeroClick={onXeroLoginClick}
          />
        </StyledForm>
        <StyledBox>
          <TypographyButton
            title={LoginFormTexts.DontHaveAccount}
            titleVariant="body1"
            titleColor={theme.palette.text.lowEmphasis}
            buttonLabel={LoginFormTexts.SignUp}
            onButtonClick={onSignUpClick}
          />
        </StyledBox>
      </FormContainer>
    </ThemeProvider>
  );
};

export default LoginForm;
