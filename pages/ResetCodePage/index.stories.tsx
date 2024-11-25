import React from 'react';
import { Meta } from '@storybook/react';
import { StoryFn } from '@storybook/react/types-6-0';
import { MemoryRouter } from 'react-router-dom'; 

import ResetCodePage from './';

export default {
  title: 'Pages/ResetCodePage',
  component: ResetCodePage,
  parameters: {
  },
  decorators: [Story => <MemoryRouter><Story /></MemoryRouter>], 
} as Meta;

const Template: StoryFn = (args) => <ResetCodePage {...args} />;

export const Default = Template.bind({});
Default.args = {
};
