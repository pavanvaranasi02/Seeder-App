import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Icon from '.';

export default {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    src: {
      control: 'select',
      options: [
        './assets/icons/lock.svg',
        './assets/icons/eye.svg',
        './assets/icons/BusinessAnalysis.svg',
      ],
    },
    alt: {
      control: 'text',
    },
  },
} as Meta;

const Template: StoryFn<any> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: './assets/icons/eye.svg',
  alt: 'default icon',
};

export const IconWithoutAlt = Template.bind({});
IconWithoutAlt.args = {
  src: './assets/icons/lock',
  alt: '',
};

export const IconWithWrongPath = Template.bind({});
IconWithWrongPath.args = {
  src: './assets/icons/lock',
  alt: 'Lock',
};
