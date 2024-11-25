import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import LoginForm from '.';
import theme from '../../../theme';

const ThemedLoginForm = (args: any) => (
  <ThemeProvider theme={theme}>
    <LoginForm {...args} />
  </ThemeProvider>
);

export default {
  title: 'Organisms/LoginForm',
  component: ThemedLoginForm,
  argTypes: {
    email: { control: 'text' },
    password: { control: 'text' },
  },
} as Meta<typeof ThemedLoginForm>;

const Template: StoryFn<typeof ThemedLoginForm> = (args) => (
  <ThemedLoginForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  email: '',
  password: '',
};

Default.argTypes = {
  onSubmit: { action: 'submitted' },
  onEmailChange: { action: 'email changed' },
  onPasswordChange: { action: 'password changed' },
  onForgotPasswordClick: { action: 'forgot password clicked' },
  onContinueClick: { action: 'continue clicked' },
  onGoogleLoginClick: { action: 'google login clicked' },
  onStripeLoginClick: { action: 'stripe login clicked' },
  onXeroLoginClick: { action: 'xero login clicked' },
  onSignUpClick: { action: 'sign up clicked' },
};
