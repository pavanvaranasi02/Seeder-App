import React from 'react';
import { StoryFn,Meta } from '@storybook/react';
import ForgotPassword, { ForgotPasswordProps } from '.';

export default {
  title: 'Organisms/ForgotPassword',
  component: ForgotPassword,
  argTypes: {
    description: { control: 'text' },
    buttonLabel: { control: 'text' },
    resetMailHeading: { control: 'text' },
    resetMailSubText1: { control: 'text' },
    resetMailSubText2: { control: 'text' },
    onButtonClick: { action: 'clicked' },
  },
} as Meta<typeof ForgotPassword>;

const Template: StoryFn<typeof ForgotPassword> = (
  args: ForgotPasswordProps
) => <ForgotPassword {...args} />;

export const Default = Template.bind({});
Default.args = {
  description: "No worries, we’ll send you link to your email id to reset your password",
  resetMailHeading: 'Reset email sent',
  resetMailSubText1:'We have sent mail to',
  resetMailSubText2:' with reset password instructions',
  buttonLabel: 'Continue',
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  resetMailHeading: 'Password reset successful',
  resetMailSubText1: 'Password reset successful',
  resetMailSubText2:' with reset password instructions',
  buttonLabel: 'Login Now',
};
