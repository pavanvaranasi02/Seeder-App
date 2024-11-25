import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '.';

export default {
  title: 'Pages/HomePage',
  component: HomePage,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = () => (
  <HomePage onFailureFunc={() => {}} onConnectFunc={() => {}} />
);

export const Default = Template.bind({});
