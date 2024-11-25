import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChangePasswordPage from '.';


export default {
  title: 'Pages/ChangePasswordPage',
  component: ChangePasswordPage,
} as Meta;

const Template: StoryFn = (args) => (
  <Router>
    <ChangePasswordPage {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {};
