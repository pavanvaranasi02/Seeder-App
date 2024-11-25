import React from 'react';
import { ThemeProvider } from '@mui/material';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';
import Divider from '../../atoms/Divider';
import TypographyButton from '../../molecules/TypographyButton';
import theme from '../../../theme';
import IconPath, {
  LoginFormTexts,
  SignupFormTexts,
} from '../../../utils/Constants';

import {
  StyledStack,
  StyledButton,
  FormContainer,
  StyledForm,
  StyledDividerStack,
  StyledBox,
  SocialLoginStack,

} from '../LoginForm';


export interface SignupFormProps {
  email?: string;
  password?: string;
  name?: string;
  isButtonDisabled?:boolean;
  emailError?:string;
  passwordError?:string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onEmailChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSignupClick?: () => void;
  onGoogleSignupClick?: () => void;
  onStripeSignupClick?: () => void;
  onXeroSignupClick?: () => void;
  onLoginClick?: () => void;
}


const SignupForm: React.FC<SignupFormProps> = ({
  email ,
  password,
  name ,
  emailError,
  passwordError,
  isButtonDisabled,
  onSignupClick,
  onGoogleSignupClick,
  onStripeSignupClick,
  onXeroSignupClick,
  onSubmit = () => {},
  onLoginClick = () => {},
  onNameChange = () => {},
  onEmailChange = () => {},
  onPasswordChange = () => {},
}) => {

 

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <StyledStack>
          <Typography variant="title" color="text.primary">
            {SignupFormTexts.SignupTitle}
          </Typography>
        </StyledStack>

        <StyledForm onSubmit={onSubmit} data-testid="signup-form">
          <StyledStack>
            <TextField
              placeholder={SignupFormTexts.NamePlaceholder}
              startSrc={IconPath.Name}
              startAlt={SignupFormTexts.NameAlt}
              value={name}
              onChange={onNameChange}
            />
            <TextField
              placeholder={SignupFormTexts.EmailPlaceholder}
              startSrc={IconPath.Email}
              startAlt={LoginFormTexts.EmailAlt}
              value={email}
              onChange={onEmailChange}
            
              helperText={emailError}
             
            />
            <TextField
              placeholder={SignupFormTexts.PasswordPlaceholder}
              startSrc={IconPath.Lock}
              startAlt={LoginFormTexts.PasswordAlt}
              endSrc={IconPath.Eye}
              endAlt={LoginFormTexts.EyeAlt}
              value={password}
              onChange={onPasswordChange}
              helperText={passwordError}
              InputProps={{ type: 'password' }}
            />
          </StyledStack>
          <StyledButton
            variant="contained"
            backgroundColor={theme.palette.primary.main}
            type="submit"
            disabled={isButtonDisabled}
            onClick={onSignupClick}
            disableRipple
          >
            {LoginFormTexts.SignUp}
          </StyledButton>
          <StyledDividerStack>
            <Divider orientation="horizontal" variant="middle">
              {LoginFormTexts.Or}
            </Divider>
          </StyledDividerStack>
          <SocialLoginStack
            onGoogleClick={onGoogleSignupClick}
            onStripeClick={onStripeSignupClick}
            onXeroClick={onXeroSignupClick}
          />
        </StyledForm>
        <StyledBox>
          <TypographyButton
            title={SignupFormTexts.AlreadyHaveAccount}
            titleVariant="body1"
            titleColor={theme.palette.text.lowEmphasis}
            buttonLabel={SignupFormTexts.Login}
            onButtonClick={onLoginClick}
          />
        </StyledBox>
      </FormContainer>
    </ThemeProvider>
  );
};

export default SignupForm;



