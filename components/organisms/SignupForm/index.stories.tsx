import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import SignupForm from '.';
import theme from '../../../theme';

const ThemedSignupForm = (args: any) => (
  <ThemeProvider theme={theme}>
    <SignupForm {...args} />
  </ThemeProvider>
);

export default {
  title: 'Organisms/SignupForm',
  component: ThemedSignupForm,
  argTypes: {
    name: { control: 'text' },
    email: { control: 'text' },
    password: { control: 'text' },
  },
} as Meta<typeof ThemedSignupForm>;

const Template: StoryFn<typeof ThemedSignupForm> = (args) => (
  <ThemedSignupForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: '',
  email: '',
  password: '',
};

Default.argTypes = {
  onSubmit: { action: 'submitted' },
  onEmailChange: { action: 'email changed' },
  onNameChange: { action: 'name changed' },
  onPasswordChange: { action: 'password changed' },
  onForgotPasswordClick: { action: 'forgot password clicked' },
  onSignupClick: { action: 'signup clicked' },
  onGoogleSignupClick: { action: 'google signup clicked' },
  onStripeSignupClick: { action: 'stripe signup clicked' },
  onXeroSignupClick: { action: 'xero signup clicked' },
  onLoginClick: { action: 'login clicked' },
};
