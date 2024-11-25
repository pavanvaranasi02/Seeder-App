import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ChangePassword, { ChangePasswordProps } from '.';

export default {
  title: 'Organisms/ChangePassword',
  component: ChangePassword,
} as Meta;

const Template: Story<ChangePasswordProps> = (args) => (
  <ChangePassword {...args} />
);

export const Default = Template.bind({});
Default.args = {
  password: '',
  changePassword: '',
  handlePassword: action('Password Changed'),
  handleChangePassword: action('Change Password Changed'),
  handleFormSubmit: action('Form Submitted'),
};

export const ValidPasswordChange = Template.bind({});
ValidPasswordChange.args = {
  ...Default.args,
  password: 'Password2024',
  changePassword: 'Password2024',
};

export const PasswordMismatch = Template.bind({});
PasswordMismatch.args = {
  ...Default.args,
  password: 'Password1234',
  changePassword: 'Password123',
};
