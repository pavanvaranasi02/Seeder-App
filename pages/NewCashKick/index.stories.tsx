import React from 'react';
import { StoryFn, Meta } from '@storybook/react/*';
import { BrowserRouter } from 'react-router-dom';
import NewCashkick from '.';

export default {
  title: 'Pages/NewCashKick',
  component: NewCashkick,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

const Template: StoryFn = () => <NewCashkick />;

export const Default = Template.bind({});
Default.args = {};
