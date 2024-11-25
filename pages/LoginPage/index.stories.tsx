import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from '.';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <LoginPage {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithError = Template.bind({});
WithError.args = {
  initialEmail: 'Narendra19@gmail.com',
  initialPassword: 'Narendra@123',
  initialError: 'credentials not valid',
};



export const WithSuccess = Template.bind({});
WithSuccess.args = {
  initialEmail: 'Narendra@gmail.com',
  initialPassword: 'Narendra@123',
};
