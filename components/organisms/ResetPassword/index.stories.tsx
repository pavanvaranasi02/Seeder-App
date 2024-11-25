import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ResetPassword, { ResetCardProps } from '.';
import { ThemeProvider } from '@mui/material/styles';
import IconPath from '../../../utils/Constants';
import theme from '../../../theme/index';

export default {
  title: 'Organisms/ResetPassword',
  component: ResetPassword,
  argTypes: {
    onButtonClick: { action: 'button clicked' },
    onLoginButtonClick: { action: 'login button clicked' },
  },
} as Meta;

const Template: StoryFn<ResetCardProps> = (args) => (
  <ThemeProvider theme={theme}>
    <ResetPassword {...args} />
  </ThemeProvider>
);

export const ForgotPassword = Template.bind({});
ForgotPassword.args = {
  title: 'Forgot Password',
  description: 'No worries, we will send you a link to your email id to reset your password',
  placeholder: 'Enter your mail id',
  startSrc: IconPath.NotificationImg,
  buttonLabel: 'Reset Password',
  onButtonClick: action('Forgot Password button clicked'),
  onLoginButtonClick: action('Login button clicked'),
};

export const ResetCode = Template.bind({});
ResetCode.args = {
  title: 'Enter Reset Code',
  description: 'Please enter the reset code sent to your email to proceed further',
  placeholder: 'Enter reset code',
  startSrc: IconPath.MoreImg,
  buttonLabel: 'Verify Code',
  onButtonClick: action('Reset Code button clicked'),
  onLoginButtonClick: action('Login button clicked'),
};
